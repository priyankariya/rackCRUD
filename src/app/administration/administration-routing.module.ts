import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path: 'branch',
    loadChildren: './branch/branch.module#BranchModule'
  },
  {
    path: 'voucher-numbering',
    loadChildren: './voucher-numbering/voucher-numbering.module#VoucherNumberingModule'
  },
  {
    path: 'financial-year',
    loadChildren: './financial-year/financial-year.module#FinancialYearModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {

}
