import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditformnewComponent } from './editformnew.component';

const routes: Routes = [
  {
    path: '', component: EditformnewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditformnewRoutingModule { }
