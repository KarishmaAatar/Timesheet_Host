import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './user.module/components/home/home.component';
import { UserComponent } from './user.module/components/user/user.component';
import { ProjectComponent } from './project.module/components/project/project.component';
import { HourComponent } from './hours.module/components/hour/hour.component';
import { AssignedprojectsComponent } from './project.module/components/assignedprojects/assignedprojects.component';


const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'user', component: UserComponent },
{ path: 'project', component: ProjectComponent },
{ path: 'assignedprojects', component: AssignedprojectsComponent },
{ path: 'hour', component: HourComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
