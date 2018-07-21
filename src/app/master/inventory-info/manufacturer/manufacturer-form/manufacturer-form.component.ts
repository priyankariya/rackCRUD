import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: 'manufacturer-form.component.html',
  styleUrls: ['manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  manufacturerForm: FormGroup;
  manufacturerFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()manufacturerSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() manufacturer: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.manufacturer && this.manufacturer) {
      this.buildForm();
    }
  }

  buildForm() {
    this.manufacturerForm = this.fb.group({
      id: new FormControl((this.manufacturer) ? this.manufacturer.id : null),
      name: new FormControl((this.manufacturer) ? this.manufacturer.name : null, [Validators.required]),
      aliasName: new FormControl((this.manufacturer) ? this.manufacturer.aliasName : null),
    });
  }

  submit() {
    if (this.manufacturerForm.valid) {
      const data = this.manufacturerForm.value;
      this.manufacturerSubmit.emit(data);
    }
  }

  reset() {
    this.manufacturerForm.reset();
    setTimeout(() => {
      this.manufacturerFocusHandler.emit(true);
    });
  }
}
