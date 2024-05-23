// src/app/services/socket-io.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private socket: Socket = io();

  constructor(
    private userService: UserService
  ) {
  }

  public initSocket(key: string, callback: (msg: any) => void): void {
    const socketURL = "https://socket.dotb.cloud/";
    this.socket = io(socketURL, { path: "", transports: ["websocket"], reconnection: true });

    this.socket.on('connect', () => {
      console.log('Socket server is live!');
      this.socket.emit('join', key);
    });

    this.socket.on('error', () => {
      console.log('Cannot connect to socket server!');
    });

    this.socket.on('event-phenikaa', (msg) => {
      callback(msg);  // Call the passed callback function with the message
    });
  }}
