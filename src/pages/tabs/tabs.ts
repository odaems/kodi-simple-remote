import { Component } from '@angular/core';

import { PlaylistPage } from '../playlist/playlist';
import { BrowsePage } from '../browse/browse';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BrowsePage;
  tab2Root = PlaylistPage;

  constructor() {

  }
}
