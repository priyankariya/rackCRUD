import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';
import { TransactionApiService } from '../../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../../transaction-shared/service/voucher-model.service';
import { AccountVoucherElementComponent } from '../../../transaction-shared/components/account-voucher-element/account-voucher-element.component';

@Component({
  selector: 'app-payment-update',
  templateUrl: 'payment-update.component.html',
  styleUrls: ['payment-update.component.scss']
})
export class PaymentUpdateComponent implements OnInit {

  paymentData: any;
  voucherModel;

  @ViewChild('doubleEntrySystem') doubleEntrySystem: AccountVoucherElementComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.savePayment.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private transactionApiService:  TransactionApiService,
    private voucherModelService: VoucherModelService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.transactionApiService.getPayment(params['id']).subscribe((result) => {
        this.paymentData = result;
      });
    });
    if (this.voucherModelService.voucherModel) {
      this.voucherModel = this.voucherModelService.voucherModel;
    }
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  savePayment() {
    this.doubleEntrySystem.submit();
  }

  onSubmitPayment(payment) {
    this.transactionApiService.updatePayment(payment).subscribe(() => {
      this.doubleEntrySystem.reset();
      this._location.back();
    });
  }
}
