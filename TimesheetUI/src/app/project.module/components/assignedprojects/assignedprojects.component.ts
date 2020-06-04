import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.module/services/user.service';
import { User } from 'src/app/user.module/models/user';
import { Observable } from 'rxjs';
import { AssignprojectService } from '../../services/assignproject.service';
import { Assignproject } from '../../models/assignproject';

@Component({
  selector: 'app-assignedprojects',
  templateUrl: './assignedprojects.component.html',
  styleUrls: ['./assignedprojects.component.css']
})
export class AssignedprojectsComponent implements OnInit {
  projects: Project[]; 
  selectedCountry: number; 
  selectedUserName: string;
  assignprojectForm: any;  
  users: User[];
  dataSaved = false;  
  projectIdUpdate = null;  
  massage = null; 
  allProjects: Observable<Project[]>; 
  allAssignProjects: Observable<Assignproject[]>; 
   
  
  constructor(private formbulider: FormBuilder, private assignprojectService: AssignprojectService,
    private userService: UserService) {

    this.assignprojectService.getAllProject().subscribe(data => {this.projects = data,console.log(this.projects)},  
      error => console.log(error),  
      () => console.log('Get all projects'));  

      this.userService.getAllUser().subscribe(data => {this.users = data,console.log(this.users)},  
        error => console.log(error),  
        () => console.log('Get all users'));  
   }

  ngOnInit(){
    this.assignprojectForm = this.formbulider.group({  
      ProjectCode: ['', [Validators.required]],  
      ProjectName: ['', [Validators.required]],  
      NameOfIndustry: ['', [Validators.required]], 
      UserName: ['', [Validators.required]], 
      MobileNo: ['', [Validators.required]],  
    }); 
    this.loadAllProjects();  
  }

  onSubmit() {  
    console.log(this.selectedCountry);  
    alert(this.selectedCountry);  
} 

submitForm() {  
  this.dataSaved = false;  
  const project = this.assignprojectForm.value;  
  this.CreateProject(project);  
  this.assignprojectForm.reset();  
} 


loadAllProjects() {  
  this.allProjects = this.assignprojectService.getAllProject();  
} 

deleteProject(Id: string) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.assignprojectService.deleteProjectById(Id).subscribe(() => {  
    this.dataSaved = true;  
    this.massage = 'Record Deleted Succefully';  
    this.loadAllProjects();  
    this.projectIdUpdate = null;  
    this.assignprojectForm.reset();  

  });  
}  
}  

CreateProject(project: Assignproject) {  
  if (this.projectIdUpdate == null) {  
    this.assignprojectService.createProject(project).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
        this.loadAllProjects();  
        this.projectIdUpdate = null;  
        this.assignprojectForm.reset();  
      }  
    );  
  } 
}   

}
