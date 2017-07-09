import { Song } from "./song";

export class Playlist {
    songs: Song[];
    activeIndex: number;

    constructor() {
        this.songs = [];
    }
}