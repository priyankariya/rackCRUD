import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { JournalComponent } from './journal.component';
import { JournalCreateComponent } from './journal-create/journal-create.component';
import { JournalUpdateComponent } from './journal-update/journal-update.component';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent
  },
  {
    path: 'create',
    component: JournalCreateComponent
  },
  {
    path: ':id/edit',
    component: JournalUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
