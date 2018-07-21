import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { ReceiptComponent } from './receipt.component';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { TransactionSharedModule } from '../../transaction-shared/transaction-shared.module';
import { ReceiptCreateComponent } from './receipt-create/receipt-create.component';
import { ReceiptUpdateComponent } from './receipt-update/receipt-update.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransactionSharedModule,
    ReceiptRoutingModule
  ],
  declarations: [
    ReceiptComponent,
    ReceiptCreateComponent,
    ReceiptUpdateComponent
  ]
})
export class ReceiptModule {}
