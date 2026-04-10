<?php

namespace App\Concerns;

use App\Models\OsuAccessToken;
use App\Services\OsuService;
use App\Types\AccessToken;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\Client\RequestException;

trait InteractsWithOsu
{
    /**
     * Get the user's access token relationship
     */
    public function accessToken(): HasOne
    {
        return $this->hasOne(OsuAccessToken::class);
    }

    /**
     * Get the user's access token
     */
    public function getAccessToken(): ?AccessToken
    {
        // retrieve the access token from database
        $accessToken = $this->accessToken()->first();

        // if token exists and has already expired, refresh
        if ($accessToken && $accessToken->expires_at->isPast()) {
            $accessToken = $this->refreshAccessToken();

            return $accessToken ? new AccessToken($accessToken) : null;
        }

        return new AccessToken($accessToken);
    }

    /**
     * Refresh the user's access token
     */
    public function refreshAccessToken(): ?AccessToken
    {
        // retrieve the access token from database
        $accessToken = $this->accessToken()->first();

        if ($accessToken) {
            try {
                $response = (new OsuService)->refreshAccessToken($accessToken->refresh_token);
            } catch (RequestException $e) {
                return null;
            }

            $accessToken->update([
                'access_token' => $response->access_token,
                'refresh_token' => $response->refresh_token,
                'expires_at' => $response->expires_at,
            ]);

            return new AccessToken($accessToken);
        }

        return null;
    }
}
