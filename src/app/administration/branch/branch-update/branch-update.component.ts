import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


import { BranchFormComponent } from '../branch-form/branch-form.component';
import { AdministrationApiService } from '../../../shared/services/api/administration-api.service';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';
import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-branch-update',
  templateUrl: 'branch-update.component.html',
  styleUrls: ['branch-update.component.scss']
})
export class BranchUpdateComponent implements OnInit {

  branch;

  @ViewChild('branchForm')branchForm: BranchFormComponent;
  @HostListener('document: keydown', ['$event'] )onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveBranch.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService,
    private activatedRoute: ActivatedRoute,
    private administrationApiService: AdministrationApiService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.administrationApiService.getBranch({id: params['id']}).subscribe((result) => {
        this.branch = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveBranch() {
    this.branchForm.submit();
  }

  onSubmitBranch(branch) {
    this.administrationApiService.updateBranch(branch).subscribe((result) => {
      if (result) {
        this.branchForm.reset();
        this._location.back();
      }
    });

  }
}
