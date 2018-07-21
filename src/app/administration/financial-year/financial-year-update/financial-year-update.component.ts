import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { FinancialYearFormComponent } from '../financial-year-form/financial-year-form.component';
import { AdministrationApiService } from '../../../shared/services/api/administration-api.service';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../core/core.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-financial-year-update',
  templateUrl: 'financial-year-update.component.html',
  styleUrls: ['financial-year-update.component.scss']
})
export class FinancialYearUpdateComponent implements OnInit {

  financialYear;

  @ViewChild('financialYearForm') financialYearForm: FinancialYearFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      // e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveFinancialYear.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private administrationApiService: AdministrationApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.administrationApiService.getFinancialYear(params['id']).subscribe((result) => {
        this.financialYear = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveFinancialYear() {
    this.financialYearForm.submit();
  }

  onSubmitFinancialYear(financialYear) {
    this.administrationApiService.updateFinancialYear(financialYear).subscribe(() => {
      this.financialYearForm.reset();
      this._location.back();
    });
  }
}
