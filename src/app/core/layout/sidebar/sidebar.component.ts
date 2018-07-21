import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus = [];

  disableMenu = false;
  disableConfiguration = false;
  disableFeatures = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.menus.subscribe((menus) => {
      this.menus = menus;
    });
    this.sidebarService.clearMenus.subscribe((status) => {
      if (status) {
        this.menus = [];
      }
    });
    this.sidebarService.disableConfiguration.subscribe((status) => {
      this.disableConfiguration =  status;
    });
    this.sidebarService.disableFeatures.subscribe((status) => {
      this.disableFeatures =  status;
    });
  }
}
