import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-tax',
  templateUrl: 'tax.component.html',
  styleUrls: ['tax.component.scss']
})
export class TaxComponent {

  autoCompleteFields = [{caption: 'List Of Taxes', dataField: 'name', width: 100}];
  taxDataStreamCallback = this.taxDataStream.bind(this);

  @ViewChild('autoComplete') autoComplete;
  reloadList = false;

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService,
    private coreService: CoreService
  ) { }

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addTax.bind(this), this.editTax.bind(this), this.deleteTax.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addTax() {
    if (this.userPermissions([33])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editTax() {
    if (this.userPermissions([35])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteTax() {
    if (this.userPermissions([36])) {
      this.reloadList = false;
      this.masterApiService.deleteTax(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([34])) {}
    // statements here...
  }

  taxDataStream(searchParams) {
    return this.masterApiService.listTax(searchParams);
  }
}
