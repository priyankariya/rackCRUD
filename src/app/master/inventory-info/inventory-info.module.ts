import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {SharedModule} from '../../shared/shared.module';
import {InventoryInfoRoutingModule} from './inventory-info-routing.module';
import {InventoryInfoComponent} from './inventory-info.component';

@NgModule ({
  imports: [
    SharedModule,
    CommonModule,
    InventoryInfoRoutingModule
  ],
  declarations: [
    InventoryInfoComponent
  ]
})
export class InventoryInfoModule {

}
