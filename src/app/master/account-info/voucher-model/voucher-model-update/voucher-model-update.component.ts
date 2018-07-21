import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { VoucherModelFormComponent } from '../voucher-model-form/voucher-model-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';

@Component({
  selector: 'app-voucher-model-update',
  templateUrl: 'voucher-model-update.component.html',
  styleUrls: ['voucher-model-update.component.scss']
})
export class VoucherModelUpdateComponent implements OnInit {

  voucherModel;

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
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getVoucherModel(params['id']).subscribe((result) => {
        this.voucherModel = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveVoucherModel() {
    this.voucherTypeForm.submit();
  }

  onSubmitVoucherModel(voucherType) {
    this.masterApiService.updateVoucherModel(voucherType).subscribe((result) => {
      if (result) {
        this.voucherTypeForm.reset();
        this._location.back();
      }
    });
  }
}
