import {Component, ElementRef, ViewChild} from '@angular/core';
import { EventSettingsModel, PopupOpenEventArgs, ScheduleComponent } from "@syncfusion/ej2-angular-schedule";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListService } from "../../services/crud/list/list.service";
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {CreateService} from "../../services/crud/create/create.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";
interface Facility {
  text: string;
  id: string;
  availableQuantity: number;
  price: number;
}

interface EventDetail {
  selected: boolean;
  selectValue: string;
  price: number;
  quantityValue: number;
  totalValue: number;
}
@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss']
})
export class EventBookingComponent {
  public selectedDate: Date = new Date();
  public views: Array<string> = ['TimelineDay', 'Day', 'Week', 'Month'];
  public eventSettings: EventSettingsModel = {};
  public hallData: Object[] = [];
  public customerData: Object[] = [];
  public facilityData: Facility[] = [];
  public showQuickInfo: boolean = false;
  public startDate!: Date;
  public endDate!: Date;
  public bookingModel: any = {};
  public tempStart: any;
  public checkAll: any;
  public tempEnd: any;
  public currentPage: number = 1;
  eventDetails: EventDetail[] = [
    { selected: false, selectValue: '', price: 0, quantityValue: 0, totalValue: 0}
  ];
  public eventTypes: any =  [
    { text: 'Meeting', id: 'Meeting' },
    { text: 'Birthday', id: 'Birthday' },
    { text: 'Wedding', id: 'Wedding' },
    { text: 'Party', id: 'Party' },
    { text: 'Others', id: 'Others' },
  ];
  public headerList: any = {
    1: 'Booking Event',
    2: 'Facility Details',
    3: 'Dishes Details',
    4: 'Thirdparty Details',
  }
  @ViewChild('scheduleObj')
  public scheduleObj?: ScheduleComponent;
  constructor(private http: HttpClient,
              private listService: ListService,
              private userService: UserService,
              private messageService: MessageService,
              private createService: CreateService) {}
  @ViewChild('editorHeader') editorHeader: ElementRef | undefined;

  ngOnInit() {
    this.fetchEventData();
  }

  removeSelectedRows() {
    this.checkAll = false;
    this.eventDetails = this.eventDetails.filter(detail => !detail.selected);
  }

  nextPage() {
    if (this.currentPage < 2) {
      this.currentPage++;
    }
    this.changeEditorHeader(this.headerList[this.currentPage]);
  }
  toggleCheckAll() {
    this.checkAll = !this.checkAll;
    this.eventDetails.forEach(detail => {
      detail.selected = this.checkAll;
    });
  }
  changeEditorHeader(newContent: string) {
    // @ts-ignore
    this.editorHeader.nativeElement.innerText = newContent;
  }
  // Thêm hàng vào bảng chi tiết sự kiện
  addRow() {
    // @ts-ignore
    this.eventDetails.push({ selectValue: '', inputValue: '', quantityValue: 0, totalValue: 0 });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changeEditorHeader(this.headerList[this.currentPage]);
    }
  }
  getOptions(startTime: Date, endTime: Date) {
    let jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`
    });
    this.http.get<any>(`http://localhost:8080/api/related/events`, { headers }).subscribe(res => {
      this.customerData = res.data.customerName.map((item: any) => {
        return { text: item.label, id: item.value};
      });
    });
    startTime.setHours(startTime.getHours() + 7);
    endTime.setHours(endTime.getHours() + 7);
    this.http.get<any>(`http://localhost:8080/api/halls/available?startDate=${startTime.toISOString()}&endDate=${endTime.toISOString()}`, { headers }).subscribe(res => {
      this.hallData = this.formatOptionValue(res.data.listData);
    });
    this.http.get<any>(`http://localhost:8080/api/facilities/available?startDate=${startTime.toISOString()}&endDate=${endTime.toISOString()}`, { headers }).subscribe(res => {
      this.facilityData = res.data.listData.map((item: any) => {
        return { text: item.name + " (Available: " + item.availableQuantity + ")", id: item.id, availableQuantity: item.availableQuantity, price: item.price};
      });
    });
  }
  onFacilityChange(event: any, index: number) {
      this.eventDetails[index].price = event.itemData.price;
      this.eventDetails[index].quantityValue = 1;
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
    this.getOptions(this.tempStart, this.tempEnd);
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
      this.getOptions(this.tempStart, this.tempEnd);
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
  public fields: object = { text: 'text', value: 'id' };
  private formatOptionValue(data: any) {
    return data.map((item: any) => {
      return { text: item.name + " (Capacity: " + item.scale + ")", id: item.id , capacity: item.scale};
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
      this.hallData.forEach((item: any) => {
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
