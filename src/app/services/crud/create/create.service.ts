import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  createDetailData(moduleName: string | null, data: any):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.post(this.baseUrl + 'api/' + moduleName, data, {headers})
  }

}
