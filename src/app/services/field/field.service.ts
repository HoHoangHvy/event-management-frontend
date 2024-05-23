import { Injectable } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {DetailService} from "../crud/detail/detail.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  relatedOptions: any;
  private columns: any = {
    employees: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: true,
        isDisabled: false,
        colSpan: '4'
      },
      {
        name: 'phone',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: true,
        isDisabled: false,
        colSpan: '4'
      },
      {
        name: 'empLevel',
        isSelect: true,
        isDate: false,
        isText: false,
        isDisabled: false,
        isRequired: false,
        colSpan: '4',
        options: [
          {value: "Staff", label: "Staff"},
          {value: "Manager", label: "Manager"},
          {value: "Internship", label: "Internship"}
        ]
      },
      {
        name: 'departmentId',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        isDisabled: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'roleId',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '4',
        isDisabled: !this.userService.isAdmin(),
        options: []
      },
      {
        name: 'gender',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        isDisabled: false,
        colSpan: '4',
        options: [
          {value: "Male", label: "Male"},
          {value: "Female", label: "Female"},
        ]
      },
      {
        name: 'status',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        isDisabled: false,
        colSpan: '4',
        options: [
          {value: "Stopped", label: "Stopped"},
          {value: "Working", label: "Working"}
        ]
      },
      {
        name: 'dob',
        isSelect: false,
        isDate: true,
        isText: false,
        isRequired: false,
        colSpan: '4',
        isDisabled: false,
      },
      {
        name: 'startDate',
        isSelect: false,
        isDate: true,
        isText: false,
        isRequired: true,
        colSpan: '4',
        isDisabled: false,
      },
      {
        name: 'email',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: true,
        colSpan: '4',
        isDisabled: false,
      },
    ],
    events: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isGroup: false,
        isDisabled: false,
        colSpan: '4'
      },
      {
        name: 'status',
        isSelect: true,
        isDate: false,
        isText: false,
        isGroup: false,
        isDisabled: false,
        options: [
          {value: "Draft", label: "Draft"},
          {value: "Contracted", label: "Contracted"},
          {value: "Wait for approval", label: "Wait for approval"},
          {value: "Preparing", label: "Preparing"},
          {value: "In progress", label: "In progress"},
          {value: "Completed", label: "Completed"},
        ],
        colSpan: '4'
      },
      {
        name: 'createdByName',
        isSelect: false,
        isDate: false,
        isText: true,
        isGroup: false,
        isDisabled: true,
        colSpan: '4'
      },
      {
        name: 'startEnd',
        isSelect: false,
        isDate: false,
        isText: false,
        isGroup: true,
        components: [
          {
            name: 'startDate',
            isSelect: false,
            isDate: true,
            isText: false,
            isDisabled: false,
            colSpan: '6'
          },
          {
            name: 'endDate',
            isSelect: false,
            isDate: true,
            isText: false,
            isDisabled: false,
            colSpan: '6'
          }
        ],
        isDisabled: false,
        colSpan: '4'
      },
      {
        name: 'approvedByName',
        isSelect: false,
        isDate: false,
        isGroup: false,
        isText: true,
        isDisabled: true,
        colSpan: '4'
      },
      {
        name: 'description',
        isSelect: false,
        isDate: false,
        isGroup: false,
        isText: true,
        isDisabled: false,
        colSpan: '12'
      },
      {
        name: 'customerName',
        isSelect: true,
        isDate: false,
        isText: false,
        isGroup: false,
        isDisabled: false,
        options: [],
        colSpan: '4'
      },
    ],
    departments: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isDisabled: false,
        colSpan: '6'
      }
    ],
    users: [
      {
        name: 'userName',
        isSelect: false,
        isDate: false,
        isText: true,
        isDisabled: false,
        colSpan: '4'
      },
      {
        name: 'status',
        isSelect: true,
        isDate: false,
        isText: false,
        isDisabled: false,
        colSpan: '4',
        options: [
          {value: "Active", label: "Active"},
          {value: "Inactive", label: "Inactive"}
        ]
      },
      {
        name: 'roleId',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'employeeName',
        isSelect: false,
        isDate: false,
        isText: true,
        isDisabled: true,
        colSpan: '4',
        options: []
      },
    ],
    roles: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
    ],
    news: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'type',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '4',
        options: [
          {value: "News", label: "Internal News"},
          {value: "Event", label: "Event"},
          {value: "Promotion", label: "Promotion"},
        ]
      },
      {
        name: 'content',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
    ],
    requests: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'type',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '4',
        options: [
          {value: "Absent", label: "Absent"},
          {value: "Promotion", label: "Promotion"},
          {value: "Other", label: "Other"},
        ]
      },
      {
        name: 'content',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'status',
        isSelect: true,
        isDate: false,
        isDisabled: true,
        isText: false,
        isRequired: false,
        colSpan: '4',
        options: [
          {value: "Wait for approval", label: "Wait for approval"},
          {value: "Approved", label: "Approved"},
          {value: "Rejected", label: "Rejected"},
        ]
      },
      {
        name: 'rejectReason',
        isSelect: false,
        isDate: false,
        isDisabled: true,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'approveDate',
        isSelect: false,
        isDate: false,
        isDisabled: true,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'approvedByName',
        isSelect: false,
        isDate: false,
        isDisabled: true,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
    ],
    requestdepartments: [
      {
        name: 'departmentId',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '6',
        options: []
      },
      {
        name: 'note',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '6',
        options: []
      },
    ],
    resources: [
      {
        name: 'name',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'totalQuantity',
        isSelect: false,
        isDate: false,
        isText: true,
        isRequired: false,
        colSpan: '4',
        options: []
      },
      {
        name: 'type',
        isSelect: true,
        isDate: false,
        isText: false,
        isRequired: false,
        colSpan: '4',
        options: [
          {value: "Room", label: "Room"},
          {value: "Document", label: "Document"},
          {value: "Facilities", label: "Facilities"},
        ]
      },
    ],

  };
  displayedColumns: any;
  constructor(private userService: UserService, private detailService: DetailService, private route: ActivatedRoute) { }

  private isNeedRelatedOptions(moduleName: string): boolean {
    let moduleList = ['employees', 'events', 'users', 'requestdepartments'];
    return moduleList.includes(moduleName);
  }

  async initColumns(moduleName: string): Promise<void> {
    await this.getRelatedOptions(moduleName);
    this.displayedColumns = this.getColumnsForModule(moduleName);
    if (this.isNeedRelatedOptions(moduleName)) {
      this.displayedColumns.forEach((column: any) => {
        if (column.isSelect && column.options.length == 0) {
          column.options = this.relatedOptions[column.name] || [];
        }
      });
    }
  }

  getColumnsForModule(moduleName: string): any {
    return this.columns[moduleName] || [];
  }

  getRelatedOptions(moduleName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.detailService.getRelatedOption(moduleName).subscribe(
        (res: any) => {
          this.relatedOptions = res.data;
          resolve(); // Resolve the promise once data is fetched
        },
        (error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }

  getFieldList(moduleName: string): Promise<any> {
    return this.initColumns(moduleName).then(() => {
      return this.displayedColumns;
    });
  }

  getColumnsForListView(moduleName: string): any {
    const columns: any = {
      employees: ['name', 'phone', 'empLevel', 'departmentName', 'gender', 'status', 'dob', 'startDate', 'email'],
      events: ['name', 'description', 'startDate', 'endDate', 'status', 'createdByName', 'approvedByName', 'customerName'],
      departments: ['name', 'totalEmployee'],
      users: ['userName', 'status', 'roleName', 'employeeName'],
      roles: ['name', 'dateEntered', 'totalUser'],
      requests: ['name', 'type', 'content', 'dateEntered', 'status', 'employeeName'],
      resources: ['name', 'type', 'dateEntered', 'totalQuantity'],
    };
    return columns[moduleName] || [];
  }
}
