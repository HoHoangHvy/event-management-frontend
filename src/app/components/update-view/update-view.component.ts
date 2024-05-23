import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";;
import {DetailService} from "../../services/crud/detail/detail.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";
import {FieldService} from "../../services/field/field.service";
import {LabelService} from "../../services/label/label.service";
import {AuthServiceService} from "../../services/Auth/auth-service.service";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrl: './update-view.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class UpdateViewComponent {
  constructor(private detailService: DetailService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fieldService: FieldService,
              private labelService: LabelService,
              private authService: AuthServiceService,
              private userService: UserService) { }
  moduleName: string | null = '';
  displayedColumns: any;
  labelList: any = {};
  detailObject: any;
  permissionModel: any;
  showApproveButton: boolean = false;
  isAdmin: boolean = false;
  canUpsert: boolean = false;
  canDelete: boolean = false;
  isApproved: boolean = false;
  isRejected: boolean = false;
  isPending: boolean = false;
  canDoAction: boolean = false;
  showHistoryTable: boolean = true;
  currentManagerDepartment: string = 'true';
  historyList: any;

  async ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('moduleName'));
    this.canUpsert = this.authService.checkUserPermission(this.moduleName, 'UPSERT');
    this.canDelete = this.authService.checkUserPermission(this.moduleName, 'DELETE');
    this.isAdmin = this.userService.isAdmin();
    this.canDoAction = this.authService.checkUserPermission(this.moduleName, 'APPROVE');
    this.currentManagerDepartment = this.userService.getCurrentUser()?.departmentName || '';
    try {
      this.displayedColumns = await this.fieldService.getFieldList(this.moduleName.toLowerCase());
      this.labelList = this.labelService.getFieldLabel(this.moduleName) || {};
      this.detailService.getDetailData(this.moduleName.toLowerCase(), this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
        this.detailObject = res.data || {};
        this.showApproveButton = this.moduleName == "Requests" && this.authService.checkUserPermission('Requests', 'APPROVE') && this.detailObject.status == 'Wait for approval';
        this.isApproved = this.detailObject.status == 'Approved';
        this.isRejected = this.detailObject.status == 'Rejected';
        this.isPending = this.detailObject.status == 'Wait for approval';
        this.handleCustomView(this.detailObject);
      });
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  }
  handleCustomView(object: any) {
    switch (this.moduleName) {
      case 'Roles':
        this.permissionModel = object.permission;
        break;
      case 'Requests':
        this.historyList = object.requestDepartments;
        break;
    }
  }
  capitalizeFirstLetter(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
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
  visibleApproveResponseDialog: boolean = false;
  visibleRejectResponseDialog: boolean = false;
  tempId: string | undefined;
  tmpObject: any;
  approveRequest(id: string | undefined, object: any) {
    this.tempId = id;
    this.tmpObject = object;
    if(this.response) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to approve this request?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
        acceptButtonStyleClass: 'p-button-primary p-button-sm',
        accept: () => {
          this.visibleApproveResponseDialog = false
          object.status = 'Approved';
          object.response = this.response;
          this.detailService.updateDetailData('requestdepartments', id || '', object).subscribe((res: any) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Successfully updated!'});
            setTimeout(function() {window.location.reload()}, 2000);
          });
        },
        reject: () => {
        }
      });
    }
  }
  saveResponseInfo(action: string) {
    if(action == 'approve') {
      this.approveRequest(this.tempId, this.tmpObject);
    } else if(action == 'reject') {
      this.saveRejectInfo(this.tempId, this.tmpObject);
    } else {
      this.forwardRequest(this.tempId, this.tmpObject);
    }
  }
  response: string = '';
  visibleEditDialog: boolean = false;
  saveRejectInfo(id: string | undefined, object: any) {
    this.tempId = id;
    this.tmpObject = object;
    if(this.response) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to reject this request?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
        acceptButtonStyleClass: 'p-button-primary p-button-sm',
        accept: () => {
          this.visibleApproveResponseDialog = false
          object.status = 'Rejected';
          object.response = this.response;
          this.detailService.updateDetailData('requestdepartments', id || '', object).subscribe((res: any) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Successfully Reject!'});
            setTimeout(function() {window.location.reload()}, 2000);
          });
        },
        reject: () => {
        }
      });
    }
  }
  note: string = '';
  departmentId: string = '';
  departments: any;
  visibleForwardingDialog: boolean = false;
  async forwardRequest(id: string | undefined, object: any) {
    this.tempId = id;
    this.tmpObject = object;
    let fieldDef = await this.fieldService.getFieldList('requestdepartments');
    let existDepartment = this.historyList.map((item: any) => item.departmentId);
    this.departments = fieldDef[0].options.filter((item: any) => !existDepartment.includes(item.value));
    if (this.response && this.note && this.departmentId) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to approve and forward this request?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
        acceptButtonStyleClass: 'p-button-primary p-button-sm',
        accept: () => {
          this.visibleForwardingDialog = false
          object.status = 'Forwarding';
          object.response = this.response;
          object.note = this.note;
          object.departmentId = this.departmentId;
          this.detailService.updateDetailData('requestdepartments', id || '', object).subscribe((res: any) => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Successfully Forward!'});
            setTimeout(function() {window.location.reload()}, 2000);
          });
        },
        reject: () => {
        }
      });
    }
  }
  editHistory(item: any){
    this.router.navigateByUrl(`/base/detail/requests/${item.id}`);
  }
  protected readonly String = String;
}
