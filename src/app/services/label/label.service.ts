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
    dishes: {
      price: 'Price',
      cost: 'Cost',
      dateEntered: 'Date Entered',
      unit: 'Unit',
      name: 'Name',
    },
    thirdparties: {
      price: 'Price',
      cost: 'Cost',
      dateEntered: 'Date Entered',
      name: 'Name',
      type: 'Type',
      supplier: 'Supplier',
    },
    facilities: {
      price: 'Price',
      total: 'Total Quantity',
      dateEntered: 'Date Entered',
      name: 'Name',
      type: 'Type',
    },
    halls: {
      name: 'Hall Name',
      scale: 'Scale',
      location: 'Location',
      dateEntered: 'Date Entered',
      inUse: 'In Use',
    },
    customers: {
      name: 'Customer name',
      type: 'Type',
      dob: 'Date of brith',
      dateEntered: 'Date Entered',
      phone: 'Phone',
      email: 'Email',
    },
    contracts: {
      name: 'Contract name',
      type: 'Type',
      eventId: 'Event',
      expirationDate: 'Expiration Date',
      dateEntered: 'Date Entered',
      taxable: 'Taxable',
      terms: 'Terms',
      paymentTerm: 'Payment Term',
      status: 'Status',
      totalValue: 'Total Value',
      sumPaid: 'Sum Paid',
    },
    payments: {
      name: 'Payment name',
      type: 'Type',
      dateEntered: 'Date Entered',
      terms: 'Terms',
      paymentTerm: 'Payment Term',
      paymentMethod: 'Payment Method',
      status: 'Status',
      value: 'Value',
    },
  }
  getFieldLabel(moduleName: string): any {
    return this.globalLabelList[moduleName.toLowerCase()] || {};
  }
  constructor() { }
}
