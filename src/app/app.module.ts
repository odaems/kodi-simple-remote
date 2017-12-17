import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

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
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

export function createTranslateLoader(http: Http): TranslateStaticLoader {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

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
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    IonicStorageModule.forRoot()
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
    SettingsService,
    ToastController
  ]
})
export class AppModule { }
