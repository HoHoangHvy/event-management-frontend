import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {ListService} from "../../services/crud/list/list.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MessageService} from "primeng/api";
import {LabelService} from "../../services/label/label.service";
import {FieldService} from "../../services/field/field.service";

@Component({
  selector: 'app-record-list-view',
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss',
  standalone: false
})
export class RecordListComponent implements OnInit {
  @Input() moduleName: string | null = '';
  @Input() columnConfig: any;
  @Input() showHeader: Boolean = true;
  @Input() filter: any;

  totalRecords: number = 0;
  displayedColumns: any;
  dataSource: any;
  showTable: boolean = true;
  labelList: any = {};

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private listService: ListService, private _liveAnnouncer: LiveAnnouncer, private router: Router, private messageService: MessageService, private labelService: LabelService, private fieldService: FieldService) { }

  ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.moduleName);
    this.displayedColumns = this.fieldService.getColumnsForListView(this.moduleName.toLowerCase());
    this.labelList = this.labelService.getFieldLabel(this.moduleName);
    this.listService.getListData(this.moduleName.toLowerCase()).subscribe((res) => {
      this.dataSource = new MatTableDataSource<any>(this.filterData(res.data.listData));
      this.totalRecords = res.data.totalData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.totalRecords === 0) {
        this.showTable = false;
      }
    });
  }
  filterData(data: any) {
    if(this.filter){
      return data.filter((item: { [x: string]: any; }) => {
        return Object.keys(this.filter).every(key => item[key] === this.filter[key]);
      });
    } else {
      return data;
    }
  }
  matchFilter(data: any): boolean{
    data.some((item: { [x: string]: any; })  => {
      return Object.keys(this.filter).every(key => item[key] === this.filter[key]);
    })
    return false;
  }
  capitalizeFirstLetter(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  navigateToDetail(row: any) {
    this.router.navigateByUrl(`/base/detail/${this.moduleName?.toLowerCase()}/${row.id}`);
  }

  navigateToCreate() {
    this.router.navigateByUrl(`/base/create/${this.moduleName?.toLowerCase()}`);
  }
}
