<?php

namespace App\Models;

use App\Concerns\InteractsWithOsu;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['osu_id', 'username', 'country_code', 'country_name', 'avatar_url'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, InteractsWithOsu, Notifiable;

    /**
     * Get the statistics of the user
     */
    public function statistics(): HasMany
    {
        return $this->hasMany(Statistic::class);
    }
}
