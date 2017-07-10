import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Playlist } from "../../models/playlist";
import { PlaylistService } from "../../providers/playlist.service";
import { ServerApiService } from "../../providers/server.api.service";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {

  public playlist: Playlist;
  public playing: boolean;

  constructor(public navCtrl: NavController, public playlistService: PlaylistService, public serverApi: ServerApiService) {

  }

  //Otherwise adding a song without visiting this will result in illegal state
  ngOnInit() {
    this.refresh();
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh(refresher?: any) {
    // if this fails, we want to at least cancel the refresher:
    setTimeout(() => refresher.complete(), 10000);
    this.playlistService.getCurrentPlaylist().then(
      (playlist: Playlist) => {
        this.playlist = playlist;
        this.serverApi.getPlayerStatus().then(
          (status: boolean) => {
            this.playing = status;
            if (refresher != null) {
              refresher.complete();
            }
          }
        );
      }
    );
  }

  play(index: number) {
    this.playlistService.playSong(index).then(() => setTimeout(() => this.refresh(), 50));
  }

  togglePlayback() {
    this.serverApi.togglePlayback().then(
      (status: boolean) => this.playing = status,
      () => {
        this.serverApi.startPlayer();
      });
  }

  stopPlayer() {
    this.serverApi.stopPlayer().then(
      () => {
        this.playing = false
        this.playlist.activeIndex = undefined;
      }
    );
  }

  remove(index: number) {
    this.playlist.songs.splice(index, 1);
    this.playlistService.removeSongFromPlaylist(index);
  }
}
