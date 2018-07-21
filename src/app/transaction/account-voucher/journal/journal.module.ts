import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { JournalComponent } from './journal.component';
import { JournalRoutingModule } from './journal-routing.module';
import { TransactionSharedModule } from '../../transaction-shared/transaction-shared.module';
import { JournalCreateComponent } from './journal-create/journal-create.component';
import { JournalUpdateComponent } from './journal-update/journal-update.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransactionSharedModule,
    JournalRoutingModule
  ],
  declarations: [
    JournalComponent,
    JournalCreateComponent,
    JournalUpdateComponent
  ]
})
export class JournalModule {}
