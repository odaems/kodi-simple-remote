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
  private currentAlbum: Album;
  private currentArtist: Artist;

  constructor(public navCtrl: NavController,
    public musicBrowser: MusicBrowserService) {
  }

  ngOnInit() {
    this.refresh();
  }

  backToAlbums() {
    this.currentAlbum = undefined;
  }

  selectAlbum(album: Album) {
    this.musicBrowser.getAlbum(album).then((album: Album) => this.currentAlbum = album);
  }

  refresh() {
    this.musicBrowser.getAllAlbums().then((albums: Album[]) => this.albums = albums);
  }

}
