import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gateway',
  templateUrl: 'gateway.component.html',
  styleUrls: ['gateway.component.scss']
})
export class GatewayComponent {
  @HostListener('document: keydown', ['$event'])onKEyDown(e) {
    if (e.keyCode === 27) {
      this.goBack();
    }
  }

  constructor(private _location: Location) {}

  goBack() {
    this._location.back();
  }

}
