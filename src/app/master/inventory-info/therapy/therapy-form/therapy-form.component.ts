import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-therapy-form',
  templateUrl: 'therapy-form.component.html',
  styleUrls: ['therapy-form.component.scss']
})
export class TherapyFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  therapyForm: FormGroup;
  therapyFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()therapySubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() therapy: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.therapy && this.therapy) {
      this.buildForm();
    }
  }

  buildForm() {
    this.therapyForm = this.fb.group({
      id: new FormControl((this.therapy) ? this.therapy.id : null),
      name: new FormControl((this.therapy) ? this.therapy.name : null, [Validators.required]),
      aliasName: new FormControl((this.therapy) ? this.therapy.aliasName : null),
    });
  }

  submit() {
    if (this.therapyForm.valid) {
      const data = this.therapyForm.value;
      this.therapySubmit.emit(data);
    }
  }

  reset() {
    this.therapyForm.reset();
    setTimeout(() => {
      this.therapyFocusHandler.emit(true);
    });
  }
}
