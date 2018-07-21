import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutModule } from './layout/layout.module';
import { CoreService } from './core.service';
import { ConnectivityComponent } from './connectivity/connectivity.component';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    CoreRoutingModule,
    LayoutModule,
    MatIconModule
  ],
  declarations: [
    CoreComponent,
    ConnectivityComponent,
    RegistrationComponent
  ],
  providers: [
    MatIconRegistry,
    CoreService
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule {

}
