import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { AdministrationApiService } from '../../shared/services/api/administration-api.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-branch',
  templateUrl: 'branch.component.html',
  styleUrls: ['branch.component.scss']
})
export class BranchComponent {

  @ViewChild('autoComplete') autoComplete;

  autoCompleteFields = [
    {caption: 'Name', dataField: 'name', width: 100}
  ];

  branchDataStreamCallback = this.branchDataStream.bind(this);

  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    e.preventDefault();
    UtilityService.keyDown(
      e, this.addBranch.bind(this), this.editBranch.bind(this), this.deleteBranch.bind(this), this.goBack.bind(this)
    );
  }

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private administrationApiService: AdministrationApiService
  ) {}

  goBack() {
    this._location.back();
  }

  onAutoCompleteSelect(item) {
    // statements here...
  }

  branchDataStream(searchParams) {
    return this.administrationApiService.listBranch(searchParams);
  }

  addBranch() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute}).then( () => {});
  }

  editBranch() {
    this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
  }

  deleteBranch() {
    // statements here
  }
}
