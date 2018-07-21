import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilityService } from '../../../shared/services/utility.service';
import { TransactionApiService } from '../../../shared/services/api/transaction-api.service';
import { VoucherModelService } from '../../transaction-shared/service/voucher-model.service';
import { CoreService } from '../../../core/core.service';


@Component({
  selector: 'app-journal',
  templateUrl: 'journal.component.html',
  styleUrls: ['journal.component.scss']
})
export class JournalComponent implements OnInit {

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;
  voucherModel;

  autoCompleteFields = [
    {caption: 'Voucher No:', dataField: 'name', width: 100}
  ];

  journalDataStreamCallback = this.journalDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    UtilityService.keyDown(
      e, this.addJournal.bind(this), this.editJournal.bind(this), this.deleteJournal.bind(this), this.goBack.bind(this)
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
    if (this.userPermissions([46])) {}
    // statements here...
  }

  journalDataStream(searchParams) {
    return this.transactionApiService.listJournal(searchParams);
  }

  addJournal() {
    if (this.userPermissions([45])) {
      this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editJournal() {
    if (this.userPermissions([47])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteJournal() {
    if (this.userPermissions([48])) {
      this.reloadList = false;
      this.transactionApiService.deleteJournal(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }
}

