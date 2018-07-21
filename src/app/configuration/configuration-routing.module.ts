import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ConfigurationComponent } from './configuration.component';
import { NetworkConfigurationComponent } from './network-configuration/network-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  },
  {
    path: 'network',
    component: NetworkConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {

}
