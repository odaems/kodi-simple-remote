import { Injectable } from '@angular/core';
import { ServerSettings } from "../models/server.settings";

@Injectable()
export class SettingsService {
  constructor() {
    
  }

  getServerSettings() {
    return new ServerSettings("192.168.0.20", 8080, "kodi", "kodi");
  }

  saveServerSettings() {

  }
}