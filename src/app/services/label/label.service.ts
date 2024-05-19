import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  globalLabelList: any = {
    Employees: {
      id: 'ID',
      name: 'Full Name',
      phone: 'Phone',
      empLevel: 'Emp Level',
      departmentId: 'Department',
      roleId: 'Role',
      gender: 'Gender',
      status: 'Status',
      dob: 'Birth Date',
      startDate: 'Start Date',
      email: 'Email',
    },
    Events: {
      id: 'ID',
      name: 'Event Name',
      description: 'Description',
      startDate: 'Start',
      endDate: 'End',
      status: 'Status',
      createdByName: 'Created by',
      approvedByName: 'Approved by',
      customerName: 'Customer',
    },
    Departments: {
      name: 'Department name',
      totalEmployee: 'Total employees',
    },
    Users: {
      userName: 'User Name',
      status: 'Status',
      roleName: 'Role Name',
      roleId: 'Role',
      employeeName: 'Employee',
    },
    Roles: {
      name: 'Role Name',
      dateEntered: 'Date Entered',
      totalUser: 'Total Users',
    },
    News: {
      name: 'Title',
      content: 'Content',
      type: 'Type'
    }
  }
  getFieldLabel(moduleName: string): any {
    return this.globalLabelList[moduleName] || {};
  }
  constructor() { }
}
