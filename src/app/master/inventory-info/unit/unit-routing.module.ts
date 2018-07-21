import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UnitComponent } from './unit.component';
import { UnitCreateComponent } from './unit-create/unit-create.component';
import { UnitUpdateComponent } from './unit-update/unit-update.component';


const routes: Routes = [
  {
    path: '',
    component: UnitComponent
  },
  {
    path: 'add',
    component: UnitCreateComponent
  },
  {
    path: ':id/edit',
    component: UnitUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule {

}
