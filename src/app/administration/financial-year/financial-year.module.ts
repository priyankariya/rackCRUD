import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


import { FinancialYearRoutingModule } from './financial-year-routing.module';
import { FinancialYearComponent } from './financial-year.component';
import { FinancialYearCreateComponent } from './financial-year-create/financial-year-create.component';
import { FinancialYearUpdateComponent } from './financial-year-update/financial-year-update.component';
import { SharedModule } from '../../shared/shared.module';
import { FinancialYearFormComponent } from './financial-year-form/financial-year-form.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    FinancialYearRoutingModule
  ],
  declarations: [
    FinancialYearComponent,
    FinancialYearCreateComponent,
    FinancialYearUpdateComponent,
    FinancialYearFormComponent
  ]
})
export class FinancialYearModule {}
