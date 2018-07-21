import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductFormComponent,
    ProductUpdateComponent
  ]
})
export class ProductModule {}
