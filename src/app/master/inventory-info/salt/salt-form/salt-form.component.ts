import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salt-form',
  templateUrl: 'salt-form.component.html',
  styleUrls: ['salt-form.component.scss']
})
export class SaltFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  saltForm: FormGroup;
  saltFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()saltSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() salt: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.salt && this.salt) {
      this.buildForm();
    }
  }

  buildForm() {
    this.saltForm = this.fb.group({
      id: new FormControl((this.salt) ? this.salt.id : null),
      name: new FormControl((this.salt) ? this.salt.name : null, [Validators.required]),
      aliasName: new FormControl((this.salt) ? this.salt.aliasName : null),
    });
  }

  submit() {
    if (this.saltForm.valid) {
      const data = this.saltForm.value;
      this.saltSubmit.emit(data);
    }
  }

  reset() {
    this.saltForm.reset();
    setTimeout(() => {
      this.saltFocusHandler.emit(true);
    });
  }
}
