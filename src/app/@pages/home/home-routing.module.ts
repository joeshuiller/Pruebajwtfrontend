import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:[
      {
        path: '',
        redirectTo: 'contenido',
        pathMatch: 'full'
      },
      {
        path: 'contenido',
        loadChildren: () => import('./content/content.module').then( m => m.ContentModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./formnew/formnew.module').then( m => m.FormnewModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./editformnew/editformnew.module').then( m => m.EditformnewModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
