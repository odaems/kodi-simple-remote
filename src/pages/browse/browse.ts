import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { MusicBrowserService } from "../../providers/music.browser.service";
import { Song } from "../../models/song";
import { PlaylistService } from "../../providers/playlist.service";

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})

export class BrowsePage {

  private albums: Album[] = [];
  private artists: Artist[];
  private currentAlbum: Album;
  private currentArtist: Artist;

  constructor(public navCtrl: NavController,
    public musicBrowser: MusicBrowserService,
    public playlistService: PlaylistService,
    platform: Platform) {
    platform.ready().then(
      () => {
        this.refresh();
      }
    );
  }

  backToAlbums() {
    this.currentAlbum = undefined;
    this.currentArtist = undefined;
  }

  selectArtist(artist: Artist) {
    this.musicBrowser.getArtist(artist).then(
      (artist: Artist) => {
        this.currentArtist = artist;
        this.albums = artist.albums;
        this.currentAlbum = undefined;
      }
    )
  }

  addToPlaylist(song: Song) {
    this.playlistService.addSong(song);
  }

  selectAlbum(album: Album) {
    this.musicBrowser.getAlbum(album).then((album: Album) => this.currentAlbum = album);
  }

  refresh(refresher?: any) {
    this.musicBrowser.getAllArtists().then(
      (artists: Artist[]) => {
        this.artists = artists;
        if (refresher != null) {
          refresher.complete();
        }
      },
      () => {
        if (refresher != null) {
          refresher.cancel();
        }
      }
    );
  }

}
