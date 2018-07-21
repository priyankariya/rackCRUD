import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account-info',
    loadChildren: './account-info/account-info.module#AccountInfoModule'
  },
  {
    path: 'inventory-info',
    loadChildren: './inventory-info/inventory-info.module#InventoryInfoModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {

}
