<?php

namespace App\Enums;

enum WinCondition: string
{
    case SCORE_V2 = 'score_v2';
    case SCORE_V1 = 'score_v1';
    case ACCURACY = 'accuracy';
    case COMBO = 'combo';
    case LEAST_MISS = 'least_miss';

    public function label(): string
    {
        return match ($this) {
            self::SCORE_V2 => 'Score V2',
            self::SCORE_V1 => 'Score V1',
            self::ACCURACY => 'Accuracy',
            self::COMBO => 'Combo',
            self::LEAST_MISS => 'Least Miss',
        };
    }
}
