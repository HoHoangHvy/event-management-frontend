import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  CurrentAction,
  EventRenderedArgs,
  EventSettingsModel,
  PopupOpenEventArgs,
  ScheduleComponent
} from "@syncfusion/ej2-angular-schedule";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ListService } from "../../services/crud/list/list.service";
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {CreateService} from "../../services/crud/create/create.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
interface OptionObject {
  text: string;
  id: string;
  availableQuantity: number;
  price: number;
}

interface FacilityDetail {
  selected: boolean;
  value: string;
  selectValue: string;
  price: number;
  quantityValue: number;
  totalValue: number;
}
interface DishDetail {
  selected: boolean;
  value: string;
  selectValue: string;
  price: number;
  quantityValue: number;
  totalValue: number;
}
interface ThirdpartyDetail {
  selected: boolean;
  value: string;
  selectValue: string;
  price: number;
  quantityValue: number;
  totalValue: number;
}
interface EventDetail {
  name: string;
  price: number;
  hallId: string;
  type: string;
  customerId: string;
  description: string;
  startDate: Date;
  endDate: Date;
  facilityDetails: FacilityDetail[];
  dishDetails: DishDetail[];
  thirdpartyDetails: ThirdpartyDetail[];
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
  public facilityData: OptionObject[] = [];
  public dishData: OptionObject[] = [];
  public thirdpartyData: OptionObject[] = [];
  public showQuickInfo: boolean = false;
  public startDate!: Date;
  public endDate!: Date;
  public eventModel: EventDetail = {
    name: '',
    price: 0,
    hallId: '',
    type: '',
    customerId: '',
    startDate: new Date(),
    endDate: new Date(),
    facilityDetails: [
      { selected: false, selectValue: '', value: '', price: 0, quantityValue: 1, totalValue: 0}
    ],
    dishDetails: [
      { selected: false, selectValue: '', value: '', price: 0, quantityValue: 1, totalValue: 0}
    ],
    thirdpartyDetails: [
      { selected: false, selectValue: '', value: '', price: 0, quantityValue: 1, totalValue: 0}
    ],
    description: ''
  };
  public checkAll: any;
  public currentPage: number = 1;
  public totalDishValue: number = 0;
  public totalFacilityValue: number = 0;
  public totalThirdpartyValue: number = 0;
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
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj?: ScheduleComponent;
  constructor(private http: HttpClient,
              private listService: ListService,
              private router: Router,
              private messageService: MessageService,
              private createService: CreateService) {}
  @ViewChild('editorHeader') editorHeader: ElementRef | undefined;

  ngOnInit() {
    this.fetchEventData();
  }

  removeSelectedRows() {
    this.checkAll = false;
    if(this.currentPage === 2){
      this.eventModel.facilityDetails = this.eventModel.facilityDetails.filter(detail => !detail.selected);
    } else if (this.currentPage === 3) {
      this.eventModel.dishDetails = this.eventModel.dishDetails.filter(detail => !detail.selected);
      this.calDishGrandTotal()
    } else if (this.currentPage === 4) {
      this.eventModel.thirdpartyDetails = this.eventModel.thirdpartyDetails.filter(detail => !detail.selected);
    }
  }

