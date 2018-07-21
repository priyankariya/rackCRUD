import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarService } from './sidebar/sidebar.service';
import {MatIconModule, MatIconRegistry} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarMenuComponent,
    FooterComponent
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    MatIconRegistry,
    SidebarService
  ]
})
export class LayoutModule { }
