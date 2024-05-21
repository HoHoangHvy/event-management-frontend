import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {User} from "../../models/user/user";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http:HttpClient, private userService: UserService) { }
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
      'Content-Type': 'application/json',
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
  public async handleRefreshUserData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getMe().subscribe(
        (res: any) => {
          localStorage.setItem('moduleList', JSON.stringify(res.data.moduleList));
          this.processUserDetails(res.data.user);
          resolve();
        },
        (error) => {
          console.error('Error fetching user data:', error);
          reject();
        }
      );
    });
  }
  // public async handleRefreshUserData() {
  //   this.getMe().subscribe(
  //     (res: any) => {
  //         localStorage.setItem('moduleList', JSON.stringify(res.data.moduleList));
  //         this.processUserDetails(res.data.user);
  //     },
  //     (error) => {
  //       // Handle error while fetching user data
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }
  processUserDetails(userData: any) {
    const dobDate = userData.employee.dob ? new Date(userData.employee.dob[0], userData.employee.dob[1] - 1, userData.employee.dob[2]) : new Date();
    const startDate = userData.employee.startDate ? new Date(userData.employee.startDate[0], userData.employee.startDate[1] - 1, userData.employee.startDate[2]) : new Date();

    const user = new User(
      userData.id,
      userData.employee ? userData.employee.name : null,
      userData.userName,
      userData.status,
      dobDate,
      userData.role,
      userData.employee ? userData.employee.email : null,
      userData.employee ? userData.employee.phone : null,
      userData.employee ? userData.employee.gender : null,
      userData.employee ? userData.employee.status : null,
      userData.employee ? userData.employee.id : null,
      userData.employee ? userData.employee.empLevel : null,
      userData.employee ? userData.employee.department : null,
      startDate,
      userData.userName == 'admin'
    );
    localStorage.setItem('isAdmin', String(userData.userName == 'admin'));
    this.userService.setCurrentUser(user);
  }

  public checkUserPermission(moduleName: string, action: string): boolean {
    const currentUser: User | null = this.userService.getCurrentUser();
    if (!currentUser || !currentUser.role || !currentUser.role.permission) {
      return false;
    }

    const modulePermissions = currentUser.role.permission[moduleName];
    if (!modulePermissions) {
      console.error(`Module ${moduleName} not found in permissions`);
      return false;
    }
    if(action == 'APPROVE'){
      action = 'UPSERT';
      let isManagerOrAdmin = currentUser.isAdmin || currentUser.role.name == 'MANAGER';
      return isManagerOrAdmin && modulePermissions[action];
    }
    const hasPermission = modulePermissions[action];
    if (typeof hasPermission === 'undefined') {
      console.error(`Action ${action} not found in permissions for module ${moduleName}`);
      return false;
    }
    console.log(hasPermission)

    return hasPermission;
  }

}
