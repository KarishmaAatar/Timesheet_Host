import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  dataSaved = false;  
  projectForm: any;  
  allProjects: Observable<Project[]>;  
  projectIdUpdate = null;  
  massage = null;  

  
  constructor(private formbulider: FormBuilder, private projectService:ProjectService) {
    
   } 
   
 
  
  ngOnInit() {  
    this.projectForm = this.formbulider.group({  
      ProjectCode: ['', [Validators.required]],  
      ProjectName: ['', [Validators.required]],  
      NameOfIndustry: ['', [Validators.required]],  
    });  
    this.loadAllProjects();  
  }  
  loadAllProjects() {  
    this.allProjects = this.projectService.getAllProject();  
  }  
  submitForm() {  
    this.dataSaved = false;  
    const project = this.projectForm.value;  
    this.CreateProject(project);  
    this.projectForm.reset();  
  }  
  loadProjectToEdit(projectId: string) {  
    this.projectService.getProjectById(projectId).subscribe(project=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.projectIdUpdate = project.ProjectId;  
      this.projectForm.controls['ProjectCode'].setValue(project.ProjectCode);  
      this.projectForm.controls['ProjectName'].setValue(project.ProjectName);  
      this.projectForm.controls['NameOfIndustry'].setValue(project.NameOfIndustry);  
    });  
  
  }  
  CreateProject(project: Project) {  
    if (this.projectIdUpdate == null) {  
      this.projectService.createProject(project).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllProjects();  
          this.projectIdUpdate = null;  
          this.projectForm.reset();  
        }  
      );  
    } else {  
      project.ProjectId = this.projectIdUpdate;  
      this.projectService.updateProject(project).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllProjects();  
        this.projectIdUpdate = null;  
        this.projectForm.reset();  
      });  
    }  
  }   
  deleteProject(projectId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.projectService.deleteProjectById(projectId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllProjects();  
      this.projectIdUpdate = null;  
      this.projectForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.projectForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  

}
