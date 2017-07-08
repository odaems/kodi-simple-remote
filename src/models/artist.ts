import { Album } from "./album";
import { Song } from "./song";

export class Artist {
    id: number;
    name: string;
    albums: Album[];
    songs: Song[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}