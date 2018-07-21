import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { GatewayComponent } from './gateway/gateway.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BranchMenuComponent } from './branch-menu/branch-menu.component';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PageRoutingModule
  ],
  declarations: [
    GatewayComponent,
    DashboardComponent,
    LoginComponent,
    BranchMenuComponent,
    OrganizationComponent
  ]
})
export class PageModule { }
