import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Playlist } from "../../models/playlist";
import { PlaylistService } from "../../providers/playlist.service";
import { Song } from "../../models/song";
import { ServerApiService } from "../../providers/server.api.service";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {

  private playlist: Playlist;
  private playing: boolean;

  constructor(public navCtrl: NavController, public playlistService: PlaylistService, public serverApi: ServerApiService) {
    
  }

  //Otherwise adding a song without visiting this will result in illegal state
  ngOnInit() {
    this.refresh();
  }

  ionViewDidEnter() {
    this.refresh();
  }

  refresh() {
    this.playlistService.getCurrentPlaylist().then((playlist: Playlist) => this.playlist = playlist);
    this.serverApi.getPlayerStatus().then((status: boolean) => this.playing = status);
  }

  play(index: number) {
    this.playlistService.playSong(index).then(() => setTimeout(() => this.refresh(), 50));
  }

  togglePlayback() {
    this.serverApi.togglePlayback().then((status: boolean) => this.playing = status);
  }

  remove(index: number) {
    this.playlist.songs.splice(index, 1);
    this.playlistService.removeSongFromPlaylist(index);
  }
}
