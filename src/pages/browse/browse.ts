import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { MusicBrowserService } from "../../providers/music.browser.service";

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})

export class BrowsePage {

  private albums: Album[];
  private artists: Artist[];
  private currentAlbum: Album;
  private currentArtist: Artist;
  private artistMode: boolean;

  constructor(public navCtrl: NavController,
    public musicBrowser: MusicBrowserService) {
  }

  ngOnInit() {
    this.refresh();
    this.artistMode = true;
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

  selectAlbum(album: Album) {
    this.musicBrowser.getAlbum(album).then((album: Album) => this.currentAlbum = album);
  }

  refresh() {
    this.musicBrowser.getAllAlbums().then((albums: Album[]) => this.albums = albums);
    this.musicBrowser.getAllArtists().then((artists: Artist[]) => this.artists = artists);
  }

}
