import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';


import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CoreApiService } from '../../../../shared/services/api/core-api.service';
import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';

@Component({
  selector: 'app-voucher-model-form',
  templateUrl: 'voucher-model-form.component.html',
  styleUrls: ['voucher-model-form.component.scss']
})
export class VoucherModelFormComponent implements OnInit, OnChanges {

  voucherTypeForm: FormGroup;
  @Output()voucherTypeSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input('voucherModel')voucherModel;
  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  selectedVoucherModel;
  configurations: any[] = [];
  nameFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private coreApiService: CoreApiService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.voucherModel && this.voucherModel) {
      this.buildForm();
      this.selectVoucherModel(this.voucherModel.voucherType);
      this.configurations = this.selectedVoucherModel.configuration;
      for (const i of this.configurations) {
        for (const j of this.voucherModel.configuration) {
          if (i.id === j.id) {
            i.value = j.value;
           }
        }
      }
    }
  }

  buildForm() {
    this.voucherTypeForm = this.fb.group({
      id: new FormControl((this.voucherModel) ? this.voucherModel.id : null),
      name: new FormControl((this.voucherModel) ? this.voucherModel.name : null)
    });
  }

  submit() {
    const configuration = [];
    for (const i of this.configurations) {
      configuration.push({
        id: i.id,
        name: i.name,
        value: i.value
      });
    }
    const voucherModel = {
      id: this.voucherTypeForm.get('id').value,
      name: this.voucherTypeForm.get('name').value,
      voucherTypeId: this.selectedVoucherModel.id,
      configuration: configuration
    };
    this.voucherTypeSubmit.emit(voucherModel);
  }

  reset() {
    this.voucherTypeForm.reset();
    this.selectedVoucherModel = null;
    this.configurations = [];
    setTimeout(() => {
      this.nameFocusHandler.emit(true);
    });
  }

  voucherTypeListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectVoucherModel.bind(this),
        undefined,
        this.voucherTypeDataStream.bind(this),
        'Voucher Type',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  voucherTypeDataStream(searchParams) {
    return this.coreApiService.listVoucherType(searchParams);
  }

  selectVoucherModel(item) {
    if (item) {
      this.selectedVoucherModel = item;
      this.configurations = item.configuration;
      let count = 3;
      for (const i of this.configurations) {
        this.disable(i, i.value);
        i['tabIndex'] = count;
        count += 1;
      }
    }
  }

  disable(item, value) {
    for (const i of this.configurations) {
      if (item.id === i.depends) {
        i['disable'] = !value;
        if (i.disable) {
          i.value = false;
        }
      }
    }
  }
}
