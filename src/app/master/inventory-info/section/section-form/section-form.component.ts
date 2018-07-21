import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-form',
  templateUrl: 'section-form.component.html',
  styleUrls: ['section-form.component.scss']
})
export class SectionFormComponent implements OnInit, OnChanges {

  autoCompleteFields = [{ caption: 'Name', dataField: 'name', width: 100}];
  sectionForm: FormGroup;
  sectionFocusHandler: EventEmitter<any> = new EventEmitter<any>();

  @Output()sectionSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() section: any;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.section && this.section) {
      this.buildForm();
    }
  }

  buildForm() {
    this.sectionForm = this.fb.group({
      id: new FormControl((this.section) ? this.section.id : null),
      name: new FormControl((this.section) ? this.section.name : null, [Validators.required]),
      aliasName: new FormControl((this.section) ? this.section.aliasName : null),
    });
  }

  submit() {
    if (this.sectionForm.valid) {
      const data = this.sectionForm.value;
      this.sectionSubmit.emit(data);
    }
  }

  reset() {
    this.sectionForm.reset();
    setTimeout(() => {
      this.sectionFocusHandler.emit(true);
    });
  }
}
