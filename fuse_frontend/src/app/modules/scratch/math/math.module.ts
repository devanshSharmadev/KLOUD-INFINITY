import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MathRoutingModule } from './math-routing.module';
import { MathComponent } from './math.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MathComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MathRoutingModule
  ]
})
export class MathModule { }
