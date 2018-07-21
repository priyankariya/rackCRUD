import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { CoreApiService } from '../../../shared/services/api/core-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { AutoCompleteDialogService } from '../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';


@Component({
  selector: 'app-branch-form',
  templateUrl: 'branch-form.component.html',
  styleUrls: ['branch-form.component.scss']
})
export class BranchFormComponent implements OnChanges, OnInit {

  @Input() branch: any;
  @Output() submitBranch: EventEmitter<any> = new EventEmitter<any>();

  nameFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  clientAutoCompleteFields =  [{caption: 'Clients', dataField: 'name', width: 100}];
  userAutoCompleteFields = [{caption: 'Username', dataField: 'username', width: 100}];
  assignedUsers: any[] = [];
  assignedClients: any[] = [];
  dialogMode = false;
  branchForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private dialog: MatDialog,
    private coreApiService: CoreApiService,
    private autoCompleteDialogService: AutoCompleteDialogService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.branch && this.branch) {
      this.buildForm();
      this.assignedUsers = this.branch.users;
      this.assignedClients = this.branch.clients;
    }
  }

  buildForm() {
    this.branchForm = this.fb.group({
      id: new FormControl((this.branch) ? this.branch.id : null),
      name: new FormControl((this.branch) ? this.branch.name : null,
        [Validators.required, Validators.pattern(UtilityService.alphaNumericRegex)]),
      branchType: new FormControl((this.branch) ? this.branch.branchType : null,
        [Validators.required, Validators.pattern('[0-9]+')]),
      displayName: new FormControl((this.branch) ? this.branch.displayName : null),
      address: new FormControl((this.branch) ? this.branch.address : null),
      mobile: new FormControl((this.branch) ? this.branch.mobile : null),
      phone: new FormControl((this.branch) ? this.branch.phone : null),
      email: new FormControl((this.branch) ? this.branch.email : null),
      dlNo: new FormControl((this.branch) ? this.branch.dlNo : null),
    });
  }

  submit() {
    if (this.branchForm.valid) {
      const data = this.branchForm.value;
      data['users'] = [];
      for (const i of this.assignedUsers) {
        data['users'].push(i.id);
      }
      data['clients'] = [];
      for (const i of this.assignedClients) {
        data['clients'].push(i.id);
      }
      this.submitBranch.emit(data);
    }
  }

  reset() {
    this.branchForm.reset();
    this.assignedUsers = [];
    this.assignedClients = [];
    setTimeout(() => {
      this.nameFocusHandler.emit(true);
    });
  }

  userDataStream(searchParams) {
    return this.coreApiService.listUser(searchParams);
  }

  clientDataStream(searchParams) {
    return this.coreApiService.listClient(searchParams);
  }

  userListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        undefined,
        this.assignUser.bind(this),
        this.userDataStream.bind(this),
        'User List',
        this.userAutoCompleteFields,
        17,
        'username',
        {uniqueKey: 'id', markedElements: this.assignedUsers || []}
      );
    }
  }

  assignUser(item) {
    if (item) {
      this.assignedUsers = item;
    }
  }

  clientListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        undefined,
        this.assignClient.bind(this),
        this.clientDataStream.bind(this),
        'User List',
        this.clientAutoCompleteFields,
        17,
        'name',
        {uniqueKey: 'id', markedElements: this.assignedClients || []}
      );
    }
  }

  assignClient(item) {
    if (item) {
      this.assignedClients = item;
    }
  }
}
