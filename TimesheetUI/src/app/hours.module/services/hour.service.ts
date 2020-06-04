import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hour } from '../models/hour';

@Injectable({
  providedIn: 'root'
})
export class HourService {
  url = 'http://localhost:54579/Api/Time';  
  constructor(private http: HttpClient) { }

  getAllLoginDetails(): Observable<Hour[]> {  
    return this.http.get<Hour[]>(this.url + '/AllLoginDetails');  
  } 

  getLoginDetailsById(auditId: string): Observable<Hour> {  
    return this.http.get<Hour>(this.url + '/GetLoginDetailsById/' + auditId);  
  } 
  
  createLogin(hour: Hour): Observable<Hour> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Hour>(this.url + '/InsertLoginDetails/',  
    hour, httpOptions);  
  } 
  
  updateLogin(hour: Hour): Observable<Hour> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Hour>(this.url + '/UpdateLoginDetails/',  
    hour, httpOptions);  
  }  

  deleteLoginById(auditid: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteLoginDetails?id=' +auditid,  
 httpOptions);  
  }  
}
