<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMappoolFormatRequest extends FormRequest
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
            'mappools.*.id' => ['required', 'integer'],
            'mappools.*.round' => ['required', 'string'],
            'mappools.*.formats.*.id' => ['required', 'integer'],
            'mappools.*.formats.*.slot' => ['required', 'string'],
            'mappools.*.formats.*.count' => ['required', 'integer'],
        ];
    }
}
