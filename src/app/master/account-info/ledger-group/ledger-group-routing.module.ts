import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LedgerGroupComponent } from './ledger-group.component';
import { LedgerGroupCreateComponent } from './ledger-group-create/ledger-group-create.component';
import { LedgerGroupUpdateComponent } from './ledger-group-update/ledger-group-update.component';

const routes: Routes = [
  {
    path: '',
    component: LedgerGroupComponent
  },
  {
    path: 'add',
    component: LedgerGroupCreateComponent
  },
  {
    path: ':id/edit',
    component: LedgerGroupUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerGroupRoutingModule {

}
