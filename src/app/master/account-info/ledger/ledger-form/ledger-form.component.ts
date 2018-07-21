import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';

@Component({
  selector: 'app-ledger-form',
  templateUrl: 'ledger-form.component.html',
  styleUrls: ['ledger-form.component.scss']
})
export class LedgerFormComponent implements OnInit, OnChanges {

  @Output() submitLedger: EventEmitter<any> = new EventEmitter<any>();
  @Input() ledger: any;
  @ViewChildren('bwdList') bwdList: QueryList<ElementRef>;

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  ledgerForm: FormGroup;
  bwdForm: FormGroup;
  openingBalanceForm: FormGroup;
  selectedLedgerGroup = null;
  nameFocusHandler: EventEmitter<any> = new EventEmitter<any>();
  dateFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  opening = {credit: null, debit: null, bwd: []};
  bwdEnabled: boolean;
  bwdData = [];

  constructor(private fb: FormBuilder,
              private autoCompleteDialogService: AutoCompleteDialogService,
              private masterApiService: MasterApiService) { }

  ngOnInit() {
    this.buildForm();
    this.buildOpeningBalanceForm();
    this.buildBwdForm();
    this.ledgerForm.valueChanges.subscribe((value) => {
     this.bwdEnabled = value.bwd;
    });
  }

  ngOnChanges() {
    this.summary();
    if (!!this.ledger && this.ledger) {
      this.buildForm();
      this.selectedLedgerGroup = this.ledger.group;
      this.opening = this.ledger.opening;
      this.openingBalanceForm.patchValue({
        amount: (this.opening) ? this.opening.credit || this.opening.debit : null,
        position: (this.opening.credit) ? 'Cr' : 'Dr'
      });
      if (this.opening.bwd.length > 0) {
        this.bwdEnabled = true;
        for (const i of this.opening.bwd) {
          this.bwdData.push({
            id: i.id,
            date: i.date,
            refNo: i.refNo,
            amount: (i.amount < 0) ? i.amount * (-1) : i.amount,
            position: (i.amount < 0) ? 'Cr' : 'Dr'
          });
        }
      }
    }
  }

  buildForm() {
    this.ledgerForm = this.fb.group({
      id: new FormControl((this.ledger) ? this.ledger.id : null),
      name: new FormControl((this.ledger) ? this.ledger.name : null, [Validators.required]),
      aliasName: new FormControl((this.ledger) ? this.ledger.aliasName : null),
      printName: new FormControl((this.ledger) ? this.ledger.printName : null),
      bwd: new FormControl((this.ledger) ? this.ledger.bwd : false),
      description: new FormControl((this.ledger) ? this.ledger.description : null),
      address1: new FormControl((this.ledger) ? this.ledger.address1 : null),
      address2: new FormControl((this.ledger) ? this.ledger.address2 : null),
      address3: new FormControl((this.ledger) ? this.ledger.address3 : null),
      country: new FormControl((this.ledger) ? this.ledger.country : null),
      stateId: new FormControl((this.ledger) ? this.ledger.stateId : null),
      pinCode: new FormControl((this.ledger) ? this.ledger.pinCode : null),
      contactPerson: new FormControl((this.ledger) ? this.ledger.contactPerson : null),
      phone: new FormControl((this.ledger) ? this.ledger.phone : null),
      mobile: new FormControl((this.ledger) ? this.ledger.mobile : null),
      fax: new FormControl((this.ledger) ? this.ledger.fax : null),
      email: new FormControl((this.ledger) ? this.ledger.email : null),
      website: new FormControl((this.ledger) ? this.ledger.website : null),
      gst: new FormControl((this.ledger) ? this.ledger.gst : null),
      pan: new FormControl((this.ledger) ? this.ledger.pan : null)
    });
  }

  buildOpeningBalanceForm() {
    this.openingBalanceForm = this.fb.group({
      amount: new FormControl( null, [Validators.required]),
      position: new FormControl( null, [Validators.required])
    });
  }

  addOpeningBalance() {
    const position = this.openingBalanceForm.get('position').value;
      const data = this.openingBalanceForm.value;
      if (this.openingBalanceForm.valid) {
        if (position === 'Cr') {
          this.opening = {
            credit: data.amount,
            debit: 0,
            bwd: []
          };
        } else if (position === 'Dr') {
          this.opening = {
            credit: 0,
            debit: data.amount,
            bwd: []
          };
        }
        this.submit();
      }
  }


