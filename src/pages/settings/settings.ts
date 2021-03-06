import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { SettingsService } from "../../providers/settings.service";
import { ServerSettings } from "../../models/server.settings";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsModal {
  public host: string;
  public port: number;
  public userName: string;
  public password: string;
  public availableLanguages: string[] = ['en', 'de']
  public selectedLang: string;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public settingsService: SettingsService) {

  }

  ngOnInit() {
    this.settingsService.loadServerSettings().then(
      (settings: ServerSettings) => {
        if (settings != null) {
          this.host = settings.host;
          this.port = settings.port;
          this.userName = settings.userName;
          this.password = settings.password;
        }
      }
    );
    this.selectedLang = this.settingsService.getLanguageSetting();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  changeLanguage(lang: string) {
    if (lang != null && lang != "") {
      this.settingsService.saveLanguageSettings(lang);
    }
  }

  save() {
    this.settingsService.saveServerSettings(new ServerSettings(this.host, this.port, this.userName, this.password));
    this.close();
  }

}
