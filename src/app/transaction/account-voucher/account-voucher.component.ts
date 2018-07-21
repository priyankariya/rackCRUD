import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { UtilityService } from '../../shared/services/utility.service';
import { CoreApiService } from '../../shared/services/api/core-api.service';
import { AutoCompleteDialogService } from '../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { MasterApiService } from '../../shared/services/api/master-api.service';
import { VoucherModelService } from '../transaction-shared/service/voucher-model.service';

@Component({
  selector: 'app-account-voucher',
  templateUrl: 'account-voucher.component.html',
  styleUrls: ['account-voucher.component.scss']
})
export class AccountVoucherComponent implements OnInit, AfterViewInit {

  voucherTypes;
  selectedVoucherType;
  selectedVoucherModel;
  autoCompleteFields =  [{caption: 'List Of Voucher Models', dataField: 'name', width: 100}];
  dialogMode = false;

  constructor(
    private _location: Location,
    private coreApiService: CoreApiService,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private masterApiService: MasterApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private voucherModelService: VoucherModelService
  ) {}

  @ViewChildren('voucherTypeItems')voucherTypeItems: QueryList<ElementRef>;
  @HostListener('document: keydown', ['$event'])OnKeyDown(e) {
    if (!this.dialogMode) {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this)
      );
    }
  }

  ngOnInit() {
    this.listVoucherTypes();
  }

  ngAfterViewInit() {
    this.voucherTypeItems.changes.subscribe(() => {
      if (this.voucherTypeItems) {
        this.voucherTypeItems.first.nativeElement.focus();
      }
    });
  }

  goBack() {
    this._location.back();
  }

  listVoucherTypes() {
    this.coreApiService.listVoucherType().subscribe((result) => {
      this.voucherTypes = result;
    });
  }

  voucherTypeListOnKeyDown(voucherType) {
    this.selectedVoucherType = voucherType;
    this.autoCompleteDialogService.openDialog(
      { height: '600px', width: '500px', disableClose: true },
      this.selectVoucherModel.bind(this),
      undefined,
      this.voucherModelDataStream.bind(this),
      'Voucher Model List',
      this.autoCompleteFields,
      17,
      'name'
    );
    this.dialogMode = true;
  }

  selectVoucherModel(item) {
    this.selectedVoucherModel = item;
    this.dialogMode = false;
    if (item) {
      this.voucherModelService.voucherModel = item;
      this.router.navigate([item.voucherTypeId], {relativeTo: this.activatedRoute}).then(() => {});
    }
  }

  voucherModelDataStream(searchParams) {
    searchParams['voucher_type'] = this.selectedVoucherType.id;
    return this.masterApiService.listVoucherModel(searchParams);
  }
}
