<?php

namespace App\Http\Requests;

use App\Rules\ValidMods;
use Illuminate\Foundation\Http\FormRequest;

class OverrideFreemodRulesRequest extends FormRequest
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
            'rules.*.mod' => ['required', new ValidMods],
            'rules.*.multiplier' => ['required', 'numeric'],
        ];
    }
}
