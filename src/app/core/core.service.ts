import { EventEmitter, Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { HttpHeaders } from '@angular/common/http';

const isDev = require('electron-is-dev');

@Injectable()
export class CoreService {
  api = 'http://159.65.152.186:8000';
  clientID = 0;
  organization: any;
  user: any;
  branch: any;
  remoteConnectivity: EventEmitter<boolean> = new EventEmitter<boolean>();
  dialogMode = false;
  statusHandler: EventEmitter<string> = new EventEmitter<string>();
  statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private electronService: ElectronService) {
    this.clientID = this.electronService.ipcRenderer.sendSync('getKey', {key: 'clientID'});
  }

  getProperty(property) {
    if (isDev || (property === 'clientID')) {
      return this.electronService.ipcRenderer.sendSync('getKey', {key: property});
    }
    return this[property];
  }

  setProperty(property, value) {
    if (isDev || (property === 'clientID')) {
      this.electronService.ipcRenderer.sendSync('setKey', {key: property, value: value});
    } else {
      this[property] = value;
    }
  }

  authHeaders(auth: boolean): HttpHeaders {
    const user = this.getProperty('user');
    if (auth) {
      if (user && user.token) {
        return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'JWT ' + user.token);
      }
    }
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  userPermitted(actions: number[]) {
    const permissions = this.getProperty('user').permissions;
    for (const i of permissions) {
      for (const j of actions) {
        if (i.action === j && i.value === 1) {
          return true;
        }
      }
    }
    return false;
  }
}
