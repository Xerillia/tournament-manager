import { useEffect, useRef, useState } from 'react';

export function TableGrid({ className = "", data = [], columns = [], header = true }: { className?: string; data?: Array<any>; columns?: Array<string>; header?: boolean }) {
    const cellstyle: string = "border-1 border-solid border-gray-600 p-2 "

    // Handles putting things into clipboard
    function copyText(text: string) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;

            // Prevent scrolling
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                document.execCommand("copy");
                console.log("Copied (fallback)");
            } catch (err) {
                console.error("Fallback copy failed", err);
            }

            document.body.removeChild(textarea);
        }
    }

    // Checks when a number is equal and in between two others
    const inRange = (value: number, a?: number, b?: number) => {
        if (a == null || b == null) {
            return false
        }

        const min = Math.min(a, b);
        const max = Math.max(a, b);

        return value >= min && value <= max;
    };

    const [mouseDown, setMouseDown] = useState(false)
    const [firstCell, setFirstCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [secondCell, setSecondCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const thisElement = useRef<HTMLTableElement>(null)

    const firstCellRef = useRef(firstCell)
    const secondCellRef = useRef(secondCell)

    useEffect(() => {
        firstCellRef.current = firstCell
        secondCellRef.current = secondCell
    }, [firstCell, secondCell])

    // Filter data into displayData
    const displayData: Record<string, object>[] = [];
    data.map((element) => {
        // Get matching attribute names while ignoring wheter is upper or lowercase
        const sorted: string[] = []
        Object.keys(element).map((key) => {
            columns.forEach((col) => {
                if (col.toLowerCase() == key.toLowerCase()) {

                    sorted.push(key);
                }
            })

        })

        // Creates array based on if selected coloumn is given
        const cols = columns.length > 0 ? sorted : Object.keys(element);
        const object: Record<string, object> = {}
        cols.map((key) => {
            object[key] = element[key];
        })
        displayData.push(object)
    })

    //Creates copyable text into a format that excel and google sheets accept.
    function spreadSheetText(data: object[]) {
        let copy = ""
        data.forEach((element, row) => {
            if (inRange(row, firstCellRef.current?.row, secondCellRef.current?.row)) {
                Object.keys(element).forEach((key, col) => {
                    if (inRange(col, firstCellRef.current?.col, secondCellRef.current?.col)) {
                        copy += col > 0 ? "\t" : "";
                        copy += element[key];
                    }
                })
                copy += "\n";
            }
        })

        return copy;
    }


    // Handles getting ctrl + c to copy to clipboard
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c" && document.activeElement === thisElement.current) {
                e.preventDefault();
                const copy = spreadSheetText(displayData)
                copyText(copy)
            }
        }
        document.addEventListener("keydown", handler);

        return () => document.removeEventListener("keydown", handler);
    }, [firstCellRef, secondCellRef]);


    const handleMouseDown = (row: number, col: number) => {
        setMouseDown(true);
        setFirstCell({ row, col });
        setSecondCell({ row, col });
    };
    function handleMouseUp() {
        setMouseDown(false)
    }
    const handleMouseOver = (row: number, col: number) => {
        if (!mouseDown) {
            return
        }

        setSecondCell({ row, col });
    };

    const cols = columns.length > 0 ? columns : Object.keys(displayData[0] || {});

    return (
        <table ref={thisElement} tabIndex={0} className={`${className} select-none`} >
            {header &&
                <thead>
                    <tr>
                        {cols.map((key) => (<th key={key}>{key}</th>))}
                    </tr>
                </thead>
            }
            <tbody>
                {displayData.map((element, row) => {

                    return (
                        <tr key={row} aria-rowindex={row}>
                            {
                                Object.keys(element).map((key, col) => (
                                    <td
                                        key={col}
                                        onMouseDown={() => handleMouseDown(row, col)}
                                        onMouseUp={handleMouseUp}
                                        onMouseEnter={() => handleMouseOver(row, col)}
                                        className={`
                                        ${cellstyle} ${(firstCell?.col == col && firstCell.row == row) ? "outline-2 outline-blue-500" : ""} 
                                        ${(inRange(row, firstCell?.row, secondCell?.row) && inRange(col, firstCell?.col, secondCell?.col)) && "bg-blue-500/20 "}
                                    `}
                                        aria-colindex={col}
                                    >
                                        {"" + element[key]}
                                    </td>
                                ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}