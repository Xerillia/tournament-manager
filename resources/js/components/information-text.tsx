import React from 'react';

const InformationText = ({ content, className = '' }) => {
    return (
        // Gunakan template literal (backticks) untuk menggabungkan class default dengan class kiriman
        <div className={`max-w-3xl leading-relaxed ${className}`}>
            <div className="text-lg text-slate-700">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default InformationText;
