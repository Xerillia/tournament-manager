<?php

namespace App\Types;

use Carbon\Carbon;

class AccessToken
{
    /**
     * The access token
     */
    public string $access_token;

    /**
     * The type of token
     */
    public string $token_type;

    /**
     * The time in seconds when the token expires
     */
    public int $expires_in;

    /**
     * The Carbon instance when the token expires
     */
    public Carbon $expires_at;

    /**
     * The refresh token.
     */
    public string $refresh_token;

    /**
     * AccessToken constructor.
     */
    public function __construct(object $data)
    {
        $this->access_token = $data->access_token;
        $this->token_type = $data->token_type;
        $this->expires_in = $data->expires_in;
        $this->expires_at = Carbon::now()->addSeconds($data->expires_in);
        $this->refresh_token = $data->refresh_token;
    }

    /**
     * Returns true if the token is expired.
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Returns true if the token is not expired.
     */
    public function isValid(): bool
    {
        return ! $this->isExpired();
    }

    /**
     * Converts the AccessToken to an array.
     */
    public function toArray(): array
    {
        return [
            'access_token' => $this->access_token,
            'token_type' => $this->token_type,
            'expires_in' => $this->expires_in,
            'expires_at' => $this->expires_at,
            'refresh_token' => $this->refresh_token,
        ];
    }
}
