import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { UnitRoutingModule } from './unit-routing.module';
import { UnitComponent } from './unit.component';
import { UnitCreateComponent } from './unit-create/unit-create.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitUpdateComponent } from './unit-update/unit-update.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    UnitRoutingModule
  ],
  declarations: [
    UnitComponent,
    UnitCreateComponent,
    UnitFormComponent,
    UnitUpdateComponent
  ]
})
export class UnitModule {}
