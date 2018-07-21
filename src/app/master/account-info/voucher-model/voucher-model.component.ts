import { Component, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { UtilityService } from '../../../shared/services/utility.service';
import { Location } from '@angular/common';
import { MasterApiService } from '../../../shared/services/api/master-api.service';

@Component({
  selector: 'app-voucher-model',
  templateUrl: 'voucher-model.component.html',
  styleUrls: ['voucher-model.component.scss']
})
export class VoucherModelComponent {

  constructor(
    private router: Router,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private masterApiService: MasterApiService
  ) {}

  autoCompleteFields = [{caption: 'List Of Voucher Models', dataField: 'name', width: 100}];
  voucherModelDataStreamCallBack = this.voucherModelDataStream.bind(this);
  reloadList = false;

  @ViewChild('autoComplete') autoComplete;
  @HostListener('document: keydown', ['$event'])onKeyDown(e) {
    UtilityService.keyDown(
      e, this.addVoucherModel.bind(this), this.editVoucherModel.bind(this), this.deleteVoucherModel.bind(this), this.goBack.bind(this), undefined, this.goBack.bind(this)
    );
  }

  goBack() {
    this._location.back();
  }

  onAutoCompleteSelect(item) {
    //comments here
  }

  addVoucherModel() {
    this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
  }

  editVoucherModel() {
    this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], {relativeTo: this.activatedRoute}).then(() => {});
  }

  deleteVoucherModel() {
    this.reloadList = false;
    this.masterApiService.deleteVoucherModel(this.autoComplete.focusedElement.id).subscribe(() => {
      this.reloadList = true;
    });
  }

  voucherModelDataStream(searchParams) {
    return this.masterApiService.listVoucherModel(searchParams);
  }
}
