import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerComponent } from './manufacturer.component';
import { ManufacturerCreateComponent } from './manufacturer-create/manufacturer-create.component';
import { ManufacturerFormComponent } from './manufacturer-form/manufacturer-form.component';
import { ManufacturerUpdateComponent } from './manufacturer-update/manufacturer-update.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    ManufacturerRoutingModule
  ],
  declarations: [
    ManufacturerComponent,
    ManufacturerCreateComponent,
    ManufacturerFormComponent,
    ManufacturerUpdateComponent
  ]
})
export class ManufacturerModule {}
