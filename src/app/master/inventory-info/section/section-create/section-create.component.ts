import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { SectionFormComponent } from '../section-form/section-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-section-create',
  templateUrl: 'section-create.component.html',
  styleUrls: ['section-create.component.scss']
})
export class SectionCreateComponent {

  @ViewChild('sectionForm') sectionForm: SectionFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveSection.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveSection() {
    this.sectionForm.submit();
  }

  onSubmitSection(section) {
    this.masterApiService.createSection(section).subscribe(() => {
      this.sectionForm.reset();
      this.coreService.statusHandler.emit('Section saved successfully...');
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
