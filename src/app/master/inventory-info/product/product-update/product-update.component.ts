import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MasterApiService } from '../../../../shared/services/api/master-api.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UtilityService } from '../../../../shared/services/utility.service';
import { MessageBoxService } from '../../../../shared/components/message-box/message-box.service';
import { CoreService } from '../../../../core/core.service';

@Component({
  selector: 'app-product-update',
  templateUrl: 'product-update.component.html',
  styleUrls: ['product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  product;

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
    private activatedRoute: ActivatedRoute,
    private coreService: CoreService,
    private messageBoxService: MessageBoxService,
    private masterApiService: MasterApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.masterApiService.getProduct(params['id']).subscribe((result) => {
        this.product = result;
      });
    });
  }

  goBack() {
    this.messageBoxService.show(
      { height: '90px', width: '160px', disableClose: true, position: {bottom: '40px', right: '40px'}},
      'Quit?'
    );
  }

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
      this.masterApiService.updateProduct(product).subscribe((result) => {
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
      this._location.back();
    }
  }
}
