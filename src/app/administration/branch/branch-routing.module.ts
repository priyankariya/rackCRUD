import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BranchComponent } from './branch.component';
import { BranchCreateComponent } from './branch-create/branch-create.component';
import { BranchUpdateComponent } from './branch-update/branch-update.component';

const routes: Routes = [
  {
    path: '',
    component: BranchComponent
  },
  {
    path: 'create',
    component: BranchCreateComponent
  },
  {
    path: ':id/edit',
    component: BranchUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule {}
