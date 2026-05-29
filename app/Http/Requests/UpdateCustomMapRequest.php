<?php

namespace App\Http\Requests;

use App\Enums\CustomMapStatus;
use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCustomMapRequest extends FormRequest
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
            'mapper' => ['nullable', 'string'],
            'beatmap_url' => ['nullable', 'url'],
            'beatmap_name' => ['nullable', 'string'],
            'round' => ['nullable', 'exists:mappools,round'],
            'mods' => ['nullable', new ValidMods],
            'status' => ['nullable', Rule::enum(CustomMapStatus::class)],
            'bpm' => ['nullable', 'numeric'],
            'cs' => ['nullable', 'numeric', 'min:0'],
            'ar' => ['nullable', 'numeric', 'min:0'],
            'od' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
