<?php

namespace App\Rules;

use App\Enums\Mods;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidMods implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $ERROR_MESSAGE = 'The mods must be a valid osu mod combinations!';

        if (strlen($value) & 1) { // length is odd
            $fail($ERROR_MESSAGE);
        }

        $mods = str_split($value, 2);
        $valid_mods = array_column(Mods::cases(), 'value');

        foreach ($mods as $key => $mod) {
            if (! in_array($mod, $valid_mods)) {
                $fail($ERROR_MESSAGE);
            }
        }
    }
}
