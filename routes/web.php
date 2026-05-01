<?php

use App\Enums\TournamentStatus;
use App\Models\Beatmap;
use App\Models\Tournament;
use App\Services\OsuService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // get all tourney
    $tournaments = Tournament::where('status', '!=', TournamentStatus::UNPUBLISHED)->with('host')->get();

    $ownTournaments = [];
    if (Auth::check()) {
        $ownTournaments = Tournament::where('user_id', '=', Auth::id())->get();
    }

    return Inertia::render('landing', [
        'tournaments' => $tournaments,
        'ownTournaments' => $ownTournaments,
    ]);
})->name('landing');

Route::get('/beatmap/{id}', function (int $id) {
    // load queries
    $mods = request()->has('mods') ? request()->query('mods') : null;
    $refresh = request()->has('refresh');

    // array manipulation
    $array_mods = $mods ? explode(' ', $mods) : [];
    sort($array_mods);
    $mods = implode(' ', $array_mods);

    $beatmap = $refresh ? null : Beatmap::whereBeatmapId($id)->where('mods', $mods)->first();
    if (! $beatmap) {
        try {
            $accessToken = Auth::user()->getAccessToken();
            $beatmapObject = (new OsuService)->getBeatmap($accessToken, $id, $array_mods);
            $beatmap = Beatmap::updateOrCreate($beatmapObject->toArray());
        } catch (Exception $e) {
            dd($e);
        }
    }

    dd($beatmap);
});

require __DIR__.'/comment.php';
require __DIR__.'/discord.php';
require __DIR__.'/osu.php';
require __DIR__.'/settings.php';
require __DIR__.'/tournament.php';
