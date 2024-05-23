import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  globalLabelList: any = {
    employees: {
      id: 'ID',
      name: 'Full Name',
      phone: 'Phone',
      empLevel: 'Emp Level',
      departmentName: 'Department',
      departmentId  : 'Department',
      roleId: 'Role',
      gender: 'Gender',
      status: 'Status',
      dob: 'Birth Date',
      startDate: 'Start Date',
      email: 'Email',
    },
    events: {
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
    departments: {
      name: 'Department name',
      totalEmployee: 'Total employees',
    },
    users: {
      userName: 'User Name',
      status: 'Status',
      roleName: 'Role Name',
      roleId: 'Role',
      employeeName: 'Employee',
    },
    roles: {
      name: 'Role Name',
      dateEntered: 'Date Entered',
      totalUser: 'Total Users',
    },
    news: {
      name: 'Title',
      content: 'Content',
      type: 'Type'
    },
    requests: {
      name: 'Title',
      content: 'Content',
      type: 'Type',
      dateEntered: 'Date Entered',
      status: 'Status',
      employeeName: 'Employee Name',
      approvedByName: 'Approved By',
      rejectReason: 'Reject reason',
      approveDate: 'Approve date',
    },
    requestdepartments: {
      content: 'Content',
      type: 'Type',
      dateEntered: 'Date Entered',
      status: 'Status',
      departmentName: 'Department',
      departmentId: 'Department',
      note: 'Note',
      response: 'Response',
      rejectReason: 'Reject reason',
      approveDate: 'Approve date',
    },
    resources: {
      totalQuantity: 'Total Quantity',
      type: 'Type',
      dateEntered: 'Date Entered',
      status: 'Status',
      name: 'Name',
    },
  }
  getFieldLabel(moduleName: string): any {
    return this.globalLabelList[moduleName.toLowerCase()] || {};
  }
  constructor() { }
}
