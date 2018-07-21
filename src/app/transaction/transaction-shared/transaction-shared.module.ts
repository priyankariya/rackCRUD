import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/shared.module';
import { BwdAdjustmentComponent } from './components/bwd-adjustment/bwd-adjustment.component';
import { MatDialogModule } from '@angular/material';
import { AccountVoucherElementComponent } from './components/account-voucher-element/account-voucher-element.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    SharedModule,
  ],
  declarations: [
    AccountVoucherElementComponent,
    BwdAdjustmentComponent
  ],
  exports: [
    AccountVoucherElementComponent,
    BwdAdjustmentComponent
  ],
  entryComponents: [
    BwdAdjustmentComponent
  ]
})
export class TransactionSharedModule {}
