import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


import { MasterApiService } from '../../../shared/services/api/master-api.service';
import { UtilityService } from '../../../shared/services/utility.service';
import { CoreService } from '../../../core/core.service';

import { Rack } from './rack';
import { RackService } from './rack.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-rack',
  templateUrl: 'rack.component.html',
  styleUrls: ['rack.component.scss']
})
export class RackComponent implements OnInit{

  racks: Rack[];
  rackForm: boolean = false;
  isNewForm: boolean;
  newRack: any = {};
  editRackForm: boolean = false;
  editedRack: any = {};

constructor( private _rackService: RackService ){ }

ngOnInit( ) {
    this.getProducts();
  }

  getProducts( ) {
  this.racks = this._rackService.getProductsFromData();
  }

  showEditRackForm(rack: Rack) {
  if ( !rack ) {
    this.rackForm = false;
    return;
  }
  this.editRackForm = true;
  this.editedRack = _.clone(rack);
  }

  showAddRackForm() {
  //resets form if edited rack
  if (this.racks.length) {
    this.newRack = [];
  }
  this.rackForm = true;
  this.isNewForm = true;
  }


  saveRack(rack: Rack) {
  if (this.isNewForm) {
    //add a new product
    this._rackService.addRack(rack);
  } //else {
    //update the product
  //}
  this.rackForm = false;
  }

  updateRack() {
  this._rackService.updateRack(this.editedRack);
  // this.addRackForm = false;
  this.editedRack = {};
  }

  removeRack(rack: Rack) {
  this._rackService.deleteRack(rack);
  }
  cancelEdits () {
    this.editedRack = {};
    // this.addRackForm = false;

  }

/*rackDataStreamCallback = this.rackDataStream.bind(this);

   @ViewChild('autoComplete') autoComplete;
   reloadList = false;

   constructor(
     private _location: Location,
     private router: Router,
     private activatedRoute: ActivatedRoute,
     private masterApiService: MasterApiService,
     private coreService: CoreService
   ) { }

   @HostListener('document:keydown', ['$event']) onKeyDown(e) {
     e.preventDefault();
     UtilityService.keyDown(
       e, this.addRack.bind(this), this.editRack.bind(this), this.deleteRack.bind(this), this.goBack.bind(this)
     );
   }

   goBack() {
     this._location.back();
   }

   userPermissions(value) {
     return this.coreService.userPermitted(value);
   }

   addRack() {
     if (this.userPermissions([13])) {
       this.router.navigate(['add'], {relativeTo: this.activatedRoute}).then(() => {});
     }
   }

   editRack() {
     if (this.userPermissions([15])) {
       this.router.navigate([this.autoComplete.focusedElement.id + '/edit'], { relativeTo: this.activatedRoute }).then(() => {});
     }
   }

   deleteRack() {
     if (this.userPermissions([16])) {
       this.reloadList = false;
       this.masterApiService.deleteRack(this.autoComplete.focusedElement.id).subscribe(() => {
         this.reloadList = true;
       });
     }
   }

   onAutoCompleteSelect(item) {
     if (this.userPermissions([14])) {}
     // statements here...
   }

   rackDataStream(searchParams) {
     return this.masterApiService.listRack(searchParams);
   } */
}
