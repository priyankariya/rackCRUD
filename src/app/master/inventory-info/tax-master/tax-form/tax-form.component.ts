import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CoreApiService } from '../../../../shared/services/api/core-api.service';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: 'tax-form.component.html',
  styleUrls: ['tax-form.component.scss']
})
export class TaxFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  taxForm: FormGroup;
  taxFocusHandler: EventEmitter<any> = new EventEmitter<any>();
  selectedTaxType;
  selectedCgstLedger;
  selectedSgstLedger;
  selectedIgstLedger;
  selectedCessLedger;
  selectedNOP;
  selectedPurchaseLedger;
  selectedNOS;
  selectedSaleLedger;

  @Output()taxSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() tax: any;

  constructor(
    private fb: FormBuilder,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private coreApiService: CoreApiService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.tax && this.tax) {
      this.buildForm();
      this.selectedCgstLedger = this.tax.taxAllocation.cgst.ledger;
      this.selectedSgstLedger = this.tax.taxAllocation.sgst.ledger;
      this.selectedIgstLedger = this.tax.taxAllocation.igst.ledger;
      this.selectedCessLedger = this.tax.taxAllocation.cess.ledger;
      this.selectedNOP = this.tax.purchaseAllocation.nature;
      this.selectedPurchaseLedger = this.tax.purchaseAllocation.ledger;
      this.selectedNOS = this.tax.saleAllocation.nature;
      this.selectedSaleLedger = this.tax.saleAllocation.ledger;
      this.selectedTaxType = this.tax.taxType;
    }
  }

  buildForm() {
    this.taxForm = this.fb.group({
      id: new FormControl((this.tax) ? this.tax.id : null),
      name: new FormControl((this.tax) ? this.tax.name : null, [Validators.required]),
      aliasName: new FormControl((this.tax) ? this.tax.aliasName : null),
      cgstRatio: new FormControl((this.tax) ? this.tax.taxAllocation.cgst.ratio : null),
      sgstRatio: new FormControl((this.tax) ? this.tax.taxAllocation.sgst.ratio : null),
      igstRatio: new FormControl((this.tax) ? this.tax.taxAllocation.igst.ratio : null),
      cessRatio: new FormControl((this.tax) ? this.tax.taxAllocation.cess.ratio : null)
    });
  }

  submit() {
    if (this.taxForm.valid) {
      const data = this.taxForm.value;
      const taxAllocation = {
        sgst: {ratio: data.sgstRatio, LedgerId: this.selectedSgstLedger.id},
        cgst: {ratio: data.cgstRatio, LedgerId: this.selectedCgstLedger.id},
        igst: {ratio: data.igstRatio, LedgerId: this.selectedIgstLedger.id},
        cess: {ratio: data.cessRatio, LedgerId:  this.selectedCessLedger.id}
      };
      const purchaseAllocation = {
        natureId: this.selectedNOP.id,
        ledgerId: this.selectedPurchaseLedger.id
      };
      const saleAllocation = {
        natureId: this.selectedSaleLedger.id,
        ledgerId: this.selectedSaleLedger.id
      };
      const tax = {
        id:  data.id,
        name: data.name,
        aliasName: data.aliasName,
        taxTypeId: this.selectedTaxType.id,
        taxAllocation: taxAllocation,
        purchaseAllocation: purchaseAllocation,
        saleAllocation: saleAllocation
      };
      this.taxSubmit.emit(tax);
    }
  }

  reset() {
    this.taxForm.reset();
    this.selectedTaxType = null;
    this.selectedCgstLedger = null;
    this.selectedSgstLedger = null;
    this.selectedIgstLedger = null;
    this.selectedCessLedger = null;
    this.selectedNOP = null;
    this.selectedPurchaseLedger = null;
    this.selectedNOS = null;
    this.selectedSaleLedger = null;
    setTimeout(() => {
      this.taxFocusHandler.emit(true);
    });
  }

  taxTypeOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectTaxType.bind(this),
        undefined,
        this.taxTypeDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  cgstLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectCgstLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  sgstLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectSgstLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  igstLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectIgstLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  cessLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectCessLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  natureOfPurchaseOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectNOP.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  purchaseLedgerListOnkeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectPurchaseLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  natureOfSaleOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectNOS.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  saleLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog (
        {height: '600px', width: '500px', disableClose: true},
        this.selectSaleLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Tax Types',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  selectTaxType(item) {
    this.selectedTaxType = item;
  }

  taxTypeDataStream(searchParams) {
    return this.coreApiService.listTaxType(searchParams);
  }

  selectCgstLedger(item) {
    this.selectedCgstLedger = item;
  }

  selectSgstLedger(item) {
    this.selectedSgstLedger = item;
  }

  selectIgstLedger(item) {
    this.selectedIgstLedger = item;
  }

  selectCessLedger(item) {
    this.selectedCessLedger = item;
  }

  selectNOP(item) {
    this.selectedNOP = item;
  }

  selectPurchaseLedger(item) {
    this.selectedPurchaseLedger = item;
  }

  selectNOS(item) {
    this.selectedNOS = item;
  }

  selectSaleLedger(item) {
    this.selectedSaleLedger = item;
  }

  ledgerDataStream(searchParams) {
    return this.masterApiService.listLedger(searchParams);
  }
}
