import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { AccountVoucherRoutingModule } from './account-voucher-routing.module';
import { AccountVoucherComponent } from './account-voucher.component';
import { VoucherModelService } from '../transaction-shared/service/voucher-model.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountVoucherRoutingModule
  ],
  declarations: [
    AccountVoucherComponent
  ],
  providers: [VoucherModelService]
})
export class AccountVoucherModule {}
