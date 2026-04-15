<?php

namespace App\Services;

use App\Enums\Mode;
use App\Models\User;
use App\Types\AccessToken;
use App\Types\Beatmap;
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class OsuService
{
    /**
     * osu! OAuth token URL
     */
    protected string $tokenURL = 'https://osu.ppy.sh/oauth/token';

    /**
     * osu! API base URL
     */
    protected string $baseApi = 'https://osu.ppy.sh/api/v2';

    /**
     * Required data for token request
     */
    protected array $tokenData = [
        'client_id' => null,
        'redirect uri' => null,
        'response_type' => null,
        'scope' => null,
        'state' => null,
    ];

    /**
     * OsuService constructor
     */
    public function __construct()
    {
        $this->tokenData['client_id'] = config('osu.client_id');
        $this->tokenData['client_secret'] = config('osu.client_secret');
        $this->tokenData['redirect_uri'] = config('osu.redirect_uri');
        $this->tokenData['scope'] = config('osu.scope');
    }

    /**
     * Handles the osu OAuth2 callback and returns the access token.
     *
     * @throws RequestException
     */
    public function getAccessTokenFromCode(string $code): AccessToken
    {
        $tokenData = [
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
            'redirect_uri' => config('osu.redirect_uri'),
        ];

        $response = Http::asForm()->post($this->tokenURL, $tokenData);

        $response->throw();

        return new AccessToken(json_decode($response->body()));
    }

    /**
     * Get access token from refresh token.
     *
     * @throws RequestException
     */
    public function refreshAccessToken(string $refreshToken): AccessToken
    {
        $response = Http::asForm()->post($this->tokenURL, [
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
        ]);

        $response->throw();

        return new AccessToken(json_decode($response->body()));
    }

    /**
     * Revoke user's access token
     *
     * @throws RequestException
     */
    public function revokeAccessToken(string $accessToken): object
    {
        $response = Http::asForm()->post($this->tokenURL.'/oauth/tokens/current', [
            'token' => $accessToken,
            'client_id' => config('osu.client_id'),
            'client_secret' => config('osu.client_secret'),
        ]);

        $response->throw();

        return json_decode($response->body());
    }

    /**
     * Authenticate user with access token then return the data
     *
     * @throws RequestException
     */
    public function getCurrentUser(AccessToken $accessToken): \App\Types\User
    {
        $response = Http::withToken($accessToken->access_token)->get($this->baseApi.'/me');

        $response->throw();

        return new \App\Types\User(json_decode($response->body()));
    }

    /**
     * Create or update user in the database
     *
     * @throws Exception
     */
    public function createOrUpdateUser(\App\Types\User $user): User
    {
        if (! $user->getAccessToken()) {
            throw new Exception('User access token is missing.');
        }

        return User::updateOrCreate(
            [
                'osu_id' => $user->id,
                'country_code' => $user->country->code,
                'country_name' => $user->country->name,
                'avatar_url' => $user->avatar_url,
            ],
            $user->toArray(),
        );
    }

    /**
     * Load a beatmap and its attributes
     *
     * @var int the id of the beatmap.
     * @var string[] the mods used for query.
     */
    public function getBeatmap(AccessToken $accessToken, int $id, array $mods, Mode $mode = Mode::STANDARD): Beatmap
    {
        $beatmapAttributes = Http::withToken($accessToken->access_token)->get($this->baseApi.'/beatmaps/'.$id);
        $beatmapAttributes->throw();

        $beatmapDifficulty = null;
        if ($mode !== Mode::STANDARD || $mods) {
            $beatmapDifficulty = Http::withToken($accessToken->access_token)->post($this->baseApi.'/beatmaps/'.$id.'/attributes', [
                'mods' => $mods,
                'ruleset' => $mode,
            ]);
            $beatmapDifficulty->throw();
        }

        $parsed_attributes = json_decode($beatmapAttributes->body());
        $parsed_difficulty = $beatmapDifficulty ? json_decode($beatmapDifficulty->body()) : null;

        $calibrated = $this->getCalibratedBeatmapAttributes([
            'cs' => $parsed_attributes->cs,
            'ar' => $parsed_attributes->ar,
            'od' => $parsed_attributes->accuracy,
            'bpm' => $parsed_attributes->bpm,
            'drain' => $parsed_attributes->hit_length,
        ],
            $mods,
        );

        $beatmapset = $parsed_attributes->beatmapset;

        $beatmap = new Beatmap((object) [
            'beatmap_id' => $id,
            'beatmapset_id' => $parsed_attributes->beatmapset_id,
            'mode' => $mode,
            'mods' => $mods,
            'star_rating' => $parsed_difficulty ? $parsed_difficulty->attributes->star_rating : $parsed_attributes->difficulty_rating,
            'bpm' => $calibrated['bpm'],
            'cs' => $calibrated['cs'],
            'ar' => $calibrated['ar'],
            'od' => $calibrated['od'],
            'drain' => $calibrated['drain'],
            'max_combo' => $parsed_attributes->max_combo,
            'artist' => $beatmapset->artist,
            'title' => $beatmapset->title,
            'version' => $parsed_attributes->version,
            'creator' => $beatmapset->creator,
            'creator_id' => $beatmapset->user_id,
        ]);

        return $beatmap;
    }

    /**
     * Calibrate beatmap attributes based on mod being put
     *
     * @var string[] ['cs' => string, 'ar' => string, 'od' => string, 'bpm' => float, 'drain' => float]
     * @var string[] ['DT']
     */
    private function getCalibratedBeatmapAttributes(array $attributes, array $mods): array
    {
        $cs = $attributes['cs'];
        $ar = $attributes['ar'];
        $od = $attributes['od'];
        $bpm = $attributes['bpm'];
        $drain = $attributes['drain'];

        if (in_array('EZ', $mods)) {
            $cs /= 2;
            $ar /= 2;
            $od /= 2;
        }

        if (in_array('HR', $mods)) {
            $cs = min($cs * 1.3, 10);
            $ar = min($ar * 1.4, 10);
            $od = min($od * 1.4, 10);
        }

        $speedMultiplier = 1;

        if (in_array('DT', $mods)) {
            $speedMultiplier = 1.5;
        }

        if (in_array('HT', $mods)) {
            $speedMultiplier = 0.75;
        }

        if ($speedMultiplier !== 1) {
            $ar_millisecond = $ar < 5 ? 1800 - $ar * 120 : 1200 - ($ar - 5) * 150;
            $ar_millisecond /= $speedMultiplier;

            $ar = $ar_millisecond > 1200 ? (1800 - $ar_millisecond) / 120 : (1200 - $ar_millisecond) / 150 + 5;
            $ar = min(max($ar, 0), 11);

            $od_millisecond = (79.5 - $od * 6) / $speedMultiplier;
            $od = (79.5 - $od_millisecond) / 6;
            $od = min(max($od, 0), 11);
        }

        $bpm *= $speedMultiplier;
        $drain /= $speedMultiplier;

        $attributes = [
            'cs' => $cs,
            'ar' => $ar,
            'od' => $od,
            'bpm' => $bpm,
            'drain' => $drain,
        ];

        return $attributes;
    }
}
