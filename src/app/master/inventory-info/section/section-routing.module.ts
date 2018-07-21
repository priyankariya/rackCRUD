import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SectionComponent } from './section.component';
import { SectionCreateComponent } from './section-create/section-create.component';
import { SectionUpdateComponent } from './section-update/section-update.component';


const routes: Routes = [
  {
    path: '',
    component: SectionComponent
  },
  {
    path: 'add',
    component: SectionCreateComponent
  },
  {
    path: ':id/edit',
    component: SectionUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule {

}
