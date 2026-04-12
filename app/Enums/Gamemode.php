<?php

namespace App\Enums;

enum Gamemode: string
{
    case STANDARD = 'std';
    case MANIA = 'mania';
    case TAIKO = 'taiko';
    case CATCH = 'ctb';
}
