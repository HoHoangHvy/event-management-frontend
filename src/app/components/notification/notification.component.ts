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


  constructor(private listService: ListService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private messageService: MessageService, private labelService: LabelService, private fieldService: FieldService) { }

  ngOnInit() {
    this.listService.getListData('notifications').subscribe((res) => {
      this.notificationList = res.data.listData;
      this.totalRecords = res.data.listData.length;
      console.log(this.notificationList)
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
  redirectToParent(id: any, type: string, newsType: string) {
    let url = '';
    let index = 0;

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
    } else if(type == 'Request') url = '/base/update/requests/' + id;
    console.log(url)
    this.router.navigate([url], { queryParams: { activeIndex:  index} });

  }
}
