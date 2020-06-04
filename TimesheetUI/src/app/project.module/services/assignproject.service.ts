import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Assignproject } from '../models/assignproject';
import { User } from 'src/app/user.module/models/user';

@Injectable({
  providedIn: 'root'
})
export class AssignprojectService {
  url = 'http://localhost:54579/Api/AssignProject';
  constructor(private http: HttpClient) { }

  getAllProject(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + '/ProjectList');
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/UserList');
  }

  createProject(assignproject: Assignproject): Observable<Assignproject> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Assignproject>(this.url + '/InsertAssignProjectDetails/',
      assignproject, httpOptions);
  }

  deleteProjectById(id: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteAssignProjectDetails?id=' + id,
      httpOptions);
  }
}
