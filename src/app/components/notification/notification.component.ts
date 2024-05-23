import {Component, Input, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ListService} from "../../services/crud/list/list.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {LabelService} from "../../services/label/label.service";
import {FieldService} from "../../services/field/field.service";
import {MatTableDataSource} from "@angular/material/table";
import {DetailService} from "../../services/crud/detail/detail.service";
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  totalRecords: number = 0;
  notificationList: any;
  showEmptyLabel: boolean = false;
  subscription: Subscription | undefined;


  constructor(private listService: ListService,
              private router: Router,
              private detailService: DetailService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadNotifications()
    this.subscription = this.notificationService.reloadNotifications$.subscribe(() => {
      this.loadNotifications();
    });
  }

  loadNotifications() {
    this.listService.getListData('notifications').subscribe((res) => {
      this.notificationList = res.data.listData;
      this.totalRecords = res.data.listData.length;
      if(this.totalRecords === 0) {
        this.showEmptyLabel = true;
      }
    });
  }
  typeMap = {
    'News': '0',
    'Promotion': '1',
    'Event': '2',
  }
  redirectToParent(id: any, type: string, newsType: string, notiId: string) {
    let url = '';
    let index = 0;
    this.updateIsRead(notiId)
    if(type == 'News'){
      url = '/base/new-feed';
      switch (newsType) {
        case 'News':
          index = 1;
          break;
        case 'Promotion':
          index = 2;
          break;
        case 'Event':
          index = 3;
          break;
      }
    } else if(type == 'Request') url = '/base/detail/requests/' + id;
    this.router.navigate([url], { queryParams: { activeIndex:  index} });

  }
  updateIsRead(notiId: string) {
    this.detailService.updateDetailData('notifications', notiId, {isRead: true}).subscribe((res: any) => {
    });
  }
}
