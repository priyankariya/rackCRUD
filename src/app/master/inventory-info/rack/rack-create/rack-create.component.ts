import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { RackFormComponent } from '../rack-form/rack-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-rack-create',
  templateUrl: 'rack-create.component.html',
  styleUrls: ['rack-create.component.scss']
})
export class RackCreateComponent {

  @ViewChild('rackForm') rackForm: RackFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveRack.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveRack() {
    this.rackForm.submit();
  }

  onSubmitRack(data) {
    this.masterApiService.createRack(data).subscribe(() => {
      this.rackForm.reset();
      this.coreService.statusHandler.emit('Rack saved successfully..');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
