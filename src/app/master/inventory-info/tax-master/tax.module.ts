import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { TaxRoutingModule } from './tax-routing.module';
import { TaxComponent } from './tax.component';
import { TaxCreateComponent } from './tax-create/tax-create.component';
import { TaxFormComponent } from './tax-form/tax-form.component';
import { TaxUpdateComponent } from './tax-update/tax-update.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    TaxRoutingModule
  ],
  declarations: [
    TaxComponent,
    TaxCreateComponent,
    TaxFormComponent,
    TaxUpdateComponent
  ]
})
export class TaxModule {}
