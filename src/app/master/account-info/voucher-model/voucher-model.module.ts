import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../../shared/shared.module';
import { VoucherModelRoutingModule } from './voucher-model-routing.module';
import { VoucherModelComponent } from './voucher-model.component';
import { VoucherModelCreateComponent } from './voucher-model-create/voucher-model-create.component';
import { VoucherModelFormComponent } from './voucher-model-form/voucher-model-form.component';
import { VoucherModelUpdateComponent } from './voucher-model-update/voucher-model-update.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    VoucherModelRoutingModule
  ],
  declarations: [
    VoucherModelComponent,
    VoucherModelCreateComponent,
    VoucherModelFormComponent,
    VoucherModelUpdateComponent
  ]
})
export class VoucherModelModule {}
