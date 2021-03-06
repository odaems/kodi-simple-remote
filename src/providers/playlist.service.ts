import { Injectable } from '@angular/core';
import { Song } from "../models/song";
import { ServerApiService } from "./server.api.service";
import { Playlist } from "../models/playlist";

@Injectable()
export class PlaylistService {

  private playlist: Playlist;

  constructor(public serverApi: ServerApiService) {

  }

  ngOnInit() {
    this.refresh();
  }

  addSong(song: Song) {
    this.getCurrentPlaylist().then(
      (playlist: Playlist) => {
        this.playlist = playlist;
        console.log(playlist);
        let autoStart = false;
        // if this was the first song added to the playlist, initialize player:
        if (this.playlist.songs.length === 0) {
          autoStart = true;
        }

        this.playlist.songs.push(song);
        this.serverApi.addSongToPlaylist(song).then(
          () => {
            if (autoStart) {
              this.serverApi.startPlayer();
            }
          }
        );
      }
    );
  }

  removeSong(index: number) {
    this.playlist.songs.splice(index, 1);
    this.serverApi.removeSongFromPlaylist(index);
  }

  refresh() {
    this.getCurrentPlaylist().then((playlist: Playlist) => this.playlist = playlist);
  }

  playSong(index: number): Promise<any> {
    return this.serverApi.playSong(index);
  }

  removeSongFromPlaylist(index) {
    return this.serverApi.removeSongFromPlaylist(index);
  }


  getCurrentPlaylist(): Promise<Playlist> {
    return new Promise(
      (resolve: any) => {
        this.serverApi.getCurrentPlaylist().then(
          (playlist: Playlist) => {
            if (playlist.songs != null && playlist.songs.length > 0) {
              this.serverApi.getCurrentSong().then(
                (song: Song) => {
                  if (!(Object.keys(song).length === 0 && song.constructor === Object)) {
                    playlist.songs.forEach(
                      (songFromPlaylist: Song, index: number) => {
                        if (songFromPlaylist.id == song.id && songFromPlaylist.album.id == song.album.id) {
                          playlist.activeIndex = index;
                        }
                      }
                    );
                  }
                  resolve(playlist);
                }
              );
            }
            else {
              resolve(playlist);
            }
          }
        );
      }
    );
  }

}