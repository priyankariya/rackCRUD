import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: 'manufacturer.component.html',
  styleUrls: ['manufacturer.component.scss']
})
export class ManufacturerComponent {

  autoCompleteFields = [{caption: 'List Of Manufacturers', dataField: 'name', width: 100}];
  manufacturerDataStreamCallback = this.manufacturerDataStream.bind(this);

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
      e, this.addManufacturer.bind(this), this.editManufacturer.bind(this), this.deleteManufacturer.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addManufacturer() {
    if (this.userPermissions([21])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editManufacturer() {
    if (this.userPermissions([23])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteManufacturer() {
    if (this.userPermissions([24])) {
      this.reloadList = false;
      this.masterApiService.deleteManufacturer(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([22])) {}
    // statements here...
  }

  manufacturerDataStream(searchParams) {
    return this.masterApiService.listManufacturer(searchParams);
  }
}
