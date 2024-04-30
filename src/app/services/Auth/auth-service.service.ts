import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }
  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  login(userData: any):Observable<any> {
    return this.http.post(this.baseUrl + 'auth/token', userData);
  }

  getMe():Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'auth/me', {headers})
      .pipe(
        tap((user) => {
          const currentState = this.authSubject.value;
          this.authSubject.next({...currentState, user});
        })
      );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.authSubject.next({
      user: null
    });
  }
}
