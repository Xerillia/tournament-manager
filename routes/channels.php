<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('suggestion_comments.{mappool_id}', function (User $user, int $mappool_id) {
    return $user; // TODO: add proper role check when Roles and Permissions are implemented.
});
