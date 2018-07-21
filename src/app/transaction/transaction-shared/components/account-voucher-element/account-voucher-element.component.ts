import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';


import { UtilityService } from '../../../../shared/services/utility.service';
import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { BwdAdjustmentComponent } from '../bwd-adjustment/bwd-adjustment.component';
import { CoreService } from '../../../../core/core.service';
import { TransactionApiService } from '../../../../shared/services/api/transaction-api.service';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';

@Component({
  selector: 'app-account-voucher-element',
  templateUrl: 'account-voucher-element.component.html',
  styleUrls: ['account-voucher-element.component.scss']
})
export class AccountVoucherElementComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChildren('transactionList') transactionList: QueryList<ElementRef>;
  @Input()voucherModel: any;
  @Input() voucherData: any;
  @Output() voucherSubmit: EventEmitter<any> = new EventEmitter<any>();
  autoCompleteFields = [{caption: 'Name', dataField: 'name', width: 100}];
  selectedLedger;
  selectedAlternateLedger;
  debitFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  creditFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  ledgerFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  narrationFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  amountFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  alternateLedgerFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  referenceFieldFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  dateFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  voucherForm: FormGroup;
  transactions: { id: number; ledger: any; credit: number; debit: number; amount: number;  bwd: any[]}[] = [];

  constructor(
    private transactionApiService: TransactionApiService,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private coreService: CoreService,
    private masterApiService: MasterApiService
  ) {}

  clear(field) {
    this.voucherForm.patchValue({
      [field]: null
    }, {emitEvent: false});
  }

  ngOnInit() {
    this.buildForm();
    this.voucherForm.get('debit').valueChanges.subscribe(() => {
      if (!this.selectedLedger) {
        this.clear('debit');
        this.ledgerFocusHandler.emit(true);
      } else if (this.voucherForm.get('credit').value > 0) {
        this.clear('credit');
      }
    });

    this.voucherForm.get('credit').valueChanges.subscribe((value) => {
      if (value && value > 0) {
        if (!this.selectedLedger) {
          this.clear('credit');
          this.ledgerFocusHandler.emit(true);
        } else if (this.voucherForm.get('debit').value > 0) {
          this.clear('debit');
        }
      }
    });
    if (this.getConfiguration('sem').value) {
      this.voucherForm.get('amount').valueChanges.subscribe((value) => {
        if (value && value > 0) {
          if (!this.selectedLedger) {
            this.clear('amount');
            this.ledgerFocusHandler.emit(true);
          } else if (!this.selectedAlternateLedger) {
            this.alternateLedgerFocusHandler.emit(true);
          }
        }
      });
    }
  }

  ngOnChanges() {
    if (!!this.voucherData && this.voucherData) {
      this.transactions = this.voucherData.acTrans;
      this.buildForm();
    }
  }

  ngAfterViewInit() {
    this.dateFocusHandler.emit(true);
    this.skipFields();
  }

  skipFields() {
    if (this.getConfiguration('sdt').value) {
      if (this.getConfiguration('srf').value) {
        if (this.getConfiguration('sem').value) {
          this.alternateLedgerFocusHandler.emit(true);
        } else {
          this.ledgerFocusHandler.emit(true);
        }
      }
      this.referenceFieldFocusHandler.emit(true);
    } else {
      this.dateFocusHandler.emit(true);
    }
  }

  buildForm() {
    this.voucherForm = this.fb.group({
      id: new FormControl((this.voucherData) ? this.voucherData.id : null),
      transDate: new FormControl(
        (this.voucherData) ?  UtilityService.convertDateToFront(this.voucherData.transDate) : UtilityService.convertDateToFront()),
      valueDate: new FormControl((this.voucherData) ? UtilityService.convertDateToFront(this.voucherData.valueDate ) : null),
      refNo: new FormControl((this.voucherData) ? this.voucherData.refNo : null),
      narration: new FormControl((this.voucherData) ? this.voucherData.narration : null),
      debit: [null],
      credit: [null],
      amount: [null]
    });
    if (this.getConfiguration('edt').value) {
      this.voucherForm.get('valueDate').patchValue(UtilityService.convertDateToFront());
    }
  }

  ledgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectLedger.bind(this),
        undefined,
        this.ledgerDataStream.bind(this),
        'Ledgers',
        this.autoCompleteFields,
        17,
        'name'
      );
    } else if (e.keyCode === 32) {
      e.preventDefault();
      if (this.transactionList && this.transactionList.first.nativeElement) {
        this.transactionList.first.nativeElement.focus();
      }
    }
  }

  transactionListOnKeyDown(e, ledger) {
    e.preventDefault();
    if (e.keyCode === 32) {
      this.ledgerFocusHandler.emit(true);
    } else if (e.keyCode === 13) {
      this.findDuplicateTransaction(ledger);
    }
  }

  alternateLedgerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectAlternateLedger.bind(this),
        undefined,
        this.alternateLedgerDataStream.bind(this),
        'Alternate Ledgers',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  selectAlternateLedger(item) {
    this.masterApiService.getLedgerCash(item.id).subscribe((result) => {
      this.selectedAlternateLedger = item;
      this.selectedAlternateLedger['balance'] = result.value;
      this.ledgerFocusHandler.emit(true);
    });
  }

  alternateLedgerDataStream(searchParams) {
    searchParams['voucher_type'] = 4;
    return this.masterApiService.listVoucherLedger(searchParams);
  }

  ledgerDataStream(searchParams) {
    searchParams['voucher_type'] = this.voucherModel.voucherTypeId;
    return this.masterApiService.listVoucherLedger(searchParams);
  }

  getConfiguration(name) {
    for (const i of this.voucherModel.configuration) {
      if (i.name === name) {
        return i;
      }
    }
    return {value: false};
  }

  selectLedger(item) {
    this.masterApiService.getLedgerCash(item.id).subscribe((result) => {
      this.selectedLedger = item;
      this.selectedLedger['balance'] = result.value;
      this.focusDebit();
      if (this.getConfiguration('sem').value) {
        this.focusAmount();
      } else {
        if (this.selectedLedger.position === 1) {
          this.focusDebit();
        } else if (this.selectedLedger.position === 2) {
          this.focusCredit();
        } else if (this.selectedLedger.position === 0 && !this.voucherForm.get('debit').value) {
          if (this.summary().debit > this.summary().credit) {
            this.focusCredit();
          }
        }
      }
      this.findDuplicateTransaction(item);
    });
  }

  findDuplicateTransaction(item) {
    for (const i of this.transactions) {
      if (i.ledger.id === item.id) {
        this.selectedLedger = i.ledger;
        this.voucherForm.patchValue({
          id: i.id,
          debit: i.debit,
          credit: i.credit,
          amount: i.amount,
          bwd: i.bwd
        });
        setTimeout(() => {
          this.ledgerFocusHandler.emit(true);
        });
      }
    }
  }

  formattedLedger() {
    if (this.selectedLedger) {
      let value = this.selectedLedger.name;
      if (this.getConfiguration('slb').value) {
        value += '      ' +  this.selectedLedger.balance;
        if (this.selectedLedger.balance < 0) {
          value += ' Cr';
        } else {
          value += ' Dr';
        }
      }
      return value;
    }
  }

  formattedAlternateLedger() {
    if (this.selectedAlternateLedger) {
      let value = this.selectedAlternateLedger.name;
      if (this.getConfiguration('slb').value) {
        value += '      ' +  this.selectedAlternateLedger.balance;
        if (this.selectedAlternateLedger.balance < 0) {
          value += ' Cr';
        } else {
          value += ' Dr';
        }
      }
      return value;
    }
  }

  focusDebit() {
    setTimeout(() => {
      this.debitFocusHandler.emit(true);
    }, 200);
  }

  focusCredit() {
    setTimeout(() => {
      this.creditFocusHandler.emit(true);
    }, 200);
  }

  focusAmount() {
    setTimeout(() => {
      this.amountFocusHandler.emit(true);
    }, 200);
  }

  saveTransaction() {
    const debit = this.voucherForm.get('debit').value;
    const credit = this.voucherForm.get('credit').value;
    const amount = this.voucherForm.get('amount').value;
    const data = this.voucherForm.value;
    data['ledger'] = this.selectedLedger;
    if (this.getConfiguration('sem') && amount) {
      if (this.voucherModel.voucherTypeId === 2) {
       data['debit'] = amount;
      } else if (this.voucherModel.voucherTypeId === 3) {
        data['credit'] = amount;
      }
    }
    if ((this.selectedLedger) && ((debit || credit || amount))) {
      if (this.selectedLedger.bwd) {
        this.showAccountAdjustment(data);
      } else {
          this.addOrReplaceDuplicateTransaction(data);
        }
    } else if (!this.selectedLedger && !debit && !credit && !amount) {
      if (this.getConfiguration('sem').value) {
        if ((this.transactions.length > 0) && (this.summary().amount > 0)) {
          if (this.getConfiguration('nar').value) {
            this.narrationFocusHandler.emit(true);
          } else {
            this.submit();
          }
        }
      } else {
        if ((this.transactions.length >= 2) && (this.summary().debit === this.summary().credit)) {
          if (this.getConfiguration('nar').value) {
            this.narrationFocusHandler.emit(true);
          } else {
            this.submit();
          }
        }
      }
    }
  }

  showAccountAdjustment(transaction) {
    if (!this.coreService.dialogMode) {
      const dialogRef = this.dialog.open(BwdAdjustmentComponent, {
        width: '800px',
        height: '550px',
        disableClose: true
      });
      const sub = dialogRef.componentInstance.transactionAdjusted.subscribe((data) => {
        dialogRef.close();
        this.coreService.dialogMode = false;
        if (data) {
          this.addOrReplaceDuplicateTransaction(data);
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
        this.ledgerFocusHandler.emit(true);
      });
      this.coreService.dialogMode = true;
      dialogRef.componentInstance.accountTransaction = transaction;
    }
  }

  addOrReplaceDuplicateTransaction(data) {
    let exists = false;
    for (const i of this.transactions) {
      if (i.ledger.id === data.ledger.id) {
        this.transactions[this.transactions.indexOf(i)] = data;
        exists = true;
      }
    }
    if (!exists) {
      this.transactions.push(data);
    }
    this.voucherForm.patchValue({
      id: null,
      debit: null,
      credit: null,
      amount: null
    });
    this.selectedLedger = null;
    this.ledgerFocusHandler.emit(true);
  }


  summary() {
    let debit = 0;
    let credit = 0;
    let amount = 0;
    for (const i of this.transactions) {
      debit += i.debit || 0;
      credit += i.credit || 0;
      amount += i.amount || 0;
    }
    return { debit: debit, credit: credit, amount: amount };
  }

  submit() {
    const acc = [];
    for (const i of this.transactions) {
      const bwd = [];
      for (const j of i.bwd || []) {
        bwd.push({
          id: j.id,
          adjId: j.adjId,
          refNo: j.refNo,
          amount: j.amount
        });
      }
      acc.push({
        credit: i.credit || 0,
        debit: i.debit || 0,
        bwd: bwd,
        ledgerId: i.ledger.id,
      });
    }
    const obj = {
      id: this.voucherForm.get('id').value,
      narration: this.voucherForm.get('narration').value,
      branchId: this.coreService.getProperty('branch').id,
      transDate: UtilityService.convertDateToBack(this.voucherForm.get('transDate').value),
      acTrans: acc
    };
    if (this.getConfiguration('sem').value && this.selectedAlternateLedger) {
      if (this.voucherModel.voucherTypeId === 2 ) {
        acc.push({
          ledgerId: this.selectedAlternateLedger.id,
          credit: this.summary().amount,
          debit: 0,
          bwd: [],
        });
      }
      if (this.voucherModel.voucherTypeId === 3) {
        acc.push({
          ledgerId: this.selectedAlternateLedger.id,
          debit: this.summary().amount,
          credit: 0,
          bwd: [],
        });
      }
    }
    this.voucherSubmit.emit(obj);
  }

  reset() {
    this.voucherForm.reset();
    this.selectedAlternateLedger = null;
    this.transactions = [];
    this.dateFocusHandler.emit(true);
    this.skipFields();
  }
}
