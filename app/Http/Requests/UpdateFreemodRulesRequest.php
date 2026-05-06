<?php

namespace App\Http\Requests;

use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFreemodRulesRequest extends FormRequest
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
            'payload.*.mappool_id' => ['required', 'exists:mappools,id'],
            'payload.*.rules.*.mod' => ['required', new ValidMods],
            'payload.*.rules.*.allowed' => ['required', 'boolean'],
            'payload.*.rules.*.multiplier' => ['required', 'numeric'],
        ];
    }
}
