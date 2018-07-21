import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-unit',
  templateUrl: 'unit.component.html',
  styleUrls: ['unit.component.scss']
})
export class UnitComponent {

  autoCompleteFields = [{caption: 'List Of Units', dataField: 'name', width: 100}];
  unitDataStreamCallback = this.unitDataStream.bind(this);

  @ViewChild('autoComplete') autoComplete;
  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService,
    private coreService: CoreService
  ) { }

  reloadList = false;

  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addUnit.bind(this), this.editUnit.bind(this), this.deleteUnit.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addUnit() {
    if (this.userPermissions([25])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editUnit() {
    if (this.userPermissions([27])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteUnit() {
    if (this.userPermissions([28])) {
      this.reloadList = false;
      this.masterApiService.deleteUnit(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([26])) {}
    // statements here...
  }

  unitDataStream(searchParams) {
    return this.masterApiService.listUnit(searchParams);
  }
}
