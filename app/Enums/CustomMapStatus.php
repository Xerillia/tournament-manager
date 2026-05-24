<?php

namespace App\Enums;

enum CustomMapStatus: string
{
    case NOT_STARTED = 'not_started';
    case NEEDS_TIMING = 'needs_timing';
    case IN_PROGRESS = 'in_progress';
    case NEEDS_HITSOUNDS = 'need_hitsounds';
    case ROUGH_DRAFT_DONE = 'rough_draft_done';
    case NEEDS_PLAYTESTING = 'needs_playtesting';
    case READY_TO_UPLOAD = 'ready_to_upload';
    case COMPLETED = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::NOT_STARTED => 'Not Started',
            self::NEEDS_TIMING => 'Needs Timing',
            self::IN_PROGRESS => 'In Progress',
            self::NEEDS_HITSOUNDS => 'Needs Hitsounds',
            self::ROUGH_DRAFT_DONE => 'Rough Draft Done',
            self::NEEDS_PLAYTESTING => 'Needs Playtesting',
            self::READY_TO_UPLOAD => 'Ready to Upload',
            self::COMPLETED => 'Completed',
        };
    }
}
