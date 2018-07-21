import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { UtilityService } from '../../shared/services/utility.service';
import { AdministrationApiService } from '../../shared/services/api/administration-api.service';



@Component({
  selector: 'app-financial-year',
  templateUrl: 'financial-year.component.html',
  styleUrls: ['financial-year.component.scss']
})
export class FinancialYearComponent {

  autoCompleteFields = [{caption: 'List Of Financial Years', dataField: 'name', width: 100}];
  financialYearDataStreamCallback = this.financialYearDataStream.bind(this);

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private administrationApiService: AdministrationApiService
  ) {
  }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addFinancialYear.bind(this), this.editFinancialYear.bind(this), this.deleteFinancialYear.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  addFinancialYear() {
    this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {
    });
  }

  editFinancialYear() {
    this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], {relativeTo: this.activatedRoute}).then(() => {
    });
  }

  deleteFinancialYear() {
    this.reloadList = false;
    this.administrationApiService.deleteFinancialYear(this.autoComplete.focusedElement.id).subscribe(() => {
      this.reloadList = true;
    });
  }

  onAutoCompleteSelect(item) {
    // statements here...
  }

  financialYearDataStream(searchParams) {
    return this.administrationApiService.listFinancialYear(searchParams);
  }
}
