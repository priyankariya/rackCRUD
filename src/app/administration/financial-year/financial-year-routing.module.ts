import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FinancialYearComponent } from './financial-year.component';
import { FinancialYearCreateComponent } from './financial-year-create/financial-year-create.component';
import { FinancialYearUpdateComponent } from './financial-year-update/financial-year-update.component';


const routes: Routes = [
  {
    path: '',
    component: FinancialYearComponent
  },
  {
    path: 'add',
    component: FinancialYearCreateComponent
  },
  {
    path: ':id/edit',
    component: FinancialYearUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialYearRoutingModule {

}
