import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';


import { SharedModule } from '../../../shared/shared.module';
import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { SectionCreateComponent } from './section-create/section-create.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { SectionUpdateComponent } from './section-update/section-update.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    SectionRoutingModule
  ],
  declarations: [
    SectionComponent,
    SectionCreateComponent,
    SectionFormComponent,
    SectionUpdateComponent
  ]
})
export class SectionModule {}
