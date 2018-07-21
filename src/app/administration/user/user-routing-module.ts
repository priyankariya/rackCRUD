import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
