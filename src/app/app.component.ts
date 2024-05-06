import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {User} from "./models/user/user";
import {UserService} from "./services/user/user.service";
import {AuthServiceService} from "./services/Auth/auth-service.service";
import {ToastrService} from "ngx-toastr";
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
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
    private primengConfig: PrimeNGConfig
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
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
    // if(localStorage.getItem('jwtToken')) {
    //   this.authService.getMe().subscribe((res: any) => {
    //       let dobArray = res.data.user.employee.dob;
    //       let dobDate: Date = new Date(dobArray[0], dobArray[1] - 1, dobArray[2]);
    //       let startDateArray = res.data.user.employee.startDate;
    //       let startDate: Date = new Date(startDateArray[0], startDateArray[1] - 1, startDateArray[2]);
    //       let user = new User(res.data.user.id, res.data.user.employee.name,
    //         res.data.user.userName, res.data.user.status, dobDate,
    //         res.data.user.role, res.data.user.employee.email, res.data.user.employee.phone,
    //         res.data.user.employee.gender, res.data.user.employee.status, res.data.user.employee.id,
    //         res.data.user.employee.empLevel, res.data.user.employee.department, startDate);
    //       this.userService.setCurrentUser(user);
    //       localStorage.setItem('moduleList', JSON.stringify(res.data.moduleList));
    //
    //     },
    //     (errorCatcher) => {
    //       if (errorCatcher.status == 401) {
    //         this.router.navigateByUrl('/login');
    //         if (localStorage.getItem('jwtToken')) {
    //           this.toastr.error('Your token has expired', 'Unauthorized', {timeOut: 5000});
    //         }
    //       }
    //     });
    // } else {
    //   this.router.navigateByUrl('/login').then(() => {
    //     this.toastr.error('Please login before proceeding', 'Unauthorized', {timeOut: 5000});
    //   });
    // }
  }
}
