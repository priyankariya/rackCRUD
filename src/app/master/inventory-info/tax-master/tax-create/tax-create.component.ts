import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';
import { TaxFormComponent } from '../tax-form/tax-form.component';

@Component({
  selector: 'app-tax-create',
  templateUrl: 'tax-create.component.html',
  styleUrls: ['tax-create.component.scss']
})
export class TaxCreateComponent {

  @ViewChild('taxForm') taxForm: TaxFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveTax.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveTax() {
    this.taxForm.submit();
  }

  onSubmitTax(tax) {
    this.masterApiService.createTax(tax).subscribe(() => {
      this.taxForm.reset();
      this.coreService.statusHandler.emit('Tax Saved Successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
