import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';


import { SidebarService } from '../core/layout/sidebar/sidebar.service';

@Component({
  selector: 'app-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private _location: Location, private sidebarService: SidebarService) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (e.keyCode === 27) {
      this.goBack();
    }
  }

  ngOnInit() {
    this.sidebarService.disableConfiguration.emit(true);
  }

  goBack() {
    this.sidebarService.disableConfiguration.emit(false);
    this._location.back();
  }

}
