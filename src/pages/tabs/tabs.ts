import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { PlaylistPage } from '../playlist/playlist';
import { BrowsePage } from '../browse/browse';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BrowsePage;
  tab2Root = PlaylistPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
