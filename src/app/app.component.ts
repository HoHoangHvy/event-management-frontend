import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {UserService} from "./services/user/user.service";
import {AuthServiceService} from "./services/Auth/auth-service.service";
import {ToastrService} from "ngx-toastr";
import { PrimeNGConfig } from 'primeng/api';
import {NotificationResponse} from "./models/NotificationResponse/notification-response";
import {NotificationService} from "./services/notification/notification.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'CoreUI Free Angular Admin Template';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private authService: AuthServiceService,
    private userService: UserService,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig,
    private notificationService: NotificationService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }
  notifications: NotificationResponse[] = [];
  userId : string = this.userService.getId();
  ngOnInit(): void {
    this.notificationService.getNotification(this.userId).subscribe((notification) => {
      console.log(notification);
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
