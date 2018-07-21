import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilityService } from '../../../shared/services/utility.service';
import { TransactionApiService } from '../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../transaction-shared/service/voucher-model.service';
import { CoreService } from '../../../core/core.service';


@Component({
  selector: 'app-receipt',
  templateUrl: 'receipt.component.html',
  styleUrls: ['receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;

  autoCompleteFields = [
    {caption: 'Name', dataField: 'name', width: 100}
  ];
  voucherModel;

  receiptDataStreamCallback = this.receiptDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    UtilityService.keyDown(
      e, this.addReceipt.bind(this), this.editReceipt.bind(this), this.deleteReceipt.bind(this), this.goBack.bind(this)
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

  ngOnInit() {
    if (this.voucherModelService.voucherModel) {
      this.voucherModel = this.voucherModelService.voucherModel;
    }
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([58])) {}
    // statements here...
  }

  receiptDataStream(searchParams) {
    return this.transactionApiService.listReceipt(searchParams);
  }

  addReceipt() {
    if (this.userPermissions([57])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editReceipt() {
    if (this.userPermissions([59])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteReceipt() {
    if (this.userPermissions([60])) {
      this.reloadList = false;
      this.transactionApiService.deleteReceipt(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }
}

