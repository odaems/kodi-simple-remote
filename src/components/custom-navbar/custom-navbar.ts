import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsModal } from "../../pages/settings/settings";

@Component({
  selector: 'custom-navbar',
  templateUrl: 'custom-navbar.html'
})

export class CustomNavbarComponent {

  constructor(public navCtrl: NavController,
      public modalCtrl: ModalController) {

  }

  openSettings() {
    let settingsModal = this.modalCtrl.create(SettingsModal);
    settingsModal.present();

  }
}
