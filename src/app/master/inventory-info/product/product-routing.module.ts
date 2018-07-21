import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'add',
    component: ProductCreateComponent
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}
