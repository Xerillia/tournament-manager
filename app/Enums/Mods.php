<?php

namespace App\Enums;

enum Mods: string
{
    case NOMOD = 'NM';
    case EASY = 'EZ';
    case HALFTIME = 'HT';
    case HARDROCK = 'HR';
    case DOUBLETIME = 'DT';
    case NIGHTCORE = 'NC';
    case HIDDEN = 'HD';
    case FLASHLIGHT = 'FL';
    case RELAX = 'RX';
    case AUTOPILOT = 'AP';

    public function label(): string
    {
        return match ($this) {
            self::NOMOD => 'No Mod',
            self::EASY => 'Easy',
            self::HALFTIME => 'Half Time',
            self::HARDROCK => 'Hard Rock',
            self::DOUBLETIME => 'Double Time',
            self::NIGHTCORE => 'Nightcore',
            self::HIDDEN => 'Hidden',
            self::FLASHLIGHT => 'Flashlight',
            self::RELAX => 'Relax',
            self::AUTOPILOT => 'Auto Pilot',
        };
    }
}
