import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { RackRoutingModule } from './rack-routing.module';
import { RackComponent } from './rack.component';
import { RackCreateComponent } from './rack-create/rack-create.component';
import { RackFormComponent } from './rack-form/rack-form.component';
import { RackUpdateComponent } from './rack-update/rack-update.component';
import {RackService} from './rack.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    RackRoutingModule,
    FormsModule
  ],
  declarations: [
    RackComponent,
    RackCreateComponent,
    RackFormComponent,
    RackUpdateComponent
  ],
  providers: [
    RackService
  ]
})
export class RackModule {}
