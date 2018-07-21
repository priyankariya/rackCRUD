import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { VoucherModelComponent } from './voucher-model.component';
import { VoucherModelCreateComponent } from './voucher-model-create/voucher-model-create.component';
import { VoucherModelUpdateComponent } from './voucher-model-update/voucher-model-update.component';

const routes: Routes = [
  {
    path: '',
    component: VoucherModelComponent
  },
  {
    path: 'add',
    component: VoucherModelCreateComponent
  },
  {
    path: ':id/edit',
    component: VoucherModelUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherModelRoutingModule {}
