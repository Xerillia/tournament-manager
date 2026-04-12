# Table of Contents

- [Prerequisite](#prerequisite)
- [Cloning repository](#cloning-repository)
- [Generating node_modules and vendor](#generating-node_modules-and-vendor)
- [Creating .env](#creating-env)
    - [osu OAuth API setup](#osu-oauth-api-setup)
    - [Discord OAuth API setup](#discord-oauth-api-setup)
- [Running migrations](#running-migrations)
- [Setting up local platform](#setting-up-local-platform)
    - [Laragon](#laragon)
- [Development environment](#development-environment)
- [Building application](#building-application)
- [FAQ and Troubleshooting](#faq-and-troubleshooting)

# Prerequisite

1. [Install git](https://git-scm.com/install/windows).
2. [Install composer](https://getcomposer.org/download/).
3. [Install nodejs](https://nodejs.org/en/download).

# Cloning repository

```
git clone https://github.com/Xerillia/tournament-manager.git
cd tournament-manager
```

# Generating node_modules and vendor

Ensure you are in the project folder (e.g. `/tournament-manager`).

```
composer install
npm install
```

This will take some time to run, be patient.

# Creating .env

1. Duplicate the `.env.example` file and rename it to `.env`
2. Run this command to generate `APP_KEY`.

```
php artisan key:generate
```

3. Set `APP_URL` accordingly. If you use [Laragon's auto virtual hosts](#laragon), you can set it to `http://<project_name>.test/` (e.g. `http://tournament-manager.test`).
4. Set `DB_CONNECTION` and its configuration. **<ins>Do not</ins>** use `sqlite` because it will not work.
5. Setup OAuth APIs below:

## osu OAuth API setup

1. Open [osu! account settings](https://osu.ppy.sh/home/account/edit) and scroll down to `OAuth` section.
2. Click `New OAuth Application`.
3. Set `Application Name` to anything.
4. Set `Application Callback URLs` to `http://<project_name>.test/osu/callback` (e.g. `http://project-manager.test/osu/callback`).
    > The path must be `<domain>/osu/callback` if you use different domain.
5. Click `Register application`.
6. Click `Edit` from the newly made application.
7. Copy the value below `Client ID` and insert it to `OSU_CLIENT_ID` in the `.env` file.
8. Click `Show client secret`, then copy the value below `Client Secret`, and insert it to `OSU_CLIENT_SECRET`.
9. Done.

## Discord OAuth API setup

1. Open [Discord Developer Portal](https://discord.com/developers/applications)
2. Click `New Application`
3. Set `Name` to anything then create the app.
4. Navigate to the `OAuth2` tab through the side panel on the left side.
5. Click `Add Redirect` then set it to `http://<project_name>test./discord/callback` (e.g. `http://project-manager.test/discord/callback`).
    > The path must be `<domain>/discord/callback` if you use different domain.
6. Copy the `Client ID` value and paste it to `DISCORD_CLIENT_ID` in the `.env` file.
7. Click `Reset Secret` to generate a new `Client Secret`, then copy the value and insert it to `DISCORD_CLIENT_SECRET`.
    > The value will only be shown once and will be permanently hidden when you refresh the Discord OAuth2 page.
8. Done.

# Running migrations

```
php artisan migrate
```

# Setting up local platform

You can use Laragon, XAMPP, or anything you like.

## Laragon

1. [Install laragon](https://laragon.org/download).
2. Clone the repository inside the `/www` folder.
3. Run the `laragon.exe`.
4. Click `Start All`.
5. Run the [migrations](#running-migrations).
6. Have the [dev environment running](#development-environment) (recommended) or [app built](#building-application).
7. Open `http://<project_name>.test/` (e.g. `http://project-manager.test/`).

# Development environment

Always have this command running while developing the application:

```
npm run dev
```

# Building application

```
php artisan optimize
npm run build
```

# FAQ and Troubleshooting

### I can't open http://<project_name>.test/ while using Laragon

Ensure `Auto-create Virtual Hosts` is enabled in the Laragon's settings.
