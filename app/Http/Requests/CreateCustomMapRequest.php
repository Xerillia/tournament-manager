<?php

namespace App\Http\Requests;

use App\Enums\CustomMapStatus;
use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateCustomMapRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return [
            'mapper' => ['required', 'string'],
            'beatmap_url' => ['required', 'url'],
            'beatmap_name' => ['required', 'string'],
            'round' => ['required', 'exists:mappools,round'],
            'mods' => ['required', new ValidMods],
            'status' => ['required', Rule::enum(CustomMapStatus::class)],
            'bpm' => ['required', 'numeric'],
            'cs' => ['required', 'numeric', 'min:0'],
            'ar' => ['required', 'numeric', 'min:0'],
            'od' => ['required', 'numeric', 'min:0'],
        ];
    }
}
