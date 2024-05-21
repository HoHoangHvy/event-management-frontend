// src/app/services/socket-io.service.ts
import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import {NotificationResponse} from "../../models/NotificationResponse/notification-response";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private config: SocketIoConfig = {
    url: 'http://localhost:8080/ws',
    options: {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${this.getToken()}`
          }
        }
      }
    }
  };

  constructor(private socket: Socket) {
    this.socket = new Socket(this.config);
  }

  private getToken(): string {
    // Implement your logic to retrieve the token
    return localStorage.getItem('jwtToken') || '';
  }

  getNotification(userId: string) {
    return this.socket.fromEvent<NotificationResponse>(`/user/${userId}/topic/notifications`);
  }
}
