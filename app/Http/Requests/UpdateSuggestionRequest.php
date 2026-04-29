<?php

namespace App\Http\Requests;

use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSuggestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Allow only the original suggester. Other user must create a new suggestion instead.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<mixed>
     */
    public function rules(): array
    {
        return [
            'beatmap_id' => ['required', 'integer'],
            'mods' => ['required', 'string', new ValidMods],
            'tags' => ['nullable', 'string'],
        ];
    }
}
