import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';
import { ManufacturerFormComponent } from '../manufacturer-form/manufacturer-form.component';

@Component({
  selector: 'app-manufacturer-create',
  templateUrl: 'manufacturer-create.component.html',
  styleUrls: ['manufacturer-create.component.scss']
})
export class ManufacturerCreateComponent {

  @ViewChild('manufacturerForm') manufacturerForm: ManufacturerFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveManufacturer.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveManufacturer() {
    this.manufacturerForm.submit();
  }

  onSubmitManufacturer(manufacturer) {
    this.masterApiService.createManufacturer(manufacturer).subscribe(() => {
      this.manufacturerForm.reset();
      this.coreService.statusHandler.emit('Manufacturer saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
