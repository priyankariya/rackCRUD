import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { TherapyRoutingModule } from './therapy-routing.module';
import { TherapyComponent } from './therapy.component';
import { TherapyCreateComponent } from './therapy-create/therapy-create.component';
import { TherapyFormComponent } from './therapy-form/therapy-form.component';
import { TherapyUpdateComponent } from './therapy-update/therapy-update.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    TherapyRoutingModule
  ],
  declarations: [
    TherapyComponent,
    TherapyCreateComponent,
    TherapyFormComponent,
    TherapyUpdateComponent
  ]
})
export class TherapyModule {}
