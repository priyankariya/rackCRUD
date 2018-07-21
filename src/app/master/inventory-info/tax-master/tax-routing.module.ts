import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TaxComponent } from './tax.component';
import { TaxCreateComponent } from './tax-create/tax-create.component';
import { TaxUpdateComponent } from './tax-update/tax-update.component';

const routes: Routes = [
  {
    path: '',
    component: TaxComponent
  },
  {
    path: 'add',
    component: TaxCreateComponent
  },
  {
    path: ':id/edit',
    component: TaxUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule {

}
