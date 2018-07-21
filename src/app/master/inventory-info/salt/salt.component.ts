import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-salt',
  templateUrl: 'salt.component.html',
  styleUrls: ['salt.component.scss']
})
export class SaltComponent {

  autoCompleteFields = [{caption: 'List Of Salts', dataField: 'name', width: 100}];
  saltDataStreamCallback = this.saltDataStream.bind(this);

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
      e, this.addSalt.bind(this), this.editSalt.bind(this), this.deleteSalt.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addSalt() {
    if (this.userPermissions([25])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editSalt() {
    if (this.userPermissions([27])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteSalt() {
    if (this.userPermissions([28])) {
      this.reloadList = false;
      this.masterApiService.deleteSalt(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([26])) {}
    // statements here...
  }

  saltDataStream(searchParams) {
    return this.masterApiService.listSalt(searchParams);
  }
}
