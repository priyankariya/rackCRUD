import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
  selector: 'app-financial-year-form',
  templateUrl: 'financial-year-form.component.html',
  styleUrls: ['financial-year-form.component.scss']
})
export class FinancialYearFormComponent implements OnInit, OnChanges {

  @Input() financialYear;
  @Output() financialYearSubmit: EventEmitter<any> = new EventEmitter<any>();
  financialYearForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    if (!!this.financialYear && this.financialYear) {
      this.buildForm();
    }
  }

  buildForm() {
    this.financialYearForm = this.fb.group(
      {
        id: [(this.financialYear) ? this.financialYear.id : null],
        name: [(this.financialYear) ? this.financialYear.name : null],
        fyBegin: [(this.financialYear) ? this.financialYear.fyBegin : null],
        fyEnd: [(this.financialYear) ? this.financialYear.fyEnd : null],
        bookBegin: [(this.financialYear) ? this.financialYear.bookBegin : null],
        bookEnd: [(this.financialYear) ? this.financialYear.bookEnd : null]
      }
    );
  }

  submit() {
    if (this.financialYearForm.valid) {
      const fyData = this.financialYearForm.value;
      const data = {
        id: fyData.id,
        name: fyData.name,
        fyBegin: UtilityService.convertDateToBack(fyData.fyBegin),
        fyEnd: UtilityService.convertDateToBack(fyData.fyEnd),
        bookBegin: UtilityService.convertDateToBack(fyData.bookBegin),
        bookEnd: UtilityService.convertDateToBack(fyData.bookEnd)
      };
      this.financialYearSubmit.emit(data);
    }
  }

  reset() {
    this.financialYearForm.reset();
  }
}
