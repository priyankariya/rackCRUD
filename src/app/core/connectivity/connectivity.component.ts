import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.scss']
})
export class ConnectivityComponent {

  @Input('timerValue') timerValue: any;

}
