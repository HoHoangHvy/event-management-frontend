import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";;
import {DetailService} from "../../services/crud/detail/detail.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";
import {FieldService} from "../../services/field/field.service";
import {LabelService} from "../../services/label/label.service";
import {AuthServiceService} from "../../services/Auth/auth-service.service";

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
              private authService: AuthServiceService) { }
  moduleName: string | null = '';
  displayedColumns: any;
  labelList: any = {};
  detailObject: any;
  permissionModel: any;
  showApproveButton: boolean = false;

  async ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.route.snapshot.paramMap.get('moduleName'));
    try {
      this.displayedColumns = await this.fieldService.getFieldList(this.moduleName.toLowerCase());
      this.labelList = this.labelService.getFieldLabel(this.moduleName) || {};
      this.detailService.getDetailData(this.moduleName.toLowerCase(), this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
        this.detailObject = res.data || {};
        this.showApproveButton = this.moduleName == "Requests" && this.authService.checkUserPermission('Requests', 'APPROVE') && this.detailObject.status == 'Wait for approval';
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
  approveRequest() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve this request?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.detailObject.set('status', 'Approved')
        this.detailService.updateDetailData(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id'), this.detailObject).subscribe((res: any) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully updated!'});
        });
      },
      reject: () => {
      }
    });
  }
  rejectRequest() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this request?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.detailObject.set('status', 'Approved')
        this.detailService.updateDetailData(this.route.snapshot.paramMap.get('moduleName'), this.route.snapshot.paramMap.get('id'), this.detailObject).subscribe((res: any) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully updated!'});
        });
      },
      reject: () => {
      }
    });
  }
  protected readonly String = String;
}
