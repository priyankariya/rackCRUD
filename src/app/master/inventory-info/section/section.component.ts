import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class SectionComponent {

  autoCompleteFields = [{caption: 'List Of Sections', dataField: 'name', width: 100}];
  sectionDataStreamCallback = this.sectionDataStream.bind(this);

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
      e, this.addSection.bind(this), this.editSection.bind(this), this.deleteSection.bind(this), this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  userPermissions(value) {
    return this.coreService.userPermitted(value);
  }

  addSection() {
    if (this.userPermissions([17])) {
      this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  editSection() {
    if (this.userPermissions([19])) {
      this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
    }
  }

  deleteSection() {
    if (this.userPermissions([20])) {
      this.reloadList = false;
      this.masterApiService.deleteSection(this.autoComplete.focusedElement.id).subscribe(() => {
        this.reloadList = true;
      });
    }
  }

  onAutoCompleteSelect(item) {
    if (this.userPermissions([18])) {}
    // statements here...
  }

  sectionDataStream(searchParams) {
    return this.masterApiService.listSection(searchParams);
  }
}
