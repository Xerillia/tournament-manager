<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTournamentRequest;
use App\Http\Requests\UpdateTournamentRequest;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
        Tournament::create($request->safe()->merge($user_id)->toArray());

        // redirect home
        return redirect()->to(route('landing'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
        $tournament->load('host');

        return Inertia::render('show-tournament', [
            'tournament' => $tournament,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
        return Inertia::render('edit-tournament', [
            'tournament' => $tournament,
        ]);
    }

    /**
     * Show the admin page for a specified resource
     */
    public function admin(Tournament $tournament)
    {
        return Inertia::render('admin', [
            'tournament' => $tournament,
        ]);
    }
     /**
     * Show the admin player page for a specified resource
     */

    public function players(Tournament $tournament)
    {
        $members = $tournament->users;

        return Inertia::render('admin/players', [
            'tournament' => $tournament,
            'players' => $members
        ]);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTournamentRequest $request, Tournament $tournament)
    {
        $tournament->update($request->validated());

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
