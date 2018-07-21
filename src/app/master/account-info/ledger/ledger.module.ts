import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';
import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import { LedgerCreateComponent } from './ledger-create/ledger-create.component';
import { LedgerFormComponent } from './ledger-form/ledger-form.component';
import { LedgerUpdateComponent } from './ledger-update/ledger-update.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    SharedModule,
    LedgerRoutingModule
  ],
  declarations: [
    LedgerComponent,
    LedgerCreateComponent,
    LedgerFormComponent,
    LedgerUpdateComponent
  ]
})
export class LedgerModule {

}
