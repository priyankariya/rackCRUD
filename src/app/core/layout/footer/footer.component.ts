import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core.service';
import {UtilityService} from '../../../shared/services/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {

  now = new Date();
  message: string;
  loggedInUser;
  organization;
  branch;

  constructor(private coreService: CoreService) {}

  ngOnInit() {
    setInterval(() => {
      this.now =  new Date();
    }, 1000);

    this.coreService.statusHandler.subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000);
    });

    this.coreService.statusChanged.subscribe((status) => {
      if (status) {
        this.organization = this.coreService.getProperty('organization');
        this.branch = this.coreService.getProperty('branch');
        this.loggedInUser = this.coreService.getProperty('user');
      }
    });
  }
}
