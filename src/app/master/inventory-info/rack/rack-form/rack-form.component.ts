import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rack-form',
  templateUrl: 'rack-form.component.html',
  styleUrls: ['rack-form.component.scss']
})
export class RackFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  rackForm: FormGroup;
  rackFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()rackSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() rack: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.rack && this.rack) {
      this.buildForm();
    }
  }

  buildForm() {
    this.rackForm = this.fb.group({
      id: new FormControl((this.rack) ? this.rack.id : null),
      name: new FormControl((this.rack) ? this.rack.name : null, [Validators.required]),
      aliasName: new FormControl((this.rack) ? this.rack.aliasName : null)
    });
  }

  submit() {
    if (this.rackForm.valid) {
      const data = this.rackForm.value;
      this.rackSubmit.emit(data);
    }
  }

  reset() {
    this.rackForm.reset();
    setTimeout(() => {
      this.rackFocusHandler.emit(true);
    });
  }
}
