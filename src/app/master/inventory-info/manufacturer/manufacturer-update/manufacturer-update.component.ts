import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { ManufacturerFormComponent } from '../manufacturer-form/manufacturer-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-manufacturer-update',
  templateUrl: 'manufacturer-update.component.html',
  styleUrls: ['manufacturer-update.component.scss']
})
export class ManufacturerUpdateComponent implements OnInit {

  manufacturer;

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
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getManufacturer(params['id']).subscribe((result) => {
        this.manufacturer = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveManufacturer() {
    this.manufacturerForm.submit();
  }

  onSubmitManufacturer(manufacturer) {
    this.masterApiService.updateManufacturer(manufacturer).subscribe(() => {
      this.manufacturerForm.reset();
      this._location.back();
    });
  }
}