  nextPage() {
    if (this.currentPage < 5) {
      this.currentPage++;
    }
    this.changeEditorHeader(this.headerList[this.currentPage]);
  }
  toggleCheckAll() {
    this.checkAll = !this.checkAll;
    if(this.currentPage === 2){
      this.eventModel.facilityDetails.forEach(detail => {
        detail.selected = this.checkAll;
      });
    } else if (this.currentPage === 3) {
      this.eventModel.dishDetails.forEach(detail => {
        detail.selected = this.checkAll;
      });
    } else if (this.currentPage === 4) {
      this.eventModel.thirdpartyDetails.forEach(detail => {
        detail.selected = this.checkAll;
      });
    }

  }
  changeEditorHeader(newContent: string) {
    // @ts-ignore
    this.editorHeader.nativeElement.innerText = newContent;
  }
  // Thêm hàng vào bảng chi tiết sự kiện
  addRow() {
    if(this.currentPage === 2){
      // @ts-ignore
      this.eventModel.facilityDetails.push({ selectValue: '',  price: 0, quantityValue: 0, totalValue: 0});
    } else if (this.currentPage === 3) {
      // @ts-ignore
      this.eventModel.dishDetails.push({ selectValue: '',  price: 0, quantityValue: 0, totalValue: 0});
    } else if (this.currentPage === 4) {
      // @ts-ignore
      this.eventModel.thirdpartyDetails.push({ selectValue: '', price: 0, quantityValue: 0, totalValue: 0});
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changeEditorHeader(this.headerList[this.currentPage]);
    }
  }
  getOptions() {
    let gmtStartTime = this.eventModel.startDate;
    let gmtEndTime = this.eventModel.endDate;
    let jwtToken = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`
    });
    this.http.get<any>(`http://localhost:8080/api/related/events`, { headers }).subscribe(res => {
      this.customerData = res.data.customerName.map((item: any) => {
        return { text: item.label, id: item.value};
      });
    });
    this.http.get<any>(`http://localhost:8080/api/halls/available?startDate=${gmtStartTime.toISOString()}&endDate=${gmtEndTime.toISOString()}`, { headers }).subscribe(res => {
      this.hallData = this.formatOptionValue(res.data.listData);
    });
    this.http.get<any>(`http://localhost:8080/api/facilities/available?startDate=${gmtStartTime.toISOString()}&endDate=${gmtEndTime.toISOString()}`, { headers }).subscribe(res => {
      this.facilityData = res.data.listData.map((item: any) => {
        return { text: item.name + " (Available: " + item.availableQuantity + ")", id: item.id, availableQuantity: item.availableQuantity, price: item.price};
      });
    });
    this.http.get<any>(`http://localhost:8080/api/dishes`, { headers }).subscribe(res => {
      this.dishData = res.data.listData.map((item: any) => {
        return { text: item.name, id: item.id, price: item.price};
      });
    });
    this.http.get<any>(`http://localhost:8080/api/thirdparties`, { headers }).subscribe(res => {
      this.thirdpartyData = res.data.listData.map((item: any) => {
        return { text: item.name, id: item.id, price: item.price};
      });
    });
  }
  onFacilityChange(event: any, index: number) {
      this.eventModel.facilityDetails[index].price = event.itemData.price;
      this.eventModel.facilityDetails[index].value = event.itemData.id;
      this.eventModel.facilityDetails[index].quantityValue = 1;
  }
  onDishChange(event: any, index: number) {
      this.eventModel.dishDetails[index].price = event.itemData.price;
      this.eventModel.dishDetails[index].value = event.itemData.id;
      this.eventModel.dishDetails[index].quantityValue = 1;
  }
  onThirdpartyChange(event: any, index: number) {
    this.eventModel.thirdpartyDetails[index].price = event.itemData.price;
    this.eventModel.thirdpartyDetails[index].value = event.itemData.id;
    this.eventModel.thirdpartyDetails[index].quantityValue = 1;
  }
  calDishGrandTotal() {
    this.totalDishValue = this.eventModel.dishDetails.reduce((acc, item) => { return acc + item.price * item.quantityValue || acc}, 0);
  }
  calFacilityGrandTotal() {
    this.totalFacilityValue = this.eventModel.facilityDetails.reduce((acc, item) => { return acc + item.price * item.quantityValue || acc}, 0);
  }
  calThirdpartyGrandTotal() {
    this.totalThirdpartyValue = this.eventModel.thirdpartyDetails.reduce((acc, item) => { return acc + item.price * item.quantityValue || acc}, 0);
  }
  private fetchEventData() {
    this.listService.getListData('events-schedule').subscribe((res) => {
      this.eventSettings = {
        dataSource: this.formatScheduleData(res.data.listData),
      };
      console.log(this.eventSettings)

    });
  }
  statusColor: any = {
    'Draft': '#9DA5B1',
    'Contracted': '#FF76CE',
    'Wait for approval': '#fec200',
    'Approved': '#577B8D',
    'Preparing': '#FF9A00',
    'In Progress': '#5978ee',
    'Completed': '#7fa900',
    'Cancel': '#C40C0C',
  }
  applyCategoryColor(args: EventRenderedArgs): void {
    let categoryColor: string = args.data['CategoryColor'] as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj?.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }
  formatScheduleData(data: any){
    return data.map((item: any) => {
      return {
        Id: item.id,
        Subject: item.name + " - " + item.hallName,
        StartTime: new Date(item.startDate),
        EndTime: new Date(item.endDate),
        CategoryColor: this.statusColor[item.status],
        Status: item.status,
        CreateBy: item.createdByName,
      }
    })
  }
  onCreateContract(data: any){
    this.router.navigateByUrl('/base/create/contracts')
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
        this.eventModel.startDate = args.value as Date;
      } else if (args.element.id === "EndTime") {
        this.eventModel.endDate = args.value as Date;
      }
    }
    this.getOptions();
  }
  getTimeString(date: Date) {
    return date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  }
  public onPopupOpen(args: PopupOpenEventArgs): void {
    if(args.type == 'QuickInfo') {
      this.selectionTarget = undefined;
      this.selectionTarget = args.target;
    }
    if (args.type === 'Editor') {
      // @ts-ignore
      this.eventModel.startDate = args.data.StartTime;
      // @ts-ignore
      this.eventModel.endDate =  args.data.EndTime;
      console.log(this.eventModel)
      this.getOptions();
    }
  }
  public onDetailsClick(Data: any): void {
    this.onCloseClick();
    // const data: Object = this.scheduleObj?.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    console.log(Data)
    this.scheduleObj?.openEditor(Data, 'Add');
  }
  public onAddClick(Data: any): void {
    this.onCloseClick();
    const data: Object = this.scheduleObj?.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    const eventData: { [key: string]: Object } | undefined= this.scheduleObj?.eventWindow.getObjectFromFormData('e-quick-popup-wrapper');
    this.scheduleObj?.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData as any);
    (eventData as any)['Id'] = this.scheduleObj?.eventBase.getEventMaxID() as number + 1;
    this.scheduleObj?.addEvent(eventData as any);
  }
  public onEditClick(args: any): void {
    if (this.selectionTarget) {
      let eventData: { [key: string]: Object } = this.scheduleObj?.getEventDetails(this.selectionTarget) as { [key: string]: Object };
      let currentAction: CurrentAction = 'Save';
      if (!isNullOrUndefined(eventData['RecurrenceRule']) && eventData['RecurrenceRule'] !== '') {
        if (args.target.classList.contains('e-edit-series')) {
          currentAction = 'EditSeries';
          eventData  = this.scheduleObj?.eventBase.getParentEvent(eventData, true) as any;
        } else {
          currentAction = 'EditOccurrence';
        }
      }
      this.scheduleObj?.openEditor(eventData, currentAction);
    }
  }
  private selectionTarget: Element | undefined;

  public onDeleteClick(args: any): void {
    this.onCloseClick();
    if (this.selectionTarget) {
      const eventData: { [key: string]: Object } = this.scheduleObj?.getEventDetails(this.selectionTarget) as { [key: string]: Object };
      let currentAction: CurrentAction = 'Delete';
      if (!isNullOrUndefined(eventData['RecurrenceRule']) && eventData['RecurrenceRule'] !== '') {
        currentAction = args.target.classList.contains('e-delete-series') ? 'DeleteSeries' : 'DeleteOccurrence';
      }
      this.scheduleObj?.deleteEvent(eventData, currentAction);
    }
  }
  public onCloseClick(): void {
    this.scheduleObj?.quickPopup.quickPopupHide();
  }
  onSaveButtonClick() {
    if(this.formValidation()){
      this.createService.createDetailData('events', this.eventModel).subscribe((res) => {
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        this.messageService.add({ severity: 'success', summary: 'Successfully booking!', detail: 'Your booking request has been created', key: 'success'});
      });
    }
  }
  public fields: object = { text: 'text', value: 'id' };
  private formatOptionValue(data: any) {
    return data.map((item: any) => {
      return { text: item.name + " (Capacity: " + item.scale + ")", id: item.id , capacity: item.scale};
    });
  }
  public isEmptyString(str: string) {
    return !str || str.trim() === '';
  }
  private formValidation(){
    if (this.isEmptyString(this.eventModel.startDate.toString())
      || this.isEmptyString(this.eventModel.endDate.toString())
      || this.isEmptyString(this.eventModel.type)
      || this.isEmptyString(this.eventModel.description)
      || this.isEmptyString(this.eventModel.hallId)
      || this.isEmptyString(this.eventModel.customerId)) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Missing required field' });
      return false;
    }

    if(this.eventModel.facilityDetails.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please choose Facility' });
      return false;
    }
    if(this.eventModel.dishDetails.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please choose Dish' });
      return false;
    }
    if(this.eventModel.thirdpartyDetails.length === 0){
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please choose Thirdparty' });
      return false;
    }



    return true;
  }
}
