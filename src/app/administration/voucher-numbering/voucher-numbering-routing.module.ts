import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { VoucherNumberingComponent } from './voucher-numbering.component';


const routes: Routes = [
  {
    path: '',
    component: VoucherNumberingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherNumberingRoutingModule {}
