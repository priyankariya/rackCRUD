import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreService } from './core.service';
import { CoreApiService } from '../shared/services/api/core-api.service';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-core',
  template: '<div class="page-load-animation"></div><router-outlet></router-outlet>' +
  '<app-connectivity id="overlay" *ngIf="!remoteConnectivity" [timerValue]="retryConnectionTimer"></app-connectivity>'
})
export class CoreComponent implements OnInit {

  remoteConnectivity = true;

  retryConnectionTimer = 10;

  retryInterval: any;

  constructor(
    private router: Router,
    private coreService: CoreService,
    private coreApiService: CoreApiService,
  ) { }

  @HostListener('document: keydown', ['$event']) onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 76) {
      this.logout();
    }
  }

  ngOnInit() {
    this.coreService.remoteConnectivity.subscribe((value) => {
      this.remoteConnectivity = value;
      if (this.remoteConnectivity) {
        clearInterval(this.retryInterval);
      } else {
        this.retryConnection();
      }
    });
  }

  retryConnection() {
    this.retryInterval = setInterval(() => {
      this.retryConnectionTimer -= 1;
      if (this.retryConnectionTimer === 0) {
        this.coreApiService.ping().subscribe(() => {
          this.coreService.remoteConnectivity.emit(true);
          this.retryConnectionTimer = 10;
        }, (err) => {
          if (err.status === 0) {
            this.retryConnectionTimer = 10;
          }
        });
      }
    }, 1000);
  }

  logout() {
    UtilityService.settings.setKey('user', null);
    this.coreService.statusChanged.emit(true);
    this.router.navigate(['/login']).then(() => {});
  }
}
