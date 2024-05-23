import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {Socket} from "ngx-socket-io";
import {NotificationResponse} from "../../models/NotificationResponse/notification-response";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient, private socket: Socket) { }
  getUnreadNoti():Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'api/notifications/unread', {headers})
  }

  getNotification(userId: string) {

  }
  private reloadNotificationsSubject = new Subject<void>();
  reloadNotifications$ = this.reloadNotificationsSubject.asObservable();

  reloadNotifications() {
    this.reloadNotificationsSubject.next();
  }

  triggerNewNotification() {

  }
}
