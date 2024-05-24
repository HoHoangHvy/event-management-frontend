import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {UserService} from "./services/user/user.service";
import {AuthServiceService} from "./services/Auth/auth-service.service";
import {ToastrService} from "ngx-toastr";
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {NotificationResponse} from "./models/NotificationResponse/notification-response";
import {NotificationService} from "./services/notification/notification.service";
import {SocketIoService} from "./services/SocketIO/socket-io.service";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVF0WmFZfVpgdV9EaFZUQWY/P1ZhSXxXdkBhWn5dcnxQQGVVUkI=');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Internal Management System - Winx';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private userService: UserService,
    private primengConfig: PrimeNGConfig,
    private notificationService: NotificationService,
    private socketIOService: SocketIoService,
    private messageService: MessageService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }
  notifications: NotificationResponse[] = [];
  userId : string = this.userService.getId();
  ngOnInit(): void {'' +
    this.socketIOService.initSocket('/notifications/HoHoangHvy/' + this.userService.getId(),
      (msg) => {
        this.messageService.add({severity:'info', summary:msg.name, detail:msg.content});
        this.notificationService.reloadNotifications()
      });
    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

  }


}
