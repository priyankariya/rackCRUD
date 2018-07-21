import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { TherapyFormComponent } from '../therapy-form/therapy-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-therapy-create',
  templateUrl: 'therapy-create.component.html',
  styleUrls: ['therapy-create.component.scss']
})
export class TherapyCreateComponent {

  @ViewChild('therapyForm') therapyForm: TherapyFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveTherapy.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveTherapy() {
    this.therapyForm.submit();
  }

  onSubmitTherapy(therapy) {
    this.masterApiService.createTherapy(therapy).subscribe(() => {
      this.therapyForm.reset();
      this.coreService.statusHandler.emit('Therapy saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
