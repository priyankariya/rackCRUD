import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';
import { TransactionApiService } from '../../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../../transaction-shared/service/voucher-model.service';
import { AccountVoucherElementComponent } from '../../../transaction-shared/components/account-voucher-element/account-voucher-element.component';

@Component({
  selector: 'app-payment-create',
  templateUrl: 'payment-create.component.html',
  styleUrls: ['payment-create.component.scss']
})
export class PaymentCreateComponent implements OnInit {

  voucherModel;

  @ViewChild('doubleEntrySystem') doubleEntrySystem: AccountVoucherElementComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      // e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.savePayment.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private transactionApiService: TransactionApiService,
    private voucherModelService: VoucherModelService
  ) { }

  ngOnInit() {
    if (this.voucherModelService.voucherModel) {
      this.voucherModel = this.voucherModelService.voucherModel;
    }
  }

  savePayment() {
    this.doubleEntrySystem.submit();
  }

  onSubmitPayment(payment) {
    this.transactionApiService.createPayment(payment).subscribe(() => {
      this.doubleEntrySystem.reset();
      this.coreService.statusHandler.emit('Payment Voucher saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
