import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ManufacturerCreateComponent } from './manufacturer-create/manufacturer-create.component';
import { ManufacturerUpdateComponent } from './manufacturer-update/manufacturer-update.component';
import { ManufacturerComponent } from './manufacturer.component';


const routes: Routes = [
  {
    path: '',
    component: ManufacturerComponent
  },
  {
    path: 'add',
    component: ManufacturerCreateComponent
  },
  {
    path: ':id/edit',
    component: ManufacturerUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule {

}
