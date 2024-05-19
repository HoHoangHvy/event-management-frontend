import {Component, Input} from '@angular/core';
import {CreateService} from "../../services/crud/create/create.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {FieldService} from "../../services/field/field.service";
import {LabelService} from "../../services/label/label.service";
import {ListService} from "../../services/crud/list/list.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-new-feed',
  standalone: false,
  templateUrl: './new-feed.component.html',
  styleUrl: './new-feed.component.scss'
})
export class NewFeedComponent {
  @Input() filter: any;
  postList: any;
  totalRecords: any = 0;
  createPost() {
    this.router.navigateByUrl('base/create/news');
  }
  constructor(private listService: ListService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private messageService: MessageService, private labelService: LabelService, private fieldService: FieldService) { }
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
