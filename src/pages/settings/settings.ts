import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { SettingsService } from "../../providers/settings.service";
import { ServerSettings } from "../../models/server.settings";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsModal {
  private host:string;
  private port: number;
  private userName: string;
  private password: string;
  
  
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
    )
  }

  close() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.settingsService.saveServerSettings(new ServerSettings(this.host, this.port, this.userName, this.password));
    this.close();
  }

}
