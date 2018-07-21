import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilityService } from '../../../shared/services/utility.service';
import { TransactionApiService } from '../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../transaction-shared/service/voucher-model.service';
import { CoreService } from '../../../core/core.service';


@Component({
  selector: 'app-contra',
  templateUrl: 'contra.component.html',
  styleUrls: ['contra.component.scss']
})
export class ContraComponent implements OnInit {

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;
  voucherModel;

  autoCompleteFields = [
    {caption: 'Name', dataField: 'name', width: 100}
  ];

  contraDataStreamCallback = this.contraDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    UtilityService.keyDown(
      e, this.addContra.bind(this), this.editContra.bind(this), this.deleteContra.bind(this), this.goBack.bind(this)
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
    if (this.userPermissions([64])) {}
    // statements here...
  }

  contraDataStream(searchParams) {
    return this.transactionApiService.listContra(searchParams);
  }

  addContra() {
    if (this.userPermissions([63])) {
      this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editContra() {
    if (this.userPermissions([65])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteContra() {
    if (this.userPermissions([66])) {
      this.reloadList = false;
      this.transactionApiService.deleteContra(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }
}

