import { Component, ViewChild } from '@angular/core';
import { EventSettingsModel, PopupOpenEventArgs, ScheduleComponent } from "@syncfusion/ej2-angular-schedule";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListService } from "../../services/crud/list/list.service";
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {CreateService} from "../../services/crud/create/create.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-booking-schedule',
  templateUrl: './booking-schedule.component.html',
  styleUrls: ['./booking-schedule.component.scss']
})
export class BookingScheduleComponent {
  public selectedDate: Date = new Date();
  public views: Array<string> = ['TimelineDay', 'Day', 'Week', 'Month'];
  public eventSettings: EventSettingsModel = {};
  public resourceData: Object[] = [];
  public showQuickInfo: boolean = false;
  public startDate!: Date;
  public endDate!: Date;
  public bookingModel: any = {};
  public tempStart: any;
  public tempEnd: any;

  @ViewChild('scheduleObj')
  public scheduleObj?: ScheduleComponent;
  constructor(private http: HttpClient,
              private listService: ListService,
              private userService: UserService,
              private messageService: MessageService,
              private createService: CreateService) {}

  ngOnInit() {
    this.fetchEventData();
  }

  private fetchEventData() {
    this.listService.getListData('resource-bookings').subscribe((res) => {
      this.eventSettings = {
        dataSource: this.formatScheduleData(res.data),
      };
    });
  }
  formatScheduleData(data: any){
    return data.map((item: any) => {
      return {
        Id: item.id,
        Subject: item.resourceName + " - " + item.employeeName,
        StartTime: new Date(item.startDate),
        EndTime: new Date(item.endDate),
        ResourceId: item.resourceId,
        Quantity: item.quantity,
        Description: item.reason
      }
    })
  }
  public startDateParser(data: string) {
    if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    return new Date();
  }

  public endDateParser(data: string) {
    if (isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.endDate)) {
      return new Date(this.endDate);
    }
    return new Date();
  }

  public onDateChange(args: ChangeEventArgs): void {
    if (!isNullOrUndefined(args.event as any)) {
      if (args.element.id === "StartTime") {
        this.startDate = args.value as Date;
        this.tempStart = this.startDate;
      } else if (args.element.id === "EndTime") {
        this.endDate = args.value as Date;
        this.tempEnd = this.endDate;
      }
    }
    this.fetchResourceData(this.tempStart, this.tempEnd);
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      const saveButton: HTMLElement = args.element.querySelector('#Save') as HTMLElement;
      const cancelButton: HTMLElement = args.element.querySelector('#Cancel') as HTMLElement;
      saveButton.onclick = () => {
        this.onSaveButtonClick(args);
      }
      cancelButton.onclick = () => {
        this.scheduleObj?.closeEditor();
      };
      this.bookingModel = args.data;
      this.tempStart = this.bookingModel.StartTime;
      this.tempEnd = this.bookingModel.EndTime;
      this.fetchResourceData(this.tempStart, this.tempEnd);
    }
  }
  onSaveButtonClick(args: PopupOpenEventArgs) {
    if(this.formValidation()){
      let createObject = {
        resourceId: this.bookingModel.ResourceId,
        startDate: this.bookingModel.StartTime,
        endDate: this.bookingModel.EndTime,
        quantity: this.bookingModel.Quantity,
        reason: this.bookingModel.Description
      }
      this.createService.createDetailData('resource-bookings', createObject).subscribe((res) => {
        this.scheduleObj?.closeEditor();
        this.messageService.add({ severity: 'success', summary: 'Successfully booking!', detail: 'Your booking request has been processed check at Requests', key: 'success'});
        this.fetchEventData();
      });
    }
  }
  private fetchResourceData(startTime: Date, endTime: Date) {
    let jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`
    });
    startTime.setHours(startTime.getHours() + 7);
    endTime.setHours(endTime.getHours() + 7);
    console.log(`http://localhost:8080/api/resources/available?startDate=${startTime.toISOString()}&endDate=${endTime.toISOString()}`)
    this.http.get<any>(`http://localhost:8080/api/resources/available?startDate=${startTime.toISOString()}&endDate=${endTime.toISOString()}`, { headers }).subscribe(res => {
      this.resourceData = this.formatOptionValue(res.data.listData);
    });
  }
  public fields: object = { text: 'text', value: 'id' };
  private formatOptionValue(data: any) {
    return data.map((item: any) => {
      return { text: item.name + " (Available: " + item.availableQuantity + ")", id: item.id , available: item.availableQuantity};
    });
  }

  private formValidation(){
    if(this.bookingModel.StartTime === undefined
      || this.bookingModel.EndTime === undefined
      || this.bookingModel.ResourceId === undefined
      || this.bookingModel.Description === undefined
      || this.bookingModel.Quantity === undefined){
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Missing required field' });
      return false;
    }
    if(this.bookingModel.ResourceId ){
      // @ts-ignore
      this.resourceData.forEach((item: any) => {
        console.log(item.id, this.bookingModel.ResourceId, item.available, this.bookingModel.Quantity)
        if(item.id === this.bookingModel.ResourceId && item.available < this.bookingModel.Quantity){
          this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Resource is not enough' });
          return false;
        }
      })
    }
    return true;
  }
}
