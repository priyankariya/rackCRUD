import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LayoutComponent } from './layout/layout.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './../page/page.module#PageModule'
      },
      {
        path: 'administration',
        loadChildren: './../administration/administration.module#AdministrationModule'
      },
      {
        path: 'master',
        loadChildren: './../master/master.module#MasterModule'
      },
      {
        path: 'configuration',
        loadChildren: './../configuration/configuration.module#ConfigurationModule'
      },
      {
        path: 'transaction',
        loadChildren: './../transaction/transaction.module#TransactionModule'
      }
    ]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class CoreRoutingModule {
}
