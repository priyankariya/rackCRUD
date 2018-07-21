import { Component } from '@angular/core';
import { UtilityService } from '../../../shared/services/utility.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  loggedInUser = UtilityService.getFromLocalStorage('user');

  constructor() {}

}
