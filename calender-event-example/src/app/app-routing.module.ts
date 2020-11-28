import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

const routes: Routes = [
  { path: 'add', component: AddEditEventComponent },
  { path: 'edit:/id', component: AddEditEventComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
