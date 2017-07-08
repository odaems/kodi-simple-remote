import { Artist } from "./artist";
import { Album } from "./album";

export class Song {
    id: number;
    name: string;
    duration: number;
    trackNumber: number;
    discNumber: number;
    artist: Artist;
    album: Album;

    constructor(id: number, name: string, duration: number, trackNumber: number, discNumber: number, artist: Artist, album: Album) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.trackNumber = trackNumber;
        this.discNumber = discNumber;
        this.artist = artist;
        this.album = album;
    }
}