  buildBwdForm() {
    this.bwdForm = this.fb.group({
      id: new FormControl(null),
      date: new FormControl(null, Validators.required),
      refNo: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required)
    });
  }

  saveBwd() {
    const data = this.bwdForm.value;
    data['updating'] = false;
    const date = this.bwdForm.get('date').value;
    const refNo = this.bwdForm.get('refNo').value;
    const amount = this.bwdForm.get('amount').value;
    const position = this.bwdForm.get('position').value;
    if (this.bwdForm.valid) {
      this.addOrReplaceBwd(data);
    } else if (!date && !refNo && !amount && !position) {
      this.submit();
    }
  }

  addOrReplaceBwd(data) {
    let exists = false;
    for (const i of this.bwdData) {
      if (i.updating) {
        i.id = data.id;
        i.date = data.date;
        i.refNo = data.refNo;
        i.position = data.position;
        i.amount = data.amount;
        exists = true;
      }
    }
    if (!exists) {
      this.bwdData.push(data);
    }
    this.bwdForm.reset();
    this.dateFocusHandler.emit(true);
  }


  summary() {
    let total = 0;
    if (this.bwdEnabled) {
      for (const i of this.bwdData) {
        let amount = i.amount;
        if (i.position === 'Cr') {
          amount = i.amount * (-1);
        }
        total += amount;
      }
      return total;
    }
  }

  submit() {
    if (this.ledgerForm.valid || this.selectedLedgerGroup) {
      const data = this.ledgerForm.value;
      data['groupId'] = this.selectedLedgerGroup.id;
      if (this.bwdEnabled && this.bwdData.length >= 1) {
        const bwd = [];
        for (const i of this.bwdData) {
            bwd.push({
              id: i.id,
              date: UtilityService.convertDateToBack(i.date),
              refNo: i.refNo,
              amount: (i.position === 'Dr') ? i.amount : i.amount * (-1),
            });
        }
        if (this.summary() > 0) {
          this.opening = {
            credit: 0,
            debit: this.summary(),
            bwd: bwd
          };
        } else {
          this.opening = {
            credit: this.summary(),
            debit: 0,
            bwd: bwd
          };
        }
      }
      data['opening'] = this.opening;
      this.submitLedger.emit(data);
    }
  }

  reset() {
    this.ledgerForm.reset();
    this.bwdData = [];
    this.openingBalanceForm.reset();
    this.selectedLedgerGroup = null;
    setTimeout(() => {
      this.nameFocusHandler.emit(true);
    });
  }

  ledgerOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectLedgerGroup.bind(this),
        undefined,
        this.ledgerGroupDataStream.bind(this),
        'Ledger Groups',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  selectCrOrDrOnKeyDown(e) {
    e.preventDefault();
    if (e.keyCode === 67) {
      if (this.bwdEnabled) {
        this.bwdForm.get('position').patchValue('Cr');
      } else {
        this.openingBalanceForm.get('position').patchValue('Cr');
      }
    } else if (e.keyCode === 68) {
      if (this.bwdEnabled) {
        this.bwdForm.get('position').patchValue('Dr');
      } else {
        this.openingBalanceForm.get('position').patchValue('Dr');
      }
    }
  }

  focusOnBwdDataList(e) {
    if (e.keyCode === 32) {
      if (this.bwdList && this.bwdList.first.nativeElement) {
        this.bwdList.first.nativeElement.focus();
      }
    }
  }

  focusOnBwdList(e, item) {
    if (e.keyCode === 32) {
     this.dateFocusHandler.emit(true);
    } else if (e.keyCode === 13) {
      item.updating = true;
      this.bwdForm.patchValue({
        id: item.id,
        date: item.date,
        refNo: item.refNo,
        amount: item.amount,
        position: (item.amount < 0) ? 'Cr' : 'Dr'
      });
      this.dateFocusHandler.emit(true);
    }
  }

  selectLedgerGroup(item) {
    if (item) {
      this.selectedLedgerGroup = item;
    }
  }

  ledgerGroupDataStream(searchParams) {
    return this.masterApiService.listLedgerGroup(searchParams);
  }
}
