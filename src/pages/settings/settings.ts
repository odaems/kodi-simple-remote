import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsModal {

  constructor(public navCtrl: NavController,
  public viewCtrl: ViewController) {

  }

  close() {
    this.viewCtrl.dismiss();
  }

}
