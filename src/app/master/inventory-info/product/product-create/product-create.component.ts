import { Component, HostListener, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { ProductFormComponent } from '../product-form/product-form.component';
import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-product-create',
  templateUrl: 'product-create.component.html',
  styleUrls: ['product-create.component.scss']
})
export class ProductCreateComponent {

  @ViewChild('productForm') productForm: ProductFormComponent;
  @HostListener('document:keydown', ['$event']) onKeyDown(e) {
    if (this.coreService.dialogMode) {
      e.preventDefault();
    } else {
      UtilityService.keyDown(
        e, undefined, undefined, undefined, this.goBack.bind(this), this.saveProduct.bind(this), this.goBack.bind(this)
      );
    }
  }

  constructor(
    private _location: Location,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  saveProduct() {
    if (this.productForm.productFormEnabled) {
      this.productForm.submitProduct();
    } else  {
      this.productForm.submitOpening();
    }
  }

  onSubmitProduct(product) {
    if (this.productForm.productFormEnabled && !this.productForm.loading) {
      this.productForm.loading = true;
      this.masterApiService.createProduct(product).subscribe((result) => {
        this.productForm.openingInventory =  result;
        this.productForm.loading = false;
        this.productForm.disableProductForm();
        this.coreService.statusHandler.emit('Product saved successfully...');
      }, () => {
        this.productForm.loading = false;
      });
    } else if (!this.productForm.productFormEnabled && !this.productForm.bwdLoading) {
      this.productForm.bwdLoading = true;
      this.masterApiService.createOpeningInventory(product).subscribe(() => {
        this.productForm.reset();
        this.productForm.bwdLoading = false;
        this.coreService.statusHandler.emit('Product Opening saved successfully...');
      }, () => {
        this.productForm.bwdLoading = false;
      });
    }
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }
}
