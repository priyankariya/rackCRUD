import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { UnitFormComponent } from '../unit-form/unit-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-unit-create',
  templateUrl: 'unit-create.component.html',
  styleUrls: ['unit-create.component.scss']
})
export class UnitCreateComponent {

  @ViewChild('unitForm') unitForm: UnitFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveUnit.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveUnit() {
    this.unitForm.submit();
  }

  onSubmitUnit(unit) {
    this.masterApiService.createUnit(unit).subscribe(() => {
      this.unitForm.reset();
      this.coreService.statusHandler.emit('Unit saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
