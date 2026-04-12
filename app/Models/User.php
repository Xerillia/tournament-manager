<?php

namespace App\Models;

use App\Concerns\InteractsWithOsu;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['osu_id', 'username', 'discord', 'country_code', 'country_name', 'avatar_url'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, InteractsWithOsu, Notifiable;

    /**
     * Get the tournaments that belong to the user
     */
    public function tournaments(): HasMany
    {
        return $this->hasMany(Tournament::class);
    }
}
