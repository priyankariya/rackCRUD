import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoRoutingModule } from './account-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountInfoRoutingModule
  ],
  declarations: [
    AccountInfoComponent
  ]
})
export class AccountInfoModule {

}
