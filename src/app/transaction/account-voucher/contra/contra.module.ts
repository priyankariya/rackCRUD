import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../../shared/shared.module';
import { ContraComponent } from './contra.component';
import { ContraRoutingModule } from './contra-routing.module';
import { TransactionSharedModule } from '../../transaction-shared/transaction-shared.module';
import { ContraCreateComponent } from './contra-create/contra-create.component';
import { ContraUpdateComponent } from './contra-update/contra-update.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TransactionSharedModule,
    ContraRoutingModule
  ],
  declarations: [
    ContraComponent,
    ContraCreateComponent,
    ContraUpdateComponent
  ]
})
export class ContraModule {}
