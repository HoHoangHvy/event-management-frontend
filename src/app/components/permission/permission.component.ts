import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-permission',
  standalone: false,
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent implements OnChanges {
  @Input() permissionModel: { [key: string]: any } = {};

  displayModule: { [key: string]: { UPSERT: boolean, VIEW: boolean, DELETE: boolean } } = {
    "Employees": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Notifications": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Requests": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Resources": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "News": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Departments": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Contracts": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Payments": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Events": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Tasks": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Dishes": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Thirdparties": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Facilities": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Customers": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "ResourceBooking": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "EventBooking": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Halls": { "UPSERT": false, "VIEW": false, "DELETE": false }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['permissionModel'] && changes['permissionModel'].currentValue) {
      this.mapPermissions();
    }
  }

  mapPermissions() {
    for (const moduleKey of Object.keys(this.displayModule)) {
      if (this.permissionModel.hasOwnProperty(moduleKey)) {
        this.displayModule[moduleKey] = this.permissionModel[moduleKey];
      }
    }
  }
  getModules() {
    return Object.keys(this.displayModule);
  }
}
