import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SaltComponent } from './salt.component';
import { SaltCreateComponent } from './salt-create/salt-create.component';
import { SaltUpdateComponent } from './salt-update/salt-update.component';


const routes: Routes = [
  {
    path: '',
    component: SaltComponent
  },
  {
    path: 'add',
    component: SaltCreateComponent
  },
  {
    path: ':id/edit',
    component: SaltUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaltRoutingModule {

}
