import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";;
import {DetailService} from "../../services/crud/detail/detail.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrl: './update-view.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class UpdateViewComponent {
  constructor(private detailService: DetailService,
              private route: ActivatedRoute,
              private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private userService: UserService) { }
  moduleName: string | null = '';
  displayedColumns: any;
  labelList: any = {};
  detailObject: any;
  relatedOptions: any;

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
    }
  }
  async ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('moduleName'));
    await this.getRelatedOptions(); // Wait for related options to be fetched
    this.displayedColumns = this.getColumnsForModule(this.moduleName);
    this.labelList = this.globalLabelList[this.moduleName] || {};
    this.detailService.getDetailData(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
      this.detailObject = res.data || {};
    });
  }
  capitalizeFirstLetter(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  getColumnsForModule(moduleName: string): any {
    console.log(this.userService.isAdmin())
    const columns: any = {
      Employees: [
        {
          name: 'name',
          isSelect: false,
          isDate: false,
          isText: true,
          isDisabled: false
        },
        {
          name: 'phone',
          isSelect: false,
          isDate: false,
          isText: true,
          isDisabled: false
        },
        {
          name: 'empLevel',
          isSelect: true,
          isDate: false,
          isText: false,
          isDisabled: false,
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
          isDisabled: false,
          options: this.relatedOptions.departmentId
        },
        {
          name: 'roleId',
          isSelect: true,
          isDate: false,
          isText: false,
          isDisabled: !this.userService.isAdmin(),
          options: this.relatedOptions.roleId
        },
        {
          name: 'gender',
          isSelect: true,
          isDate: false,
          isText: false,
          isDisabled: false,
          options: [
            {value: "Male", label: "Male"},
            {value: "Male", label: "Male"},
          ]
        },
        {
          name: 'status',
          isSelect: true,
          isDate: false,
          isText: false,
          isDisabled: false,
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
          isDisabled: false,
        },
        {
          name: 'startDate',
          isSelect: false,
          isDate: true,
          isText: false,
          isDisabled: false,
        },
        {
          name: 'email',
          isSelect: false,
          isDate: false,
          isText: true,
          isDisabled: false,
        },
      ]
    };

    return columns[moduleName] || [];
  }

  saveInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.detailService.updateDetailData(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id'), this.detailObject).subscribe((res: any) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully updated!'});
        });
      },
      reject: () => {
      }
    });

  }

  deleteInfo(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.detailService.deleteDetailData(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully deleted!'});
          this.router.navigateByUrl('base/list/' + this.route.snapshot.paramMap.get('moduleName'));
        });
      },
      reject: () => {
      }
    });
  }

  getRelatedOptions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.detailService.getRelatedOption(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id')).subscribe(
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

}
