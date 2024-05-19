import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubpanelService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }
  subpanelLink: any = {
    departments: '/departments/related-employees/'
  }
  getSubpanelData(moduleName: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + this.subpanelLink[moduleName] + id, {headers})
  }

}
