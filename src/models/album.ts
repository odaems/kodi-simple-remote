import { Song } from "./song";
import { Artist } from "./artist";

export class Album {
    id: number;
    name: string;
    songs: Song[];
    artist: Artist;
    thumbnail: string;

    constructor(id: number, name: string, artist: Artist, thumbnail?: string) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        if (thumbnail) {
            this.thumbnail = encodeURI(thumbnail);
            console.log(this.thumbnail);
        }
    }
}