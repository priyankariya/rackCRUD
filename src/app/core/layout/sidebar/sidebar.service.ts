import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menus: EventEmitter<any[]> = new EventEmitter<any[]>();
  clearMenus: EventEmitter<boolean> = new EventEmitter<boolean>();
  disableMenu: EventEmitter<any> = new EventEmitter<any>();
  disableConfiguration: EventEmitter<boolean> = new EventEmitter<boolean>();
  disableFeatures: EventEmitter<boolean> = new EventEmitter<boolean>();
}
