import { Injectable } from '@angular/core';
import { ServerSettings } from "../models/server.settings";
import { Storage } from '@ionic/storage';
import { Platform, Events } from "ionic-angular";

@Injectable()
export class SettingsService {

  private settings: ServerSettings;

  constructor(platform: Platform, 
  private storage: Storage,
  public events: Events) {
    platform.ready().then(
      () => {
        this.loadServerSettings().then(
          (settings: ServerSettings) => {
            this.settings = settings;
            this.events.publish('settings:available');
          }
        );
      }
    );
  }

  getServerSettings(): ServerSettings {
    return this.settings;
  }

  loadServerSettings(): Promise<ServerSettings> {
    return this.storage.get('settings');
  }

  saveServerSettings(serverSettings: ServerSettings) {
    this.settings = serverSettings;
    this.storage.set('settings', serverSettings);
  }
}