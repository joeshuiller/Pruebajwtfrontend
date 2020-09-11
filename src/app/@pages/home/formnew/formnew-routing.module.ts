import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormnewComponent } from './formnew.component';

const routes: Routes = [
  {
    path: '', component: FormnewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormnewRoutingModule { }
