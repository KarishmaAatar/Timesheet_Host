import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserService } from './user.module/services/user.service';
import {MatInputModule} from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatNativeDateModule } from '@angular/material/core';
import { UserComponent } from './user.module/components/user/user.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './user.module/components/home/home.component';
import {MatListModule} from '@angular/material/list';
import { ProjectComponent } from './project.module/components/project/project.component';
import { HourComponent } from './hours.module/components/hour/hour.component';
import { AssignedprojectsComponent } from './project.module/components/assignedprojects/assignedprojects.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ProjectComponent,
    HourComponent,
    AssignedprojectsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    ReactiveFormsModule,  
    HttpClientModule,  
    BrowserAnimationsModule,  
     MatButtonModule,  
     MatMenuModule,  
     MatDatepickerModule,  
     MatNativeDateModule,  
     MatIconModule,  
    MatRadioModule,  
     MatCardModule,  
     MatSidenavModule,  
     MatFormFieldModule,  
     MatInputModule,  
     MatTooltipModule,  
     MatToolbarModule,  
    AppRoutingModule,
    RouterModule,
    MatListModule
   
  ],
  
  providers: [HttpClientModule, UserService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
