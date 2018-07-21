import {Component, HostListener} from '@angular/core';
import {Location} from '@angular/common';
import { CoreService } from '../../core/core.service';

@Component ({
  selector: 'app-inventory-info',
  templateUrl: 'inventory-info.component.html',
  styleUrls: ['inventory-info.component.scss']
})
export class InventoryInfoComponent {

  visibility = false;

  constructor (
    private _location: Location, private coreService: CoreService) {}

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 27) {
      this.goBack();
    }
  }

  goBack() {
    this._location.back();
  }

  openList() {
    this.visibility = true;
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

}
