import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CoreService } from '../../../../core/core.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';

@Component({
  selector: 'app-ledger-update',
  templateUrl: 'ledger-update.component.html',
  styleUrls: ['ledger-update.component.scss']
})
export class LedgerUpdateComponent implements OnInit {

  ledger;

  @ViewChild('ledgerForm')ledgerForm: LedgerFormComponent;

  @HostListener('document: keydown', ['$event'] )onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveLedger.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getLedger(params['id']).subscribe((result) => {
        this.ledger = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveLedger() {
    this.ledgerForm.submit();
  }

  onSubmitLedger(ledger) {
    this.masterApiService.updateLedger(ledger).subscribe(() => {
      this.ledgerForm.reset();
      this._location.back();
    });

  }
}
