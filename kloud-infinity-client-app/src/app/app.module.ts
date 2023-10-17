import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { MainbodyComponent } from './components/mainbody/mainbody.component';
import { AddComponent } from './components/mainbody/bodyComponents/add/add.component';
import { MykloudComponent } from './components/mainbody/bodyComponents/mykloud/mykloud.component';
import { MyComputersComponent } from './components/mainbody/bodyComponents/my-computers/my-computers.component';
import { SharedWithMeComponent } from './components/mainbody/bodyComponents/shared-with-me/shared-with-me.component';
import { StarredComponent } from './components/mainbody/bodyComponents/starred/starred.component';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'


import {MatGridListModule} from '@angular/material/grid-list'
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogComponent } from './components/mainbody/bodyComponents/add/add-dialog/add-dialog.component';

import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewFileComponent } from './components/view-file/view-file.component';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AppAuthComponent } from './components/app-auth/app-auth.component';
import { AvatarModule } from 'ngx-avatar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ShareCompoComponent } from './components/view-file/share-compo/share-compo.component';
import { EditprofileComponent } from './components/header/editprofile/editprofile.component';
import {MatStepperModule} from '@angular/material/stepper';
import { SearchItemComponent } from './components/header/search-item/search-item.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort'
import {MatFormFieldModule} from '@angular/material/form-field';
import { TableComponentComponent } from './components/mainbody/bodyComponents/mykloud/table-component/table-component.component'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StarredTableComponent } from './components/mainbody/bodyComponents/starred/starred-table/starred-table.component'
import { NgToastModule } from 'ng-angular-popup';
import { SharedFilesTableComponent } from './components/mainbody/bodyComponents/shared-with-me/shared-files-table/shared-files-table.component';
import { SharedFileComponentComponent } from './components/mainbody/bodyComponents/mykloud/table-component/shared-file-component/shared-file-component.component';
import { SharedFileViewComponentComponent } from './components/mainbody/bodyComponents/shared-with-me/shared-files-table/shared-file-view-component/shared-file-view-component.component';
import {RecentComponentComponent} from './components/mainbody/bodyComponents/mykloud/table-component/recent-component/recent-component.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ISharedComponentsComponent } from './components/mainbody/bodyComponents/shared-with-me/ishared-components/ishared-components.component';
import { IsharedFileViewComponentsComponent } from './components/mainbody/bodyComponents/shared-with-me/ishared-components/ishared-file-view-components/ishared-file-view-components.component';
import { SharedToComponentsComponent } from './components/mainbody/bodyComponents/shared-with-me/ishared-components/shared-to-components/shared-to-components.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SidenavbarComponent,
    MainbodyComponent,
    AddComponent,
    MykloudComponent,
    MyComputersComponent,
    SharedWithMeComponent,
    StarredComponent,
    AddDialogComponent,
    ViewFileComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AppAuthComponent,
    ShareCompoComponent,
    EditprofileComponent,
    SearchItemComponent,
    TableComponentComponent,
    StarredTableComponent,
    SharedFilesTableComponent,
    SharedFileComponentComponent,
    SharedFileViewComponentComponent,
    RecentComponentComponent,
    ISharedComponentsComponent,
    IsharedFileViewComponentsComponent,
    SharedToComponentsComponent
   
    
    
  ]
  ,
  entryComponents:[MatDialogModule,AddDialogComponent]
  ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule,
    AvatarModule,
    MatExpansionModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgToastModule,
    MatCheckboxModule
    
  ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
