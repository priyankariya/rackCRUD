import { Injectable } from '@angular/core';

import { Rack } from './rack';
import { RACK_ITEMS } from './rack-data';
import { findIndex } from 'lodash';

@Injectable()
export class RackService{
private pitems = RACK_ITEMS;

  getProductsFromData(): Rack[]{
console.log(this.pitems);
return this.pitems;
  }

  addRack(rack: Rack) {
    this.pitems.push(rack);
    console.log(this.pitems);
  }

  updateRack(rack: Rack) {
    let index = findIndex(this.pitems,(p: Rack) => {
      return p.id === rack.id ;
    });
    this.pitems[index] = rack ;
  }

  deleteRack(rack: Rack) {
    this.pitems.splice(this.pitems.indexOf(rack),1);
    console.log(this.pitems);
  }

    /*getProductsFromService(): Rack[] {
  return[{
    id:1,
    name: 'Scissors',
    description: 'use to cut',
    price: 30
  }, {
    id:2,
    name: 'Knive',
    description: 'use to cut veggies',
    price: 40
  }, {
    id:3,
    name: 'Glass',
    description: 'use to take drinks',
    price: 50
  }]
}*/
}
