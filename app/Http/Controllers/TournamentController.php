<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTournamentRequest;
use App\Http\Requests\UpdateTournamentRequest;
use App\Models\Tournament;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('create-tournament');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTournamentRequest $request): RedirectResponse
    {
        $user_id = ['user_id' => Auth::id()];

        // attempt to create tournament
        $tournament = Tournament::create($request->safe()->merge($user_id)->toArray());

        // create links if there is any
        $links = $request->safe()->only(['links']);

        if ($links && $links['links']) {
            $links = $links['links'];

            DB::beginTransaction();

            foreach ($links as $key => $value) {
                $value['tournament_id'] = $tournament->id;
                $links[$key] = $value;
            }

            try {
                DB::table('tournament_links')->insert($links);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
            }
        }

        // redirect home
        return redirect()->to(route('landing'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
        $tournament->load(['host', 'links', 'mappools.formats']);

        return Inertia::render('show-tournament', [
            'tournament' => $tournament,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
        $tournament->load('links');

        return Inertia::render('edit-tournament', [
            'tournament' => $tournament,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTournamentRequest $request, Tournament $tournament)
    {
        $tournament->update($request->validated());

        // update links if there is any
        $links = $request->safe()->only(['links']);

        if ($links && $links['links']) {
            $links = $links['links'];

            DB::beginTransaction();

            try {
                DB::table('tournament_links')->where('tournament_id', '=', $tournament->id)->delete();

                foreach ($links as $key => $value) {
                    $value['tournament_id'] = $tournament->id;
                    $links[$key] = $value;
                }

                DB::table('tournament_links')->insert($links);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
            }
        }

        return redirect()->to(route('landing'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament)
    {
        $tournament->delete(); // soft deleted

        return redirect()->to(route('landing'));
    }
}
