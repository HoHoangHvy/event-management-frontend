import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }
  getListData(moduleName: string | null):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'api/' + moduleName, {headers})
  }

}
