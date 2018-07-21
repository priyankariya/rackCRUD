import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { VoucherNumberingRoutingModule } from './voucher-numbering-routing.module';
import { VoucherNumberingComponent } from './voucher-numbering.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    VoucherNumberingRoutingModule
  ],
  declarations: [
    VoucherNumberingComponent
  ]
})
export class VoucherNumberingModule {}
