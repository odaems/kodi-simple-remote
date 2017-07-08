import { Injectable } from '@angular/core';
import { Artist } from "../models/artist";
import { Album } from "../models/album";
import { ServerApiService } from "./server.api.service";

@Injectable()
export class MusicBrowserService {
    constructor(private serverApi: ServerApiService) {

    }

    getAllArtists(): Promise<Artist[]> {
        return this.serverApi.getAllArtists();
    }

    getAllAlbums(): Promise<Album[]> {
        return this.serverApi.getAllAlbums();
    }

    getArtist(artist: Artist): Promise<Artist> {
        return this.serverApi.getAlbumsForArtist(artist);
    }

    getAllSongsForArtist(artist: Artist) {

    }

    getAlbum(album: Album): Promise<Album> {
        return this.serverApi.getAlbum(album.id);
    }

}