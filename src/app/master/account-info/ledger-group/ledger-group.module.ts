import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { LedgerGroupRoutingModule } from './ledger-group-routing.module';
import { LedgerGroupComponent } from './ledger-group.component';
import { LedgerGroupCreateComponent } from './ledger-group-create/ledger-group-create.component';
import { LedgerGroupFormComponent } from './ledger-group-form/ledger-group-form.component';
import { LedgerGroupUpdateComponent } from './ledger-group-update/ledger-group-update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    LedgerGroupRoutingModule
  ],
  declarations: [
    LedgerGroupComponent,
    LedgerGroupCreateComponent,
    LedgerGroupFormComponent,
    LedgerGroupUpdateComponent
  ]
})
export class LedgerGroupModule {

}
