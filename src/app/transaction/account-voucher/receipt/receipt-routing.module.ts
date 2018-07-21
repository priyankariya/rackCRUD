import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ReceiptComponent } from './receipt.component';
import { ReceiptCreateComponent } from './receipt-create/receipt-create.component';
import { ReceiptUpdateComponent } from './receipt-update/receipt-update.component';



const routes: Routes = [
  {
    path: '',
    component: ReceiptComponent
  },
  {
    path: 'add',
    component: ReceiptCreateComponent
  },
  {
    path: ':id/edit',
    component: ReceiptUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule {}
