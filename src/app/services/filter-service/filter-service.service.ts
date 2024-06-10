import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
interface FilterDefinition {
  label: string;
  name: string;
  options: string[];
  defaultValue: string;
}
@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor() { }

  // Nếu bạn không có API và muốn giả lập dữ liệu
  getFilterDefinitionsMock(moduleName: string): Observable<FilterDefinition[]> {
    const mockData: { [key: string]: FilterDefinition[] } = {
      employees: [
        { label: 'Gender', name: 'gender', options: ['All', 'Male', 'Female'], defaultValue: 'All' },
        { label: 'Level', name: 'empLevel', options: ['All', 'Staff', 'Manager'], defaultValue: 'All' },
        { label: 'Status', name: 'status', options: ['All', 'Working', 'Stopped'], defaultValue: 'All' }
      ],
      contracts: [
        { label: 'Status', name: 'status', options: ['All', 'Deposited', 'Part Paid', 'Fully Paid', 'Draft', 'Completed'], defaultValue: 'All' }
      ],
      events: [
        { label: 'Status', name: 'status', options: ['All', 'Contracted', 'Approved', 'Wait for approval', 'Draft', 'Completed'], defaultValue: 'All' }
      ]
      // Thêm các module khác ở đây
    };
    return of(mockData[moduleName] || []);
  }
}
