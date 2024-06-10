import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {FieldService} from "../../services/field/field.service";
import {LabelService} from "../../services/label/label.service";
import {CreateService} from "../../services/crud/create/create.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrl: './create-view.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CreateViewComponent {
  constructor(private createService: CreateService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fieldService: FieldService,
              private http: HttpClient,
              private labelService: LabelService) { }
  moduleName: string | null = '';
  displayedColumns: any;
  labelList: any = {};
  createObject: { [key: string]: any } = {};
  validated = false;
  eventDetails: any;
  currentEvent: string = '';
  async ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('moduleName'));
    try {
      this.displayedColumns = await this.fieldService.getFieldList(this.moduleName.toLowerCase());
      if(this.moduleName === 'Contracts') {
        let targetColumn = this.displayedColumns[this.displayedColumns.findIndex((item: any) => item.name == 'eventId')];
        targetColumn.options = targetColumn.options.filter((item: any) => item.status == 'Draft');
        await this.fetchEventDetails();
        this.route.queryParams.subscribe(params => {
          this.currentEvent = params['eventId'] || '';
          if(this.currentEvent !== '') targetColumn.options = this.moveObjectToTop(targetColumn.options, this.currentEvent);
        });
      }
      this.labelList = this.labelService.getFieldLabel(this.moduleName) || {};
      this.displayedColumns.forEach((column: any) => {
        this.createObject[column.name] = '';
        if(column.isSelect) {
          this.createObject[column.name] = column.options[0].value;
        }
      });
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }
  moveObjectToTop(array: any[], id: string): any[] {
    // Tìm chỉ số của đối tượng có giá trị bằng id
    const index = array.findIndex(item => item.value === id);

    // Nếu tìm thấy, di chuyển đối tượng lên đầu danh sách
    if (index > -1) {
      const [item] = array.splice(index, 1); // Xóa đối tượng khỏi vị trí hiện tại
      array.unshift(item); // Thêm đối tượng vào đầu danh sách
    }

    return array; // Trả về danh sách đã được sắp xếp lại
  }

  async fetchEventDetails() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
    })
    return this.http.get('http://localhost:8080/api/option/events', {headers}).subscribe((res: any) => {
      this.eventDetails = res.data;
      this.taxValue = 0.1;
    });
  }
  capitalizeFirstLetter(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  handleCustomView(){
    switch (this.moduleName) {
      case 'Roles':
        this.createObject['permission'] = this.permissionModel;
        break;
    }
  }
  saveInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to create?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.handleCustomView();
        this.validated = true;
        this.createService.createDetailData(this.route.snapshot.paramMap.get('moduleName'), this.createObject).subscribe(
          (res: any) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Successfully created! Redirecting to list page...'});
            setTimeout(() => {
              let url = 'base/list/' + this.route.snapshot.paramMap.get('moduleName');
              if(this.route.snapshot.paramMap.get('moduleName') === 'news') url = 'base/new-feed'

              this.router.navigate([url, {}])
                .then(success => {
                  if (success) {
                    this.messageService.add({severity:'success', summary:'Success', detail:'Successfully created!'});
                  }
                })
                .catch(err => {
                  console.error('Navigation error:', err);
                });
            }, 2000);

          },
          (errorCatcher) => {
            if(errorCatcher.error.code == 107) {
              this.messageService.add({severity:'error', summary:'Error', detail:'Email already exists!'});
            } else if(errorCatcher.error.code == 108) {
              this.messageService.add({severity:'error', summary:'Error', detail:'Phone number already exists!'});
            } else if(errorCatcher.error.code == 106) {
              this.messageService.add({severity:'error', summary:'Error', detail:'Role already exists!'});
            }
          });
      },
      reject: () => {
      }
    });

  }
  permissionModel: any = {
    "Contracts": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Customers": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Departments": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Dishes": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Employees": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "EventDetails": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Events": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Facilities": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Payments": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Roles": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Tasks": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Thirdparties": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Users": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Notifications": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Requests": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Resources": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "News": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "ResourceBooking": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "EventBooking": { "UPSERT": false, "VIEW": false, "DELETE": false },
    "Halls": { "UPSERT": false, "VIEW": false, "DELETE": false }
  };

  validationCheck(column: any): boolean {
    if (column.isDisabled) return false;
    if (column.isSelect && !this.createObject[column.name]) return true;
    if (column.isText && !this.createObject[column.name]) return true;
    return false;
  }
  netValue: number = 0;
  taxValue: number = 0;
  discountValue: number = 0;
  handleSelectChange(name: any, model: any) {
    if(name == 'taxable') {
      this.taxValue = model == "true" ? 0.1 : 0;
    }
  }
  handleTextChange(name: any, model: any) {
    if(name == 'discount') {
      this.discountValue = Number(model);
    }
  }
  protected readonly String = String;
}
