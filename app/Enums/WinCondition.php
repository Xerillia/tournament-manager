<?php

namespace App\Enums;

enum WinCondition: string
{
    case SCORE_V2 = 'Score V2';
    case SCORE_V1 = 'Score V1';
    case ACCURACY = 'Accuracy';
    case COMBO = 'Combo';
    case LEAST_MISS = 'Least Miss';
}
