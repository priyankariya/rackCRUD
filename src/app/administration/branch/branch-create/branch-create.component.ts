import { Component, HostListener, ViewChild } from '@angular/core';


import { BranchFormComponent } from '../branch-form/branch-form.component';
import { AdministrationApiService } from '../../../shared/services/api/administration-api.service';
import { CoreService } from '../../../core/core.service';
import { MessageBoxService } from '../../../shared/components/message-box/message-box.service';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-branch-create',
  templateUrl: 'branch-create.component.html',
  styleUrls: ['branch-create.component.scss']
})
export class BranchCreateComponent {

  @ViewChild('branchForm')branchForm: BranchFormComponent;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveBranch.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private coreService: CoreService,
    private administrationApiService: AdministrationApiService,
    private messageBoxService: MessageBoxService
  ) {}

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
    this.administrationApiService.createBranch(branch).subscribe((resultBranch) => {
      if (resultBranch) {
        this.branchForm.reset();
        this.coreService.statusHandler.emit('Branch saved successfully...');
      }
    });
  }
}
