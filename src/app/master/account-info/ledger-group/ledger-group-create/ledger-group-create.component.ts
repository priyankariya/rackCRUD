import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { LedgerGroupFormComponent } from '../ledger-group-form/ledger-group-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-ledger-group-create',
  templateUrl: 'ledger-group-create.component.html',
  styleUrls: ['ledger-group-create.component.scss']
})
export class LedgerGroupCreateComponent {

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
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveLedgerGroup() {
    this.ledgerGroupForm.submit();
  }

  onSubmitLedgerGroup(ledgerGroup) {
    this.masterApiService.createLedgerGroup(ledgerGroup).subscribe(() => {
      this.ledgerGroupForm.reset();
      this.coreService.statusHandler.emit('Ledger group saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
