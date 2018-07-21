import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { GatewayComponent } from './gateway/gateway.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BranchMenuComponent } from './branch-menu/branch-menu.component';
import { RegistrationComponent } from '../core/registration/registration.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'organization'
  },
  {
    path: 'organization',
    component: OrganizationComponent
  },
  {
    path: 'gateway',
    component: GatewayComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'branch',
    component: BranchMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PageRoutingModule {
}
