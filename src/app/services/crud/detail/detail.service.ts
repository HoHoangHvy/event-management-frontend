import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }
  getDetailData(moduleName: string | null, id: string | null):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'api/' + moduleName + '/' + id, {headers})
  }

  updateDetailData(moduleName: string | null, id: string | null, data: any):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.put(this.baseUrl + 'api/' + moduleName + '/' + id, data, {headers})
  }

  deleteDetailData(moduleName: string | null, id: string | null):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.delete(this.baseUrl + 'api/' + moduleName + '/' + id, {headers})
  }

  getRelatedOption(moduleName: string | null, id: string | null):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'api/related/' + moduleName + '/' + id, {headers})
  }
}
