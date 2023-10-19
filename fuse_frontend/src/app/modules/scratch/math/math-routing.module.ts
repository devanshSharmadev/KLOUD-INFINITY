import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MathComponent } from './math.component';

const routes: Routes = [
  {
        path     : '',
        component: MathComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathRoutingModule { }
