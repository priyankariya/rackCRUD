import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { NetworkConfigurationComponent } from './network-configuration/network-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    ConfigurationRoutingModule
  ],
  declarations: [
    ConfigurationComponent,
    NetworkConfigurationComponent
  ]
})
export class ConfigurationModule {

}
