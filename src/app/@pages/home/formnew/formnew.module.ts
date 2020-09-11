import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormnewRoutingModule } from './formnew-routing.module';
import { FormnewComponent } from './formnew.component';


@NgModule({
  declarations: [FormnewComponent],
  imports: [
    CommonModule,
    FormnewRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class FormnewModule { }
