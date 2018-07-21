import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-therapy',
  templateUrl: 'therapy.component.html',
  styleUrls: ['therapy.component.scss']
})
export class TherapyComponent {

  autoCompleteFields = [{caption: 'List Of Therapies', dataField: 'name', width: 100}];
  therapyDataStreamCallback = this.therapyDataStream.bind(this);

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
      e, this.addTherapy.bind(this), this.editTherapy.bind(this), this.deleteTherapy.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addTherapy() {
    if (this.userPermissions([29])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editTherapy() {
    if (this.userPermissions([31])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteTherapy() {
    if (this.userPermissions([32])) {
      this.reloadList = false;
      this.masterApiService.deleteTherapy(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([30])) {}
    // statements here...
  }

  therapyDataStream(searchParams) {
    return this.masterApiService.listTherapy(searchParams);
  }
}
