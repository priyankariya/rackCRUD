import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatIconModule, MatIconRegistry } from '@angular/material';


import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing-module';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserCreateComponent,
    UserFormComponent,
    UserUpdateComponent
  ],
  providers: [
    MatIconRegistry
  ]
})
export class UserModule {}
