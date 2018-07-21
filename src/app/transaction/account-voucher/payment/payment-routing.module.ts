import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PaymentComponent } from './payment.component';
import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';



const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  },
  {
    path: 'create',
    component: PaymentCreateComponent
  },
  {
    path: ':id/edit',
    component: PaymentUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
