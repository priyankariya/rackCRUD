import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';


@Component({
  selector: 'app-ledger',
  templateUrl: 'ledger.component.html',
  styleUrls: ['ledger.component.scss']
})
export class LedgerComponent {

  @ViewChild('autoComplete') autoComplete;

  reloadList = false;

  autoCompleteFields = [
    {caption: 'Name', dataField: 'name', width: 100}
  ];

  ledgerDataStreamCallback = this.ledgerDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addLedger.bind(this), this.editLedger.bind(this), this.deleteLedger.bind(this), this.goBack.bind(this)
    );
  }

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService,
    private coreService: CoreService
  ) {}

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  onAutoCompleteSelect(item) {
   if ( this.userPermissions([2])) {}
    // statements here...
  }

  ledgerDataStream(searchParams) {
    return this.masterApiService.listLedger(searchParams);
  }

  addLedger() {
    if (this.userPermissions([1])) {
      this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editLedger() {
    if (this.userPermissions([3])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteLedger() {
    if (this.userPermissions([4])) {
      this.reloadList = false;
      this.masterApiService.deleteLedger(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }
}
