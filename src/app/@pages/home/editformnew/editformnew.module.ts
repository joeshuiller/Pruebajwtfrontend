import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { EditformnewRoutingModule } from './editformnew-routing.module';
import { EditformnewComponent } from './editformnew.component';


@NgModule({
  declarations: [EditformnewComponent],
  imports: [
    CommonModule,
    EditformnewRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class EditformnewModule { }
