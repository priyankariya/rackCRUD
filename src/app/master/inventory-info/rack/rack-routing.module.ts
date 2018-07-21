import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RackComponent } from './rack.component';
import { RackCreateComponent } from './rack-create/rack-create.component';
import { RackUpdateComponent } from './rack-update/rack-update.component';

const routes: Routes = [
  {
    path: '',
    component: RackComponent
  },
  {
    path: 'add',
    component: RackCreateComponent
  },
  {
    path: ':id/edit',
    component: RackUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RackRoutingModule {

}
