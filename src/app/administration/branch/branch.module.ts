import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../shared/shared.module';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { BranchCreateComponent } from './branch-create/branch-create.component';
import { BranchFormComponent } from './branch-form/branch-form.component';
import { BranchUpdateComponent } from './branch-update/branch-update.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    CommonModule,
    BranchRoutingModule
  ],
  declarations: [
    BranchComponent,
    BranchCreateComponent,
    BranchFormComponent,
    BranchUpdateComponent
  ]
})
export class BranchModule {}
