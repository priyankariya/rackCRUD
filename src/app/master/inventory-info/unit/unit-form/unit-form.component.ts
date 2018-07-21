import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-form',
  templateUrl: 'unit-form.component.html',
  styleUrls: ['unit-form.component.scss']
})
export class UnitFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  unitForm: FormGroup;
  unitFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()unitSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() unit: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.unit && this.unit) {
      this.buildForm();
    }
  }

  buildForm() {
    this.unitForm = this.fb.group({
      id: new FormControl((this.unit) ? this.unit.id : null),
      name: new FormControl((this.unit) ? this.unit.name : null, [Validators.required]),
      aliasName: new FormControl((this.unit) ? this.unit.aliasName : null),
    });
  }

  submit() {
    if (this.unitForm.valid) {
      const data = this.unitForm.value;
      this.unitSubmit.emit(data);
    }
  }

  reset() {
    this.unitForm.reset();
    setTimeout(() => {
      this.unitFocusHandler.emit(true);
    });
  }
}
