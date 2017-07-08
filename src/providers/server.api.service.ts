import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { Song } from "../models/song";
import { Album } from "../models/album";
import { Artist } from "../models/artist";

@Injectable()
export class ServerApiService {
    private host: string;
    private port: number;
    private username: string;
    private password: string;

  constructor(public http: Http) {

  }

  getAllArtists(): Artist[] {
    return [];
  }

  getAllAlbums(): Album[] {
    return [];
  }

  getAllSongs(): Song[] {
    return [];
  }

  sendPlaylist() {

  }

  fetchPlaylist() {
    
  }

}