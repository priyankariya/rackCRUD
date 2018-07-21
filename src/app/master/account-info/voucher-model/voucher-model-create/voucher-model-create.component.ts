import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';


import { VoucherModelFormComponent } from '../voucher-model-form/voucher-model-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CoreService } from '../../../../core/core.service';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';

@Component({
  selector: 'app-voucher-model-create',
  templateUrl: 'voucher-model-create.component.html',
  styleUrls: ['voucher-model-create.component.scss']
})
export class VoucherModelCreateComponent {

  @ViewChild('voucherTypeForm') voucherTypeForm: VoucherModelFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveVoucherModel.bind(this), this.goBack.bind(this)
      );
    }
  }
  constructor(
    private coreService: CoreService,
    private _location: Location,
    private masterApiService: MasterApiService
  ) {}

  goBack() {
    this._location.back();
  }

  saveVoucherModel() {
    this.voucherTypeForm.submit();
  }

  onSubmitVoucherModel(voucherModel) {
    this.masterApiService.createVoucherModel(voucherModel).subscribe(() => {
      this.coreService.statusHandler.emit('Voucher Type Saved Successfully...');
      this.voucherTypeForm.reset();
    });
  }
}
