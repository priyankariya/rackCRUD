import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { RackFormComponent } from '../rack-form/rack-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-rack-update',
  templateUrl: 'rack-update.component.html',
  styleUrls: ['rack-update.component.scss']
})
export class RackUpdateComponent implements OnInit {

  rack;

  @ViewChild('rackForm') rackForm: RackFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveRack.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getRack(params['id']).subscribe((result) => {
        this.rack = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveRack() {
    this.rackForm.submit();
  }

  onSubmitRack(rack) {
    this.masterApiService.updateRack(rack).subscribe(() => {
      this.rackForm.reset();
      this._location.back();
    });
  }
}
