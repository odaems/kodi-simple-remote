import { Injectable } from '@angular/core';
import { Song } from "../models/song";
import { ServerApiService } from "./server.api.service";

@Injectable()
export class PlaylistService {

  private playlist: Song[];

  constructor(serverApi: ServerApiService) {
    
  }

  getCurrent(): Song[] {
    return this.playlist;
  }

  addSong(song: Song) {

  }

  removeSong(index: number) {

  }
}