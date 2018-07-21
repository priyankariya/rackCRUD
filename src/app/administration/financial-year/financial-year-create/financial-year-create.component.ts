import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { FinancialYearFormComponent } from '../financial-year-form/financial-year-form.component';
import { AdministrationApiService } from '../../../shared/services/api/administration-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';

@Component({
  selector: 'app-financial-year-create',
  templateUrl: 'financial-year-create.component.html',
  styleUrls: ['financial-year-create.component.scss']
})
export class FinancialYearCreateComponent {

  @ViewChild('financialYearForm') financialYearForm: FinancialYearFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveFinancialYear.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private administrationApiService: AdministrationApiService
  ) { }

  saveFinancialYear() {
    this.financialYearForm.submit();
  }

  onSubmitFinancialYear(financialYear) {
    this.administrationApiService.createFinancialYear(financialYear).subscribe(() => {
      this.financialYearForm.reset();
      this.coreService.statusHandler.emit('Financial Year saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
