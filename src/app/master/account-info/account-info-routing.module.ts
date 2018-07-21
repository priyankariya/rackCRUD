import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './account-info.component';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoComponent
  },
  {
    path: 'ledger',
    loadChildren: './ledger/ledger.module#LedgerModule'
  },
  {
    path: 'ledger-group',
    loadChildren: './ledger-group/ledger-group.module#LedgerGroupModule'
  },
  {
    path: 'voucher-model',
    loadChildren: './voucher-model/voucher-model.module#VoucherModelModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule {

}
