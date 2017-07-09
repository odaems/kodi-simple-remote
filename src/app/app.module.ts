import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsModal } from '../pages/settings/settings';
import { PlaylistPage } from '../pages/playlist/playlist';
import { BrowsePage } from '../pages/browse/browse';
import { TabsPage } from '../pages/tabs/tabs';
import { CustomNavbarComponent } from '../components/custom-navbar/custom-navbar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsService } from "../providers/settings.service";
import { PlaylistService } from "../providers/playlist.service";
import { ServerApiService } from "../providers/server.api.service";
import { MusicBrowserService } from "../providers/music.browser.service";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    SettingsModal,
    PlaylistPage,
    BrowsePage,
    TabsPage,
    CustomNavbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsModal,
    PlaylistPage,
    BrowsePage,
    TabsPage,
    CustomNavbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServerApiService,
    PlaylistService,
    MusicBrowserService,
    SettingsService
  ]
})
export class AppModule { }
