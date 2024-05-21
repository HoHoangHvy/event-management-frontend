import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ListService} from "../../services/crud/list/list.service";
import {AuthServiceService} from "../../services/Auth/auth-service.service";

@Component({
  selector: 'app-new-feed',
  standalone: false,
  templateUrl: './new-feed.component.html',
  styleUrl: './new-feed.component.scss',
  providers: [AuthServiceService]
})
export class NewFeedComponent {
  @Input() filter: any;
  postList: any;
  totalRecords: any = 0;
  constructor(private listService: ListService,
              private router: Router,
              private authService: AuthServiceService) { }
  filterData(data: any) {
    if(this.filter){
      return data.filter((item: { [x: string]: any; }) => {
        return Object.keys(this.filter).every(key => item[key] === this.filter[key]);
      });
    } else {
      return data;
    }
  }
  ngOnInit() {
    this.listService.getListData('news').subscribe((res) => {
      this.totalRecords = res.data.listData.length;
      this.postList = this.filterData(res.data.listData);
    });
  }
}
