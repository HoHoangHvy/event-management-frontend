import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ListService} from "../../services/crud/list/list.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {LabelService} from "../../services/label/label.service";
import {FieldService} from "../../services/field/field.service";
import {AuthServiceService} from "../../services/Auth/auth-service.service";
import {MatSelectChange} from "@angular/material/select";
import {FilterServiceService} from "../../services/filter-service/filter-service.service";

interface EmpFilter {
  label:string;
  name:string;
  options:string[];
  defaultValue:string;
}

interface filterOption{
  name:string;
  value:string;
  isdefault:boolean;
}

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
  @Input() showBorder: any;

  totalRecords: number = 0;
  displayedColumns: any;
  dataSource: any;
  showTable: boolean = true;
  canCreate: boolean = true;
  labelList: any = {};
  filterDefs: EmpFilter[]=[];
  defaultValue = "All";
  filterDictionary= new Map<string,string>();

  genders: string[]=['All','Male','Female'];
  empLevel: string[]=['All','Staff','Manager'];
  status: string[]=['All','Working','Stopped'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private listService: ListService,
              private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private labelService: LabelService,
              private filterDefinitionService: FilterServiceService,
              private fieldService: FieldService,
              private authService: AuthServiceService) { }

  ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.moduleName);
    this.filterDefinitionService.getFilterDefinitionsMock(this.moduleName.toLowerCase()).subscribe((filters) => {
      this.filterDefs = filters;
      this.filterDefs.forEach(filter => {
        this.filterDictionary.set(filter.name, filter.defaultValue);
      });
    });
    this.displayedColumns = this.fieldService.getColumnsForListView(this.moduleName.toLowerCase());
    this.labelList = this.labelService.getFieldLabel(this.moduleName);
    this.canCreate = this.authService.checkUserPermission(this.moduleName, 'UPSERT');
    this.listService.getListData(this.moduleName.toLowerCase()).subscribe((res) => {
      const filteredData = this.filterData(res.data.listData);
      this.dataSource = new MatTableDataSource<any>(filteredData);
      this.totalRecords = filteredData.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showTable = this.totalRecords !== 0;

      this.dataSource.filterPredicate = (record: { [key: string]: unknown }, filter: string) => {
        const map = new Map(JSON.parse(filter));
        for (const [key, value] of map) {
          // @ts-ignore
          if (value !== "All" && record[key] !== value) {
            return false;
          }
        }
        return true;
      };
    });
  }
  applyEmpFilter(ob:MatSelectChange,empfilter:EmpFilter) {
    this.filterDictionary.set(empfilter.name, ob.value);
    this.dataSource.filter = JSON.stringify(Array.from(this.filterDictionary.entries()));
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
