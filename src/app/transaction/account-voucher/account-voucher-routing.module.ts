import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AccountVoucherComponent } from './account-voucher.component';

const routes: Routes = [
  {
    path: '',
    component: AccountVoucherComponent
  },
  {
    path: '1',
    loadChildren: './journal/journal.module#JournalModule'
  },
  {
    path: '4',
    loadChildren: './contra/contra.module#ContraModule'
  },
  {
    path: '2',
    loadChildren: './payment/payment.module#PaymentModule'
  },
  {
    path: '3',
    loadChildren: './receipt/receipt.module#ReceiptModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountVoucherRoutingModule {}
