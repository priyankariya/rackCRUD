import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilityService } from '../../../shared/services/utility.service';
import { TransactionApiService } from '../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../transaction-shared/service/voucher-model.service';
import { CoreService } from '../../../core/core.service';


@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.scss']
})
export class PaymentComponent implements  OnInit {

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;
  voucherModel;

  autoCompleteFields = [
    {caption: 'Name', dataField: 'name', width: 100}
  ];

  paymentDataStreamCallback = this.paymentDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    UtilityService.keyDown(
      e, this.addPayment.bind(this), this.editPayment.bind(this), this.deletePayment.bind(this), this.goBack.bind(this)
    );
  }

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionApiService: TransactionApiService,
    private voucherModelService: VoucherModelService,
    private coreService: CoreService
  ) {}

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  ngOnInit() {
    if (this.voucherModelService.voucherModel) {
      this.voucherModel = this.voucherModelService.voucherModel;
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([52])) {}
    // statements here...
  }

  paymentDataStream(searchParams) {
    return this.transactionApiService.listPayment(searchParams);
  }

  addPayment() {
    if (this.userPermissions([51])) {
      this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editPayment() {
    if (this.userPermissions([53])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deletePayment() {
    if (this.userPermissions([54])) {
      this.reloadList = false;
      this.transactionApiService.deletePayment(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }
}

