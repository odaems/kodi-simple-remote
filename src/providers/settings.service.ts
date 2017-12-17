import { Injectable } from '@angular/core';
import { ServerSettings } from "../models/server.settings";
import { Storage } from '@ionic/storage';
import { Events } from "ionic-angular";
import { TranslateService } from "ng2-translate";

@Injectable()
export class SettingsService {

  public settings: ServerSettings;
  public selectedLanguage: string;

  constructor(public storage: Storage,
    public events: Events,
    public translate: TranslateService) {
    storage.ready().then(
      () => {
        this.loadServerSettings().then(
          (settings: ServerSettings) => {
            this.settings = settings;
            this.events.publish('settings:available', settings);
          }
        );
        this.loadLanguageSettings();
      }
    );
  }

  saveLanguageSettings(lang: string) {
    this.selectedLanguage = lang;
    this.storage.set('language', lang).then(
      () => this.translate.use(lang)
    )
  }

  loadLanguageSettings(){
    this.storage.get('language').then(
      (language: string) => {
        if (language != null && language != '') {
          this.translate.use(language);
          this.selectedLanguage = language;
        }
        else {
          this.translate.use('en');
        }
      }
    )
  }

  getLanguageSetting(): string {
    return this.selectedLanguage;
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