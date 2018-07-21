import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { TransactionSharedModule } from '../../transaction-shared/transaction-shared.module';
import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransactionSharedModule,
    PaymentRoutingModule
  ],
  declarations: [
    PaymentComponent,
    PaymentCreateComponent,
    PaymentUpdateComponent
  ]
})
export class PaymentModule {}
