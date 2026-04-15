<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['beatmap_id', 'beatmapset_id', 'mode', 'mods', 'star_rating', 'bpm', 'cs', 'ar', 'od', 'drain', 'max_combo', 'artist', 'title', 'version', 'creator', 'creator_id'])]
class Beatmap extends Model
{
    //
}
