<?php

namespace App\Types;

class User
{
    /**
     * User's id
     */
    public int $id;

    /**
     * User's username
     */
    public string $username;

    /** User's country
     *  country => [code, name]
     */
    public object $country;

    /**
     * User's avatar url
     */
    public string $avatar_url;

    /**
     * User's statistics
     */
    public object $statistics;

    /**
     * User's access token
     */
    public ?AccessToken $access_token;

    /**
     * User constructor
     */
    public function __construct(object $data)
    {
        $this->id = $data->id;
        $this->username = $data->username;
        $this->country = $data->country;
        $this->avatar_url = $data->avatar_url;
        $this->statistics = $data->statistics;
        $this->access_token = NULL;

        return $this;
    }

    /**
     * Get user's id
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Get user's username
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * Get user's country
     */
    public function getCountry(): object
    {
        return $this->country;
    }

    /**
     * Get user's avatar url
     */
    public function getAvatarUrl(): string
    {
        return $this->avatar_url;
    }

    /**
     * Get user's statistics
     */
    public function getStatistics(): object
    {
        return $this->statistics;
    }

    /**
     * Get user's access token
     */
    public function getAccessToken(): ?AccessToken
    {
        return $this->access_token;
    }

    /**
     * Set user's access token
     */
    public function setAccessToken(AccessToken $accessToken): self
    {
        $this->access_token = $accessToken;

        return $this;
    }

    /**
     * Convert the user into array
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'country' => $this->country,
            'avatar_url' => $this->avatar_url,
            'statistics'=> $this->statistics,
            'access_token' => $this->access_token?->access_token,
            'refresh_token' => $this->access_token?->refresh_token,
        ];
    }
}
