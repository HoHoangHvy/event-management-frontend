import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Socket} from "ngx-socket-io";
import {NotificationResponse} from "../../models/NotificationResponse/notification-response";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http:HttpClient, private socket: Socket) { }
  getListData(moduleName: string | null):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get(this.baseUrl + 'api/' + moduleName, {headers})
  }

  getNotification(userId: string) {
    console.log(`/user/${userId}/topic/notifications`)
    return this.socket.fromEvent<NotificationResponse>(`/user/${userId}/topic/notifications`);
  }
}
