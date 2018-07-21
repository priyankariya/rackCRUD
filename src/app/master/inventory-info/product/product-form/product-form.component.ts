import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { AutoCompleteDialogService } from '../../../../shared/components/auto-complete-dialog/auto-complete-dialog.service';
import { CoreApiService } from '../../../../shared/services/api/core-api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: 'product-form.component.html',
  styleUrls: ['product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];

  productForm: FormGroup;
  openingForm: FormGroup;
  bwdForm: FormGroup;
  productFocusHandler: EventEmitter<any> = new EventEmitter<any>();
  batchNoFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  unitFocusHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  productFormEnabled = true;
  loading = false;
  bwdLoading = false;
  selectedManufacturer;
  selectedSection;
  selectedTherapy;
  selectedRack;
  selectedSalt: any = [];
  selectedSecondaryUnit = [];
  selectedTaxType;
  selectedTax = null;
  selectedDrugSchedules: any = [];
  selectedUnit;
  selectedPrimaryUnit;
  openingInventory;
  bwd = [];

  @Output()submitHandler: EventEmitter<any> = new EventEmitter<any>();
  @Input() product: any;
  @ViewChildren('bwdList') bwdList: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private masterApiService: MasterApiService,
    private autoCompleteDialogService: AutoCompleteDialogService,
    private coreApiService: CoreApiService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.buildOpeningForm();
    this.buildBwdForm();
  }

  ngOnChanges() {
    if (!!this.product && this.product) {
      this.buildForm();
      this.selectedManufacturer = this.product.manufacturer;
      this.selectedSection = this.product.section;
      this.selectedRack = this.product.rack;
      this.selectedDrugSchedules = this.product.drugSchedules || [];
      this.selectedTax = this.product.tax;
      this.selectedTaxType = this.product.tax.taxType;
      this.selectedTherapy = this.product.therapies || [];
      this.selectedSalt = this.product.salts || [];
      this.selectedUnit = (this.product.opening) ? this.product.opening.unit : null;
      this.selectedPrimaryUnit = this.product.unit.primary;
      this.selectedSecondaryUnit = this.product.unit.secondary || [];
      if (this.product.opening) {
        if (this.product.bwd) {
          if (this.product.opening.bwd) {
            for (const i of this.product.opening.bwd) {
              this.bwd.push({
                id: i.id,
                batchNo: i.batchNo,
                expMonth: i.expMonth,
                expYear: i.expYear,
                unit: i.unit,
                qty: i.qty,
                pCost:  i.pCost,
                mrp: i.mrp
              });
            }
          }
        } else {
          this.buildOpeningForm();
        }
      }
    }
  }

  buildForm() {
    this.productForm = this.fb.group({
      id: new FormControl((this.product) ? this.product.id : null),
      name: new FormControl((this.product) ? this.product.name : null, [Validators.required]),
      aliasName: new FormControl((this.product) ? this.product.aliasName : null),
      bwd: new FormControl((this.product) ? this.product.bwd : false),
      forOrder: new FormControl((this.product) ? this.product.forOrder : true),
      hide: new FormControl((this.product) ? this.product.hide : false),
      prohibited: new FormControl((this.product) ? this.product.prohibited : false),
      sDisc: new FormControl((this.product) ? this.product.sDisc : 0)
    });
  }

  submitProduct() {
    const data = this.productForm.value;
    data['sDisc'] = (data.sDisc == null) ? 0 : data.sDisc;
    data['manufacturerId'] = this.selectedManufacturer.id;
    data['sectionId'] = this.selectedSection.id;
    data['rackId'] = this.selectedRack.id;
    data['taxId'] = this.selectedTax.id;
    data['drugSchedules'] = [];
    for (const i of this.selectedDrugSchedules) {
      data['drugSchedules'].push(i.id);
    }
    data['therapies'] = [];
    for (const i of this.selectedTherapy) {
      data['therapies'].push(i.id);
    }
    data['salts'] = [];
    for (const i of this.selectedSalt) {
      data['salts'].push({id: i.id, strength: i.strength});
    }
    const secondary = [];
    for (const i of this.selectedSecondaryUnit) {
      secondary.push({
        id: i.id,
        conversion: i.conversion
      });
    }
    data['unit'] = {
      primary_id: this.selectedPrimaryUnit.id,
      secondary: secondary
    };
    this.submitHandler.emit(data);
  }

  disableProductForm() {
    this.productFormEnabled = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      if (this.openingInventory.bwd) {
        this.batchNoFocusHandler.emit(true);
      } else {
        this.unitFocusHandler.emit(true);
      }
    }, 100);
  }

  buildOpeningForm() {
    this.openingForm = this.fb.group({
      qty: new FormControl((this.product && this.product.opening) ? this.product.opening.qty : null, [Validators.required]),
      pCost: new FormControl((this.product && this.product.opening) ? this.product.opening.pCost : null , [Validators.required]),
      mrp: new FormControl((this.product && this.product.opening) ? this.product.opening.mrp : null, [Validators.required])
    });
  }

  buildBwdForm() {
    this.bwdForm = this.fb.group({
      id: new FormControl(null),
      batchNo: new FormControl(null, Validators.required),
      expMonth: new FormControl(null, Validators.required),
      expYear: new FormControl(null, Validators.required),
      qty: new FormControl(null, Validators.required),
      pCost:  new FormControl(null, Validators.required),
      mrp: new FormControl(null, Validators.required)
    });
  }

  focusOnBwdDataList(e) {
    if (e.keyCode === 32) {
      if (this.bwdList && this.bwdList.first.nativeElement) {
        this.bwdList.first.nativeElement.focus();
      }
    }
  }

  editBwdList(e, data) {
    if (e.keyCode === 32) {
      this.batchNoFocusHandler.emit(true);
    } else if (e.keyCode === 13) {
      data['updating'] = true;
      this.selectedUnit = data.unit;
      this.bwdForm.patchValue({
        id: data.id,
        batchNo: data.batchNo,
        expMonth: data.expMonth,
        expYear: data.expYear,
        qty: data.qty,
        pCost: data.pCost,
        mrp: data.mrp
      });
      this.batchNoFocusHandler.emit(true);
    }
  }

  addOrReplaceBwd(data) {
    let exists = false;
    for (const i of this.bwd) {
      if (i.updating) {
        i.id = data.id;
        i.batchNo = data.batchNo;
        i.expMonth = data.expMonth;
        i.expYear = data.expYear;
        i.qty = data.qty;
        i.pCost = data.pCost;
        i.mrp = data.mrp;
        exists = true;
      }
    }
    if (!exists) {
      this.bwd.push(data);
    }
    this.bwdForm.reset();
    this.selectedUnit = null;
    this.batchNoFocusHandler.emit(true);
  }

  submitOpening() {
    if (this.openingInventory.bwd) {
      const data = this.bwdForm.value;
      data['updating'] = false;
      const formValue = this.bwdForm.value;
      if (this.bwdForm.valid) {
        data['unit'] = this.selectedUnit;
        this.addOrReplaceBwd(data);
      } else if (!formValue.batchNo && !formValue.expMonth && !formValue.expYear && !formValue.qty && !formValue.pCost && !formValue.mrp) {
        if (this.bwd.length > 0) {
          const bwd = [];
          for (const i of this.bwd) {
            bwd.push({
              id: i.id,
              batchNo: i.batchNo,
              expMonth: i.expMonth,
              expYear: i.expYear,
              unitId: i.unit.id,
              qty: i.qty,
              pCost: i.pCost,
              mrp: i.mrp
            });
          }
          const opening = {
            id: this.openingInventory.id,
            opening: {bwd: bwd}
          };
          this.submitHandler.emit(opening);
        } else {
          this.reset();
        }
      }
    } else {
      const data = this.openingForm.value;
      if (this.openingForm.valid && this.selectedUnit) {
        const opening = {
          id: this.openingInventory.id,
          opening: {
            qty: data.qty,
            pCost: data.pCost,
            mrp: data.mrp,
            unitId: this.selectedUnit.id,
            bwd: []
          }
        };
        this.submitHandler.emit(opening);
      } else if (!data.qty && !data.pCost && !data.mrp && !this.selectedUnit) {
        this.reset();
      }
    }
  }

  reset() {
    setTimeout(() => {
      this.productFocusHandler.emit(true);
      this.selectedManufacturer = null;
      this.selectedRack = null;
      this.selectedTherapy = [];
      this.selectedSalt = [];
      this.selectedTax = null;
      this.selectedTaxType = null;
      this.selectedDrugSchedules = [];
      this.selectedSection  = null;
      this.selectedPrimaryUnit = null;
      this.selectedSecondaryUnit = null;
      this.productForm.reset();
      this.openingForm.reset();
      this.bwd = null;
      this.productFormEnabled = true;
      this.openingInventory = null;
      this.selectedUnit = null;
    });
  }

  manufacturerListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectManufacturer.bind(this),
        undefined,
        this.manufacturerDataStream.bind(this),
        'Manufacturer List',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  sectionListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectSection.bind(this),
        undefined,
        this.sectionDataStream.bind(this),
        'Section List',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  therapyListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        undefined,
        this.selectTherapy.bind(this),
        this.therapyDataStream.bind(this),
        'Therapy List',
        this.autoCompleteFields,
        17,
        'name',
      {uniqueKey: 'id', markedElements: this.selectedTherapy || []}
      );
    }
  }

  rackListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        this.selectRack.bind(this),
        undefined,
        this.rackDataStream.bind(this),
        'Rack List',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  saltListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        { height: '600px', width: '500px', disableClose: true },
        undefined,
        this.selectSalt.bind(this),
        this.saltDataStream.bind(this),
        'Salt List',
        this.autoCompleteFields,
        17,
        'name',
      {uniqueKey: 'id', markedElements: this.selectedSalt || []}
      );
    }
  }

  typeOfTaxListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectTaxType.bind(this),
        undefined,
        this.taxTypeDataStream.bind(this),
        'Type Of Tax',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  taxListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectTax.bind(this),
        undefined,
        this.taxDataStream.bind(this),
        'Tax List',
        this.autoCompleteFields,
        17,
        'name',
      );
    }
  }

  drugScheduleListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        undefined,
        this.selectDrugSchedule.bind(this),
        this.drugScheduleDataStream.bind(this),
        'Drug Schedule List',
        this.autoCompleteFields,
        17,
        'name',
        {uniqueKey: 'id', markedElements: this.selectedDrugSchedules || []}
      );
    }
  }

  primaryUnitListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectPrimaryUnit.bind(this),
        undefined,
        this.primaryUnitDataStream.bind(this),
        'primary Unit List',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  secondaryUnitListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        undefined,
        this.selectSecondaryUnit.bind(this),
        this.secondaryUnitDataStream.bind(this),
        'Secondary Unit List',
        this.autoCompleteFields,
        17,
        'name',
      {uniqueKey: 'id', markedElements: this.selectedDrugSchedules || []}
      );
    }
  }

  unitListOnKeyDown(e) {
    if (!e.ctrlKey && UtilityService.alphanumericKeyDown(e)) {
      this.autoCompleteDialogService.openDialog(
        {height: '600px', width: '500px', disableClose: true},
        this.selectUnit.bind(this),
        undefined,
        this.unitDataStream.bind(this),
        'Unit List',
        this.autoCompleteFields,
        17,
        'name'
      );
    }
  }

  selectManufacturer(item) {
    if (item) {
      this.selectedManufacturer = item;
    }
  }

  selectSection(item) {
    if (item) {
      this.selectedSection = item;
    }
  }

  selectTherapy(item) {
    if (item) {
      this.selectedTherapy = item;
    }
  }

  selectRack(item) {
    if (item) {
      this.selectedRack = item;
    }
  }

  selectSalt(item) {
    if (item) {
      this.selectedSalt = item;
    }
  }

  selectTaxType(item) {
    if (item) {
      this.selectedTaxType = item;
    }
  }

  selectTax(item) {
   if (item) {
     this.selectedTax = item;
   }
    if (item) {
      this.selectedTax = item;
    }
  }

  selectDrugSchedule(item) {
    if (item) {
      this.selectedDrugSchedules = item;
    }
  }

  selectUnit(item) {
    if (item) {
      this.selectedUnit = item;
    }
  }

  selectSecondaryUnit(item) {
    if (item) {
      this.selectedSecondaryUnit = item;
    }
  }

  selectPrimaryUnit(item) {
    if (item) {
      this.selectedPrimaryUnit = item;
    }
  }

  manufacturerDataStream(searchParams) {
    return this.masterApiService.listManufacturer(searchParams);
  }

  sectionDataStream(searchParams) {
    return this.masterApiService.listSection(searchParams);
  }

  therapyDataStream(searchParams) {
    return this.masterApiService.listTherapy(searchParams);
  }

  rackDataStream(searchParams) {
    return this.masterApiService.listRack(searchParams);
  }

  saltDataStream(searchParams) {
    return this.masterApiService.listSalt(searchParams);
  }

  taxTypeDataStream(searchParams) {
    return this.coreApiService.listTaxType(searchParams);
  }

  taxDataStream(searchParams) {
    return this.masterApiService.listTax(searchParams);
  }

  drugScheduleDataStream(searchParams) {
    return this.masterApiService.listDrugSchedule(searchParams);
  }

  unitDataStream(searchParams) {
    return this.masterApiService.listUnit(searchParams);
  }

  primaryUnitDataStream(searchParams) {
    return this.masterApiService.listUnit(searchParams);
  }

  secondaryUnitDataStream(searchParams) {
    searchParams['primary'] = this.selectedPrimaryUnit.id;
    return this.masterApiService.listSecondaryUnit(searchParams);
  }
}
