import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = 'http://localhost:54579/Api/Project';
  constructor(private http: HttpClient) { }

  getAllProject(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + '/AllProjectDetails');
  }

  getProjectById(projectId: string): Observable<Project> {
    return this.http.get<Project>(this.url + '/GetProjectDetailsById/' + projectId);
  }

  createProject(project: Project): Observable<Project> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Project>(this.url + '/InsertProjectDetails/',
      project, httpOptions);
  }

  updateProject(project: Project): Observable<Project> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Project>(this.url + '/UpdateProjectDetails/',
      project, httpOptions);
  }

  deleteProjectById(projectid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteProjectDetails?id=' + projectid,
      httpOptions);
  }

   
    // GetAllProject(): Observable<Project[]> {
    //   return this.http.get<Project[]>(this.url + '/ProjectList');
    // }
}
