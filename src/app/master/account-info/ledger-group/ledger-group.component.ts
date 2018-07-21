import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-ledger-group',
  templateUrl: 'ledger-group.component.html',
  styleUrls: ['ledger-group.component.scss']
})
export class LedgerGroupComponent {

  autoCompleteFields = [{caption: 'List Of Groups', dataField: 'name', width: 100}];
  ledgerGroupDataStreamCallback = this.ledgerGroupDataStream.bind(this);

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService,
    private coreService: CoreService
  ) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addLedgerGroup.bind(this), this.editLedgerGroup.bind(this), this.deleteLedgerGroup.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addLedgerGroup() {
    if (this.userPermissions([5])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editLedgerGroup() {
    if (this.userPermissions([7])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteLedgerGroup() {
    if (this.userPermissions([8])) {
      this.reloadList = false;
      this.masterApiService.deleteLedgerGroup(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([6])) {}
    // statements here...
  }

  ledgerGroupDataStream(searchParams) {
    return this.masterApiService.listLedgerGroup(searchParams);
  }
}
