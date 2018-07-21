import { Component, HostListener, ViewChild } from '@angular/core';


import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { LedgerFormComponent } from '../ledger-form/ledger-form.component';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CoreService } from '../../../../core/core.service';


@Component({
  selector: 'app-ledger-create',
  templateUrl: 'ledger-create.component.html',
  styleUrls: ['ledger-create.component.scss']
})
export class LedgerCreateComponent {

  @ViewChild('ledgerForm')ledgerForm: LedgerFormComponent;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveLedger.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) {}

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
    this.masterApiService.createLedger(ledger).subscribe(() => {
      this.ledgerForm.reset();
      this.coreService.statusHandler.emit('Ledger saved Successfully...');
    });
  }
}
