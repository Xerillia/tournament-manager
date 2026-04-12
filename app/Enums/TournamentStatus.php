<?php

namespace App\Enums;

enum TournamentStatus: string
{
    case UNPUBLISHED = 'unpublished'; // drafted
    case OPEN = 'open'; // players can register
    case ONGOING = 'ongoing'; // registration closed
    case ENDED = 'ended'; // tournament ended
}
