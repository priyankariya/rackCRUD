import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { SaltRoutingModule } from './salt-routing.module';
import { SaltComponent } from './salt.component';
import { SaltCreateComponent } from './salt-create/salt-create.component';
import { SaltFormComponent } from './salt-form/salt-form.component';
import { SaltUpdateComponent } from './salt-update/salt-update.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    SaltRoutingModule
  ],
  declarations: [
    SaltComponent,
    SaltCreateComponent,
    SaltFormComponent,
    SaltUpdateComponent
  ]
})
export class SaltModule {}
