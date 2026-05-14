<?php

namespace App\Http\Requests;

use App\Enums\Mode;
use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSuggestionRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'beatmap_id' => ['required', 'integer'],
            'mods' => ['required', 'string', new ValidMods],
            'tags' => ['nullable', 'string'],
            'mode' => ['required', Rule::enum(Mode::class)],
        ];
    }
}
