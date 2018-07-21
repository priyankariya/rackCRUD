import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LedgerComponent } from './ledger.component';
import { LedgerCreateComponent } from './ledger-create/ledger-create.component';
import { LedgerUpdateComponent } from './ledger-update/ledger-update.component';

const routes: Routes = [
  {
    path: '',
    component: LedgerComponent
  },
  {
    path: 'create',
    component: LedgerCreateComponent
  },
  {
    path: ':id/edit',
    component: LedgerUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild((routes))],
  exports: [RouterModule]
})
export class LedgerRoutingModule {

}
