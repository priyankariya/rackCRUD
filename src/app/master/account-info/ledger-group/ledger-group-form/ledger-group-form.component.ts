import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-ledger-group-form',
  templateUrl: 'ledger-group-form.component.html',
  styleUrls: ['ledger-group-form.component.scss']
})
export class LedgerGroupFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  ledgerGroupForm: FormGroup;
  selectedLedgerGroup = null;
  ledgerFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()ledgerGroupSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() ledgerGroup: any;

  constructor(
    private fb: FormBuilder,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.ledgerGroup && this.ledgerGroup) {
      this.buildForm();
      this.selectedLedgerGroup = this.ledgerGroup.group;
    }
  }

  buildForm() {
    this.ledgerGroupForm = this.fb.group({
      id: new FormControl((this.ledgerGroup) ? this.ledgerGroup.id : null),
      name: new FormControl((this.ledgerGroup) ? this.ledgerGroup.name : null, [Validators.required]),
      aliasName: new FormControl((this.ledgerGroup) ? this.ledgerGroup.aliasName : null),
      printName: new FormControl((this.ledgerGroup) ? this.ledgerGroup.printName : null),
      nature: new FormControl((this.ledgerGroup) ? this.ledgerGroup.nature : null)
    });
  }

  submit() {
    if (this.ledgerGroupForm.valid) {
      const data = this.ledgerGroupForm.value;
      data['groupId'] = this.selectedLedgerGroup.id;
      this.ledgerGroupSubmit.emit(data);
    }
  }

  reset() {
    this.ledgerGroupForm.reset();
    this.selectedLedgerGroup = null;
    setTimeout(() => {
      this.ledgerFocusHandler.emit(true);
    });
  }

  ledgerGroupOnKeyDown(e) {
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

  selectLedgerGroup(item) {
    if (item) {
      this.selectedLedgerGroup = item;
    }
  }

  ledgerGroupDataStream(searchParams) {
    return this.masterApiService.listLedgerGroup(searchParams);
  }
}
