import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TherapyComponent } from './therapy.component';
import { TherapyCreateComponent } from './therapy-create/therapy-create.component';
import { TherapyUpdateComponent } from './therapy-update/therapy-update.component';


const routes: Routes = [
  {
    path: '',
    component: TherapyComponent
  },
  {
    path: 'add',
    component: TherapyCreateComponent
  },
  {
    path: ':id/edit',
    component: TherapyUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapyRoutingModule {

}
