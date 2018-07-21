import { Component, EventEmitter, HostListener } from '@angular/core';
import { Location } from '@angular/common';


import { UtilityService } from '../../shared/services/utility.service';
import { AutoCompleteDialogService } from '../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { AdministrationApiService } from '../../shared/services/api/administration-api.service';

@Component({
  selector: 'app-voucher-numbering',
  templateUrl: 'voucher-numbering.component.html',
  styleUrls: ['voucher-numbering.component.scss']
})
export class VoucherNumberingComponent {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];

  voucherNumberingFocusHandler: EventEmitter<any> = new EventEmitter<any>();
  selectedBranch;
  selectedFinancialYear;
  voucherNumbering = [];

  constructor(
    private _location: Location,
    private administrationApiService: AdministrationApiService,
    private autoCompleteDialogService: AutoCompleteDialogService
  ) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    UtilityService.keyDown(
      e, undefined, undefined, undefined, this.goBack.bind(this), this.submit.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  onAutoCompleteSelect(item) {
    // statements here...
  }

  submit() {
    const obj = [];
    if (this.voucherNumbering) {
      for (const i of this.voucherNumbering) {
        obj.push({
          branchId: i.branchId,
          financialYearId: i.financialYearId,
          voucherTypeId: i.voucherTypeId,
          prefix: i.prefix,
          suffix: i.suffix,
          serial: i.serial
        });
      }
    }
    this.administrationApiService.updateVoucherNumbering(obj).subscribe(() => {
      this.goBack();
    });
  }

  getVoucherNumbering() {
    if (this.selectedBranch && this.selectedBranch.id && this.selectedFinancialYear && this.selectedFinancialYear.id) {
      this.administrationApiService.getVoucherNumbering({branch_id: this.selectedBranch.id, financial_year_id: this.selectedFinancialYear.id}).subscribe((result) => {
        this.voucherNumbering = result;
      });
    }
  }

  branchListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectBranch.bind(this),
        undefined,
        this.branchDataStream.bind(this),
        'Branch List',
        this.autoCompleteFields,
        17,
        'name',
      );
    }
  }

  financialYearListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectFinancialYear.bind(this),
        undefined,
        this.financialYearDataStream.bind(this),
        'Financial Year List',
        this.autoCompleteFields,
        17,
        'name',
      );
    }
  }

  branchDataStream(searchParams) {
    return this.administrationApiService.listBranch(searchParams);
  }

  financialYearDataStream(searchParams) {
    return this.administrationApiService.listFinancialYear(searchParams);
  }

  selectBranch(item) {
    if (item) {
      this.selectedBranch = item;
      this.getVoucherNumbering();
    }
  }

  selectFinancialYear(item) {
    if (item) {
      this.selectedFinancialYear = item;
      this.getVoucherNumbering();
    }
  }
}





