import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }
  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  login(userData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/token', userData).pipe(
      tap((res: any) => {
        if (res.success) {
          const jwt = res.data.token;
          localStorage.setItem('jwtToken', jwt);
        }
      })
    );
  }
  public isAuthenticated(): boolean {
    try {
      let token = localStorage.getItem('jwtToken');
      console.log(token)
      if(token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      } else {
        return false;
      }
    } catch (error) {
      // If there's an error decoding the token, consider it as expired
      return true;
    }
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
