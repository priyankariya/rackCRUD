import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-account-info',
  templateUrl: 'account-info.component.html',
  styleUrls: ['account-info.component.scss']
})
export class AccountInfoComponent {

  constructor(private _location: Location, private coreService: CoreService) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 27) {
      this.goBack();
    }
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

}
