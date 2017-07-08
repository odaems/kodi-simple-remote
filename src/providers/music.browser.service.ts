import { Injectable } from '@angular/core';
import { Artist } from "../models/artist";
import { Album } from "../models/album";
import { ServerApiService } from "./server.api.service";
import { Song } from "../models/song";

@Injectable()
export class MusicBrowserService {
    constructor(private serverApi: ServerApiService) {

    }

    getAllArtists() {

    }

    getAllAlbums(): Promise<Album[]> {
        console.log("MBS.getAllAlbums()");
        return this.serverApi.getAllAlbums();
    }

    getAllAlbumsForArtist(artist: Artist) {

    }

    getAllSongsForArtist(artist: Artist) {

    }

    getAlbum(album: Album): Promise<Album> {
        return this.serverApi.getAlbum(album.id);
    }

}