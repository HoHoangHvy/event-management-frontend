import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ListService} from "../../services/crud/list/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
  standalone: false
})
export class ListViewComponent {
  constructor(private listService: ListService, private route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer, private router: Router) { }
  totalRecords: number = 0;
  moduleName: string | null = '';
  displayedColumns: any;
  dataSource: any;
  labelList: any = {};
  showTable: boolean = true;

  globalLabelList: any = {
    Employees: {
      id: 'ID',
      name: 'Full Name',
      phone: 'Phone',
      empLevel: 'Emp Level',
      departmentName: 'Department',
      gender: 'Gender',
      status: 'Status',
      dob: 'Birth Date',
      startDate: 'Start Date',
      email: 'Email',
    }
  }
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('moduleName'));
    this.displayedColumns = this.getColumnsForModule(this.moduleName);
    this.labelList = this.globalLabelList[this.moduleName] || {};
    this.listService.getListData(this.route.snapshot.paramMap.get('moduleName')).subscribe((res) => {
      console.log(res.data.listData.reverse())
      this.dataSource = new MatTableDataSource<any>(res.data.listData);
      this.totalRecords = res.data.totalData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.totalRecords == 0) {
        this.showTable = false;
      }
    });
  }
  capitalizeFirstLetter(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  getColumnsForModule(moduleName: string): any {
    const columns: any = {
      Employees: ['name', 'phone', 'empLevel', 'departmentName', 'gender', 'status', 'dob', 'startDate', 'email'],
    };

    return columns[moduleName] || [];
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
}
