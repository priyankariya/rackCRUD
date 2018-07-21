import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContraComponent } from './contra.component';
import { ContraCreateComponent } from './contra-create/contra-create.component';
import { ContraUpdateComponent } from './contra-update/contra-update.component';

const routes: Routes = [
  {
    path: '',
    component: ContraComponent
  },
  {
    path: 'create',
    component: ContraCreateComponent
  },
  {
    path: ':id/edit',
    component: ContraUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContraRoutingModule {}
