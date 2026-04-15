<?php

namespace App\Types;

use App\Enums\Mode;

class Beatmap
{
    /**
     * The id of the beatmap.
     */
    public int $beatmap_id;

    /**
     * The id of the beatmapset.
     */
    public int $beatmapset_id;

    /**
     * The mode of the beatmap.
     */
    public Mode $mode;

    /**
     * Mods used in this beatmap attributes.
     *
     * @var string[]
     */
    public array $mods;

    /**
     * The star rating of the beatmap.
     */
    public float $star_rating;

    /**
     * The beat per minute of the beatmap.
     */
    public float $bpm;

    /**
     * The circle size of the beatmap.
     */
    public float $cs;

    /**
     * The approach rate of the beatmap.
     */
    public float $ar;

    /**
     * The overall difficulty of the beatmap.
     */
    public float $od;

    // There is no hp (health point drain) because it is not necessary in pooling

    /**
     * The duration of gameplay of the beatmap.
     */
    public float $drain;

    /**
     * The maximum combo for a full combo of the beatmap.
     */
    public int $max_combo;

    /**
     * The artist of the song of the beatmap.
     */
    public string $artist;

    /**
     * The title of the song of the beatmap.
     */
    public string $title;

    /**
     * The difficulty name of the beatmap.
     */
    public string $version;

    /**
     * The name of the mapper of the beatmap.
     */
    public string $creator;

    /**
     * The osu id of the mapper of the beatmap. Useful for hyperlinking.
     */
    public int $creator_id;

    /**
     * Beatmap constructor.
     */
    public function __construct(object $data)
    {
        $this->beatmap_id = $data->beatmap_id;
        $this->beatmapset_id = $data->beatmapset_id;
        $this->mode = $data->mode;
        $this->mods = $data->mods;
        $this->star_rating = $data->star_rating;
        $this->bpm = $data->bpm;
        $this->cs = $data->cs;
        $this->ar = $data->ar;
        $this->od = $data->od;
        $this->drain = $data->drain;
        $this->max_combo = $data->max_combo;
        $this->artist = $data->artist;
        $this->title = $data->title;
        $this->version = $data->version;
        $this->creator = $data->creator;
        $this->creator_id = $data->creator_id;
    }

    /**
     * Converts the Beatmap to an array.
     */
    public function toArray(): array
    {
        return [
            'beatmap_id' => $this->beatmap_id,
            'beatmapset_id' => $this->beatmapset_id,
            'mode' => $this->mode,
            'mods' => implode(' ', $this->mods),
            'star_rating' => $this->star_rating,
            'bpm' => $this->bpm,
            'cs' => $this->cs,
            'ar' => $this->ar,
            'od' => $this->od,
            'drain' => $this->drain,
            'max_combo' => $this->max_combo,
            'artist' => $this->artist,
            'title' => $this->title,
            'version' => $this->version,
            'creator' => $this->creator,
            'creator_id' => $this->creator_id,
        ];
    }
}
