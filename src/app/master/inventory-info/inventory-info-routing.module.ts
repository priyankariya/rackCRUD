import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {InventoryInfoComponent} from './inventory-info.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryInfoComponent
  },
  {
    path: 'tax',
    loadChildren: './tax-master/tax.module#TaxModule'
  },
  {
    path: 'salt',
    loadChildren: './salt/salt.module#SaltModule'
  },
  {
    path: 'manufacturer',
    loadChildren: './manufacturer/manufacturer.module#ManufacturerModule'
  },
  {
    path: 'section',
    loadChildren: './section/section.module#SectionModule'
  },
  {
    path: 'therapy',
    loadChildren: './therapy/therapy.module#TherapyModule'
  },
  {
    path: 'rack',
    loadChildren: './rack/rack.module#RackModule'
  },
  {
    path: 'unit',
    loadChildren: './unit/unit.module#UnitModule'
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  }
];

@NgModule ({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryInfoRoutingModule {
}
