<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class DeleteMappoolFormatRequest extends FormRequest
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
            'delete_queue.*' => ['required', 'integer'],
            'delete_format_queue.*.format_id' => ['required', 'exists:mappool_formats,id'],
            'delete_format_queue.*.mappool_id' => ['required', 'exists:mappool_formats,mappool_id'],
        ];
    }
}
