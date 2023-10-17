import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/mainbody/bodyComponents/add/add.component';
import { MykloudComponent } from './components/mainbody/bodyComponents/mykloud/mykloud.component';
import { MyComputersComponent } from './components/mainbody/bodyComponents/my-computers/my-computers.component';
import { SharedWithMeComponent } from './components/mainbody/bodyComponents/shared-with-me/shared-with-me.component';
import { StarredComponent } from './components/mainbody/bodyComponents/starred/starred.component';
import {ViewFileComponent} from './components/view-file/view-file.component'

import {LoginComponent} from './components/login/login.component'
import {SignupComponent} from './components/signup/signup.component'
import { AuthGuard } from './authService/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:MykloudComponent,
    pathMatch:'full'
    

  },
  {
    path:'login',
    component:LoginComponent,
    outlet:"LandingPage"
  },
  {
    path:'signup',
    component:SignupComponent,
    outlet:"LandingPage"
    
  },
  {
    path:'add',
    component:AddComponent,


  },
  {
    path:'myComputers',
    component:MyComputersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'sharedWithMe',
    component:SharedWithMeComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path:'Starred',
    component:StarredComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'viewFile/:fileName', 
    component: ViewFileComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
