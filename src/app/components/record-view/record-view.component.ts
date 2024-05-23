import {Component, Input} from '@angular/core';
import {DetailService} from "../../services/crud/detail/detail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {FieldService} from "../../services/field/field.service";
import {LabelService} from "../../services/label/label.service";
import {AuthServiceService} from "../../services/Auth/auth-service.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-record-view',
  standalone: false,
  templateUrl: './record-view.component.html',
  styleUrl: './record-view.component.scss'
})
export class RecordViewComponent {
  @Input () moduleName: string | null = '';
  @Input () detailObject: any;
  @Input () recordId: string | null = '';

  constructor(private detailService: DetailService,
              private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fieldService: FieldService,
              private labelService: LabelService,
              private authService: AuthServiceService,
              private userService: UserService) { }
  displayedColumns: any;
  labelList: any = {};
  isAdmin: boolean = false;
  canUpsert: boolean = false;

  async ngOnInit() {
    this.moduleName = this.capitalizeFirstLetter(this.moduleName);
    this.canUpsert = this.authService.checkUserPermission(this.moduleName, 'UPSERT');
    this.isAdmin = this.userService.isAdmin();
    try {
      this.displayedColumns = await this.fieldService.getFieldList(this.moduleName.toLowerCase());
      this.labelList = this.labelService.getFieldLabel(this.moduleName) || {};
    } catch (error) {
      console.error('Error fetching columns:', error);
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
        this.detailService.updateDetailData(this.moduleName?.toLowerCase() || '', this.recordId, this.detailObject).subscribe((res: any) => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully updated!'});
          if(this.moduleName == 'Requestdepartments') {
            this.detailObject.departmentId = res.data.departmentId;
            this.detailObject.departmentName = res.data.departmentName
          }
        });
      },
      reject: () => {
      }
    });

  }
  protected readonly String = String;
}
