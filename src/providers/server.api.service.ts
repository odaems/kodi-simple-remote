import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Song } from "../models/song";
import { Album } from "../models/album";
import { Artist } from "../models/artist";
import { SettingsService } from "./settings.service";
import { ServerSettings } from "../models/server.settings";
import { Playlist } from "../models/playlist";

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
    "params": { "properties": ["thumbnail"], "filter": { "artistid": null } },
    "id": "libSongs"
  }

  private getAllAlbumsRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetAlbums",
    "params": { "properties": ["artist", "artistid", "thumbnail"] },
    "id": "libSongs"
  }

  private getAllArtistsRequest: Object = {
    "jsonrpc": "2.0",
    "method": "AudioLibrary.GetArtists",
    "params": {"sort": { "order": "ascending", "method": "artist", "ignorearticle": true }},
    "id": "libSongs"
  }

  private getCurrentPlaylistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Playlist.GetItems",
    "params": { "playlistid": 0, "properties": ["albumid", "duration", "artist", "artistid", "album", "track"] },
    "id": "libSongs"
  }

  private getCurrentSongRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.GetItem",
    "params": { "playerid": 0, "properties": ["albumid", "duration", "artist", "track", "artistid", "album"] },
    "id": "libSongs"
  }

  private playSongFromPlaylistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.GoTo",
    "params": { "playerid": 0, "to": null },
    "id": "libSongs"
  }

  private addSongToPlaylistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Playlist.Add",
    "params": { "playlistid": 0, "item": { "songid": null } },
    "id": "libSongs"
  }

  private removeSongFromPlaylistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Playlist.Remove",
    "params": { "playlistid": 0, "position": null },
    "id": "libSongs"
  }

  private togglePlaybackRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.PlayPause",
    "params": { "playerid": 0 },
    "id": "libSongs"
  }

  private getPlayerStatusRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.GetProperties",
    "params": { "playerid": 0, "properties": ["speed"] },
    "id": "libSongs"
  }

  private startPlayerWithPlaylistRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.Open",
    "params": { "item": { "playlistid": 0 } },
    "id": "libSongs"
  }

  private stopPlayerRequest: Object = {
    "jsonrpc": "2.0",
    "method": "Player.Stop",
    "params": { "playerid": 0 },
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
          },
          (error: any) => console.log(error)
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
                  albums.push(new Album(albumFromResponse.albumid, albumFromResponse.label, albumArtist, albumFromResponse.thumbnail));
                });
              }
            }
            resolve(albums);
          },
          (error: any) => console.log(error)
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
          },
          (error: any) => console.log(error)
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
            if (response.json() != null) {
              let responseJSON = response.json();
              if (responseJSON != null && 'result' in responseJSON && 'albums' in responseJSON.result && responseJSON.result.albums.length > 0) {
                responseJSON.result.albums.forEach((albumFromResponse: any) => {
                  artist.albums.push(new Album(albumFromResponse.albumid, albumFromResponse.label, artist, albumFromResponse.thumbnail));
                });
              }
            }
            resolve(artist);
          },
          (error: any) => console.log(error)
        );
      }
    );
  }

  getAllSongs(): Song[] {
    return [];
  }

  getCurrentPlaylist(): Promise<Playlist> {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.getCurrentPlaylistRequest)).subscribe(
          (response: any) => {
            let playlist = new Playlist();
            if (response.json() != null) {
              let responseJSON = response.json();
              if (responseJSON != null && 'result' in responseJSON && 'items' in responseJSON.result && responseJSON.result.items.length > 0) {
                responseJSON.result.items.forEach((songFromResponse: any) => {
                  let artist = new Artist(undefined, songFromResponse.artist[0]);
                  playlist.songs.push(new Song(songFromResponse.id, songFromResponse.label, songFromResponse.duration, songFromResponse.track, 0,
                    artist, new Album(songFromResponse.albumid, songFromResponse.album, artist)));
                });
              }
            }
            resolve(playlist);
          }
        );
      }
    );
  }

  getCurrentSong(): Promise<Song> {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.getCurrentSongRequest)).subscribe(
          (response: any) => {
            if (response.json() != null) {
              let responseJSON = response.json();
              if (responseJSON != null && 'result' in responseJSON && 'item' in responseJSON.result && responseJSON.result.item != null) {
                let songFromResponse = responseJSON.result.item;
                if (songFromResponse.type != "unknown") {
                  let artist = new Artist(songFromResponse.artistid[0], songFromResponse.artist[0]);
                  resolve(new Song(songFromResponse.id, songFromResponse.label, songFromResponse.duration, songFromResponse.track, 0,
                    artist, new Album(songFromResponse.albumid, songFromResponse.album, artist)));
                }
                else {
                  resolve({});
                }
              }
            }

          },
          (error: any) => console.log(error)
        );
      }
    );
  }

  playSong(index: number) {
    return new Promise(
      (resolve: any) => {
        let requestObject: any = this.playSongFromPlaylistRequest;
        requestObject.params.to = index;
        this.http.get(this.generateURL() + JSON.stringify(this.getCurrentSongRequest)).subscribe(
          (response: any) => {
            let responseJSON = { result: { item: { label: ""}}};
            if (response.json() != null) {
              responseJSON = response.json();
            }
            if (responseJSON.result != null && responseJSON.result.item != null 
              && responseJSON.result.item.label != "") {
              console.log("trying to start playback!");
              console.log(responseJSON);
              this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
                () => resolve(),
                (error: any) => console.log(error)
              );
            }
            else {
              console.log("this.startPlayer()");
              this.startPlayer().then(
                () => {
                  this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
                    () => resolve(),
                    (error: any) => console.log(error)
                  );
                }
              )
            }
        });
      }
    );
  }

  startPlayer() {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.startPlayerWithPlaylistRequest)).subscribe(
          () => resolve(),
          (error: any) => console.log(error)
        );
      }
    );
  }

  stopPlayer() {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.stopPlayerRequest)).subscribe(
          () => resolve(),
          (error: any) => console.log(error)
        );
      }
    );
  }

  togglePlayback(): Promise<boolean> {
    return new Promise(
      (resolve: any, reject: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.togglePlaybackRequest)).subscribe(
          (response: any) => {
            let responseBody: any = response.json();
            if ('error' in responseBody) {
              reject(false);
            }
            else if ('result' in responseBody && 'speed' in responseBody.result && responseBody.result.speed === 1) {
              resolve(true);
            }
            else {
              resolve(false);
            }
          },
          (error: any) => console.log(error)
        );
      }
    );
  }

  getPlayerStatus(): Promise<boolean> {
    return new Promise(
      (resolve: any) => {
        this.http.get(this.generateURL() + JSON.stringify(this.getPlayerStatusRequest)).subscribe(
          (response: any) => {
            let responseBody: any = response.json();
            if ('result' in responseBody && 'speed' in responseBody.result && responseBody.result.speed === 1) {
              resolve(true);
            }
            else {
              resolve(false);
            }
          },
          (error: any) => console.log(error)
        );
      }
    );
  }



  addSongToPlaylist(song: Song): Promise<any> {
    return new Promise(
      (resolve: any) => {
        let requestObject: any = this.addSongToPlaylistRequest;
        requestObject.params.item.songid = song.id;
        this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
          () => resolve(),
          (error: any) => console.log(error)
        );
      }
    );

  }

  removeSongFromPlaylist(index: number): Promise<any> {
    return new Promise(
      (resolve: any) => {
        let requestObject: any = this.removeSongFromPlaylistRequest;
        requestObject.params.position = index;
        this.http.get(this.generateURL() + JSON.stringify(requestObject)).subscribe(
          () => resolve(),
          (error: any) => console.log(error)
        );
      }
    );
  }

  private generateURL() {
    let settings: ServerSettings = this.settings.getServerSettings();
    console.log('http://' + settings.userName + ':' + settings.password + '@' + settings.host + ':' + settings.port + '/jsonrpc?request=');
    if ((<any>window).cordova) {
      return 'http://' + settings.userName + ':' + settings.password + '@' + settings.host + ':' + settings.port + '/jsonrpc?request=';
    } else {
      return 'http://' + settings.userName + ':' + settings.password + '@' + settings.host + ':' + settings.port + '/api/jsonrpc?request=';
    }
  }

}
