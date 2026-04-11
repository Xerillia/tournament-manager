<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Application ID
    |--------------------------------------------------------------------------
    |
    | This is the ID of your osu application.
    |
    */

    'client_id' => env('OSU_CLIENT_ID', null),

    /*
    |--------------------------------------------------------------------------
    | Application ID
    |--------------------------------------------------------------------------
    |
    | This is the secret of your osu application.
    |
    */

    'client_secret' => env('OSU_CLIENT_SECRET', null),

    /*
    |--------------------------------------------------------------------------
    | Redirect URI
    |--------------------------------------------------------------------------
    |
    | This is the URI that osu will redirect to after the user authorizes
    | your application.
    |
    */

    'redirect_uri' => env('APP_URL', 'http://localhost:8000').'/osu/callback',

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    |
    | These are the OAuth2 scopes of your osu application.
    |
    */

    'scope' => env('OSU_SCOPE', 'public+identify'),

    /*
    |--------------------------------------------------------------------------
    | Route Prefix
    |--------------------------------------------------------------------------
    |
    | This is the prefix of the routes
    |
    */

    'route_prefix' => env('OSU_PREFIX', 'osu'),

    /*
    |--------------------------------------------------------------------------
    | Remember Me
    |--------------------------------------------------------------------------
    |
    | Whether or not to remember the user after they log in.
    |
    */

    'remember_me' => false,

    /*
    |--------------------------------------------------------------------------
    | Redirect Login
    |--------------------------------------------------------------------------
    |
    | Where to redirect the user after they log in.
    |
    */

    'redirect_login' => '/',

    /*
    |--------------------------------------------------------------------------
    | Error Messages
    |--------------------------------------------------------------------------
    |
    | These are the error messages that will be displayed to the user if there
    | is an error.
    |
    */

    'error_messages' => [
        'missing_code' => [
            'message' => 'The authorization code is missing.',
            'redirect' => '/',
        ],
        'invalid_code' => [
            'message' => 'The authorization code is invalid.',
            'redirect' => '/',
        ],
        'authorization_failed' => [
            'message' => 'The authorization failed.',
            'redirect' => '/',
        ],
        'invalid_user' => [
            'message' => 'The user ID doesn\'t match the logged-in user.',
            'redirect' => '/',
        ],
        'database_error' => [
            'message' => 'There was an error with the database. Please try again later.',
            'redirect' => '/',
        ],
        'missing_access_token' => [
            'message' => 'The access token is missing.',
            'redirect' => '/',
        ],
    ],
];
