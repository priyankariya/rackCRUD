import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule
  ],
  declarations: []
})
export class TransactionModule {}
