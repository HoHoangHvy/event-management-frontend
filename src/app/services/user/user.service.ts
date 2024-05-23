import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/';
  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();
  constructor(private httpClient: HttpClient) { }

  setCurrentUser(user: User): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
  getId(): string {
    return <string>this.currentUser.value?.userId;
  }
  isAdmin(): boolean {
    return <boolean>this.currentUser.value?.isAdmin;
  }

  updateEmployee(user: User) : Observable<Object> {
    debugger
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    let url = this.baseUrl + `api/employees/${user.empId}`;
    let empUpdateRequest = {
      phone: user.phone,
      dob : user.dob,
      email: user.email,
    }
    return this.httpClient.put(url, empUpdateRequest, {headers});
  }
  changePassword(oldPassword: any, newPassword: any) : Observable<Object> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    let url = this.baseUrl + `auth/change-password`;
    let changePasswordRequest = {
      id: this.currentUser.value?.userId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.httpClient.post(url, changePasswordRequest, {headers});
  }

}
