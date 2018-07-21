import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { CoreApiService } from '../../shared/services/api/core-api.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent {

  @ViewChild('autoComplete') autoComplete;

  autoCompleteFields = [
    {caption: 'Username', dataField: 'username', width: 100}
  ];

  userDataStreamCallback = this.userDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addUser.bind(this), this.editUser.bind(this), this.deleteUser.bind(this), this.goBack.bind(this)
    );
  }

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coreApiService: CoreApiService
  ) {}

  goBack() {
    this._location.back();
  }

  onAutoCompleteSelect(item) {
    // statements here...
  }

  userDataStream(searchParams) {
    return this.coreApiService.listUser(searchParams);
  }

  addUser() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then(() => {});
  }

  editUser() {
    this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
  }

  deleteUser() {
    // statements here
  }
}
