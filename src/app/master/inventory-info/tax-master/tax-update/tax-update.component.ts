import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { TaxFormComponent } from '../tax-form/tax-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-tax-update',
  templateUrl: 'tax-update.component.html',
  styleUrls: ['tax-update.component.scss']
})
export class TaxUpdateComponent implements OnInit {

  tax;

  @ViewChild('taxForm') taxForm: TaxFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveTax.bind(this), this.goBack.bind(this)
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
      this.masterApiService.getTax(params['id']).subscribe((result) => {
        this.tax = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

  saveTax() {
    this.taxForm.submit();
  }

  onSubmitTax(tax) {
    this.masterApiService.updateTax(tax).subscribe(() => {
      this.taxForm.reset();
      this._location.back();
    });
  }
}
