<?php

namespace App\Enums;

enum Mode: string
{
    case STANDARD = 'osu';
    case MANIA = 'mania';
    case TAIKO = 'taiko';
    case CATCH = 'fruits';

    public function label(): string
    {
        return match ($this) {
            self::STANDARD => 'Standard',
            self::MANIA => 'Mania',
            self::TAIKO => 'Taiko',
            self::CATCH => 'Catch the Beat',
        };
    }
}
