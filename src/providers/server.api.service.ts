import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { Song } from "../models/song";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import { SettingsService } from "./settings.service";
import { ServerSettings } from "../models/server.settings";

@Injectable()
export class ServerApiService {

  private songsForAlbumRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetSongs",
    "params": { "properties": ["albumid", "artist", "artistid", "duration", "album", "track", "disc"], "filter": { "albumid": null } },
    "id": "libSongs"
  }

  private albumsForArtistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetAlbums",
    "params": { "properties": [], "filter": { "artistid": null } },
    "id": "libSongs"
  }

  private getAllAlbumsRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetAlbums",
    "params": { "properties": ["artist", "artistid"] },
    "id": "libSongs"
  }

  private getAllArtistsRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetArtists",
    "params": { },
    "id": "libSongs"
  }

  private getAllSongsRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetSongs",
    "params": { "properties": ["albumid", "artist", "duration", "album", "track"] },
    "id": "libSongs"
  }



  constructor(public http: Http, public settings: SettingsService) {
  }

  getAllArtists(): Promise<Artist[]> {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.getAllArtistsRequest)).subscribe(
          (responseBody: any) => {
            let artists: Artist[] = [];
            if (responseBody.json() != null) {
              let response = responseBody.json();
              if (response != null && 'result' in response && 'artists' in response.result && response.result.artists.length > 0) {
                response.result.artists.forEach((artistFromResponse: any) => {
                  artists.push(new Artist(artistFromResponse.artistid, artistFromResponse.artist));
                });
              }
            }
            resolve(artists);
          }
        );
      }
    );
  }

  getAllAlbums(): Promise<Album[]> {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.getAllAlbumsRequest)).subscribe(
          (response: any) => {
            let albums: Album[] = [];
            if (response.json() != null) {
              let responseJSON = response.json();
              if (responseJSON != null && 'result' in responseJSON && 'albums' in responseJSON.result && responseJSON.result.albums.length > 0) {
                responseJSON.result.albums.forEach((albumFromResponse: any) => {
                  let albumArtist: Artist = new Artist(albumFromResponse.artistid[0], albumFromResponse.artist[0]);
                  albums.push(new Album(albumFromResponse.albumid, albumFromResponse.label, albumArtist));
                });
              }
            }
            resolve(albums);
          }
        );
      }
    );
  }

  getAlbum(albumId: number): Promise<Album> {
    return new Promise(
      (resolve: any) => {
        let requestObject: any = this.songsForAlbumRequest;
        requestObject.params.filter.albumid = albumId;
        this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
          (responseBody: any) => {
            if (responseBody.json() != null) {
              let response = responseBody.json();
              if (response != null && 'result' in response && 'songs' in response.result && response.result.songs.length > 0) {
                let albumArtist: Artist = new Artist(response.result.songs[0].artistid[0], response.result.songs[0].artist[0]);
                let album: Album = new Album(albumId, response.result.songs[0].album, albumArtist);
                album.songs = [];
                response.result.songs.forEach((songFromResponse: any) => {
                  album.songs.push(new Song(songFromResponse.songid, songFromResponse.label, songFromResponse.duration, songFromResponse.track, songFromResponse.disc, albumArtist, album))
                });
                resolve(album);
              }
            }
            resolve({});
          }
        );
      }
    );
  }

  getAlbumsForArtist(artist: Artist): Promise<Artist> {
    return new Promise(
      (resolve: any) => {
        let requestObject: any = this.albumsForArtistRequest;
        requestObject.params.filter.artistid = artist.id;
        this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
          (response: any) => {
            artist.albums = [];
            console.log(artist);
            if (response.json() != null) {
              let responseJSON = response.json();
              if (responseJSON != null && 'result' in responseJSON && 'albums' in responseJSON.result && responseJSON.result.albums.length > 0) {
                responseJSON.result.albums.forEach((albumFromResponse: any) => {
                  artist.albums.push(new Album(albumFromResponse.albumid, albumFromResponse.label, artist));
                });
              }
            }
            resolve(artist);
          }
        );
      }
    );
  }

  getAllSongs(): Song[] {
    return [];
  }

  sendPlaylist() {

  }

  fetchPlaylist() {

  }
  private generateURL() {
    let settings: ServerSettings = this.settings.getServerSettings();
    return 'http://' + settings.userName + ':' + settings.password + '@' + settings.host + ':' + settings.port + '/jsonrpc?request=';
  }

}
