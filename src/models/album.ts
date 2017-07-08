import { Song } from "./song";
import { Artist } from "./artist";

export class Album {
    id: number;
    name: string;
    songs: Song[];
    artist: Artist;

    constructor(id: number, name: string, artist: Artist) {
        this.id = id;
        this.name = name;
        this.artist = artist;
    }
}