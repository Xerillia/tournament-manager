<?php

namespace App\Http\Requests;

use App\Enums\Mode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTournamentRequest extends FormRequest
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
            'name' => ['required', Rule::unique('tournaments', 'name')->whereNull('deleted_at')],
            'caption' => ['nullable', 'max:255'],
            'mode' => ['required', Rule::enum(Mode::class)],
            'max_rank' => ['required', 'numeric', 'min:1'],
            'min_rank' => ['required', 'numeric', 'gt:max_rank'],
            'start_datetime' => ['required', 'date'],
            'end_datetime' => ['required', 'date', 'after:start_datetime'],
            'links.*.label' => ['required', 'string'],
            'links.*.url' => ['required', 'url'],
        ];
    }

    /**
     * Get the custom error message
     */
    public function messages(): array
    {
        return [
            'end_datetime.after' => 'The end date must be after the start date.',
            'min_rank.gt' => 'The min rank value must be higher than max rank.',
            'forum_post.regex' => 'The url must be an osu! Forum Post url.',
            'links.*.label' => 'The label is required.',
            'links.*.url' => 'The link must be a valid url.',
        ];
    }
}
