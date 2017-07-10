import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';
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

  public albums: Album[] = [];
  public artists: Artist[];
  public currentAlbum: Album;
  public currentArtist: Artist;

  constructor(public navCtrl: NavController,
    public musicBrowser: MusicBrowserService,
    public playlistService: PlaylistService,
    public toast: ToastController,
    public events: Events) {
    this.events.subscribe('settings:available', () => this.refresh());
  }

  showSongAddedToast(song: Song) {
    let toastr = this.toast.create({
      message: '"' + song.artist.name + ' - ' + song.name + '" zur Playlist hinzugefügt!',
      duration: 4000,
      position: 'top'
    });
    toastr.present();
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
    this.showSongAddedToast(song);
  }

  selectAlbum(album: Album) {
    this.musicBrowser.getAlbum(album).then((album: Album) => this.currentAlbum = album);
  }

  refresh(refresher?: any) {
    // if this fails, we want to at least cancel the refresher:
    setTimeout(() => refresher.cancel(), 10000);
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
