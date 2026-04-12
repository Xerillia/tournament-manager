<?php

namespace App\Http\Requests;

use App\Gamemode;
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
            'name' => ['required', 'unique:tournaments,name'],
            'caption' => ['nullable', 'max:255'],
            'gamemode' => ['required', Rule::enum(Gamemode::class)],
            'max_rank' => ['required', 'numeric', 'min:1', 'lt:min_rank'],
            'min_rank' => ['required', 'numeric', 'gt:max_rank'],
            'start_datetime' => ['required', 'date', 'before:end_datetime'],
            'end_datetime' => ['required', 'date', 'after:start_datetime'],
            'forum_post' => ['nullable', 'url'],
        ];
    }
}
