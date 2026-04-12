<?php

namespace App\Http\Requests;

use App\Enums\Gamemode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTournamentRequest extends FormRequest
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
            'name' => ['required', Rule::unique('tournaments', 'name')->ignore($this->route('tournament'))->whereNull('deleted_at')],
            'caption' => ['nullable', 'max:255'],
            'gamemode' => ['required', Rule::enum(Gamemode::class)],
            'max_rank' => ['required', 'numeric', 'min:1'],
            'min_rank' => ['required', 'numeric', 'gt:max_rank'],
            'start_datetime' => ['required', 'date'],
            'end_datetime' => ['required', 'date', 'after:start_datetime'],
            'forum_post' => ['nullable', 'url', 'regex:/^https:\/\/osu.ppy.sh\/community\/forums\/topics\/\d+(\?n=\d+)?$/i'],
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
        ];
    }
}
