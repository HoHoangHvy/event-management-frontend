import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser?: User;
  constructor() { }
  setCurrentUser(user: User): void {
    this.currentUser = user;
  }
  getCurrentUser(): User | undefined {
    return this.currentUser;
  }
}
