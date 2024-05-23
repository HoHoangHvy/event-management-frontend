import {ChangeDetectorRef, Component, HostListener, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Module } from 'src/app/models/module/module'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {brandSet, flagSet, freeSet} from '@coreui/icons';
import {IconSetService} from "@coreui/icons-angular";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user/user.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {SocketIoService} from "../../../services/SocketIO/socket-io.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss',
  providers: [IconSetService,MessageService,ClassToggleService,Router],
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  hideDropdown: boolean = false;
  showAdminSetting: boolean = this.userService.isAdmin();
  public icons!: [string, string[]][];
  public newNotifications = new Array(5)
  public moduleList: Module[];
  public displayModuleList: Module[];
  public restModuleList: Module[];
  showNotifications: boolean = false;
  haveUnreadNoti: boolean = false;
  unreadTotal: number = 0;
  subscription: Subscription;
  constructor(private classToggler: ClassToggleService,
              public iconSet: IconSetService,
              private cdr: ChangeDetectorRef,
              public router: Router,
              private toastr: ToastrService,
              private userService: UserService,
              private notificationService: NotificationService) {
    super();
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
    const moduleListJson = localStorage.getItem('moduleList');
    if (moduleListJson) {
      this.moduleList = JSON.parse(moduleListJson);
      let startPos = Math.floor((window.innerWidth * (2/3)) / 100);
      this.displayModuleList = this.moduleList.slice(0, startPos)
      this.restModuleList = this.moduleList.slice(startPos, this.moduleList.length);
    } else {
      this.moduleList = [];
      this.displayModuleList = [];
      this.restModuleList = [];
    }
    if(this.restModuleList.length == 0) this.hideDropdown = true;

    this.loadUnreadNoti();

    this.subscription = this.notificationService.reloadNotifications$.subscribe(() => {
      this.loadUnreadNoti();
    });
  }
  loadUnreadNoti() {
    this.notificationService.getUnreadNoti().subscribe(
      (res) => {
        if(res.data.listData.length > 0){
          this.haveUnreadNoti = true;
        }
        this.unreadTotal = res.data.listData.length;
        console.log(this.unreadTotal)
      }
    );
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Get the new inner width of the window
    const newInnerWidth = (event.target as Window).innerWidth;
    let startPos = Math.floor((newInnerWidth * (2/3)) / 100);
    this.displayModuleList = this.moduleList.slice(0,startPos)
    this.restModuleList = this.moduleList.slice(startPos, this.moduleList.length);
    this.hideDropdown = this.restModuleList.length == 0;
    this.cdr.detectChanges();
  }
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('moduleList');
    this.router.navigateByUrl('/login').then(() => {
      this.toastr.success('Logout successfully!', 'Success') ;
      window.location.reload();
    });
  }
  openNotification(event: Event) {
    event.preventDefault();  // Prevent the default action (navigation)
    // Your logic here
    this.showNotifications = !this.showNotifications;  // Toggle the visibility
    if (this.showNotifications) {
      this.notificationService.reloadNotifications();  // Trigger the reload
    }
  }
  protected readonly open = open;
}
