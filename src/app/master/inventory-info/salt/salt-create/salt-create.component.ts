import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { SaltFormComponent } from '../salt-form/salt-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-salt-create',
  templateUrl: 'salt-create.component.html',
  styleUrls: ['salt-create.component.scss']
})
export class SaltCreateComponent {

  @ViewChild('saltForm') saltForm: SaltFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveSalt.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveSalt() {
    this.saltForm.submit();
  }

  onSubmitSalt(salt) {
    this.masterApiService.createSalt(salt).subscribe(() => {
      this.saltForm.reset();
      this.coreService.statusHandler.emit('Salt saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
