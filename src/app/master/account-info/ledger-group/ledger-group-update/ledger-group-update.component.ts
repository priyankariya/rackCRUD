import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { LedgerGroupFormComponent } from '../ledger-group-form/ledger-group-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-ledger-group-update',
  templateUrl: 'ledger-group-update.component.html',
  styleUrls: ['ledger-group-update.component.scss']
})
export class LedgerGroupUpdateComponent implements OnInit {

  ledgerGroup;

  @ViewChild('ledgerGroupForm') ledgerGroupForm: LedgerGroupFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveLedgerGroup.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getLedgerGroup(params['id']).subscribe((result) => {
        this.ledgerGroup = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveLedgerGroup() {
    this.ledgerGroupForm.submit();
  }

  onSubmitLedgerGroup(ledgerGroup) {
    this.masterApiService.updateLedgerGroup(ledgerGroup).subscribe((result) => {
      if (result) {
        this.ledgerGroupForm.reset();
        this._location.back();
      }
    });
  }
}
