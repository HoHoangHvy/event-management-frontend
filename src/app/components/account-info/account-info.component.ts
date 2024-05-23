import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  FormCheckComponent,
  CardModule,
  NavComponent,
  NavItemComponent,
  NavLinkDirective,
  TabContentRefDirective, RoundedDirective, TabContentComponent, TabPaneComponent
} from "@coreui/angular";
import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';
import { AvatarModule } from 'src/app/components/avatar/avatar.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import {MatDatepickerModule} from "@angular/material/datepicker";
import {IconDirective, IconSetService} from "@coreui/icons-angular";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {brandSet, flagSet, freeSet} from "@coreui/icons";
import {UserService} from "../../services/user/user.service";
import {FormsModule} from "@angular/forms";
import {ConfirmationService} from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    FormModule,
    GridModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    CardModule,
    MatDatepickerModule,
    AvatarModule,
    NavComponent,
    NavItemComponent,
    IconDirective,
    NavLinkDirective,
    RouterLink,
    TabContentRefDirective,
    NgIf,
    RoundedDirective,
    TabContentComponent,
    TabPaneComponent,
    FormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AccountInfoComponent {
  public currentUser: any;
  public icons!: [string, string[]][];
  customStylesValidated = false;
  public newPassword?: String;
  public confirmPassword?: String;
  public oldPassword?: String;

  constructor(public iconSet: IconSetService, public userService: UserService,public confirmationService: ConfirmationService, public messageService: MessageService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }
  onSubmitEmployee() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.customStylesValidated = true;
        this.updateEmployee();
      },
      reject: () => {
      }
    });
  }
  private updateEmployee() {
    this.userService.updateEmployee(this.currentUser).subscribe( (data:any) => {
      if(data.success) {
        this.showUpdateSuccess();
      }
    });
  }
  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  updateInfoConfirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.updateEmployee(),
      reject: () => {
      }
    });
  }
  showUpdateSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully update your information!' });
  }
  onSubmitChangePassword() {
    if(this.newPassword != this.confirmPassword) {
      let newPasswordElement = document.getElementById('inputNewPassword');
      newPasswordElement?.classList.add('is-invalid');
      let confirmPasswordElement = document.getElementById('inputReenterPassword');
      confirmPasswordElement?.classList.add('is-invalid');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password does not match!' });
      return;
    }
    if(this.newPassword == undefined || this.confirmPassword == undefined || this.oldPassword == undefined) {
      this.customStylesValidated = true;
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-sm p-button-outlined ',
      acceptButtonStyleClass: 'p-button-primary p-button-sm',
      accept: () => {
        this.customStylesValidated = false;
        this.changePassword();
      },
      reject: () => {
      }
    });
  }
  @ViewChild('inputOldPassword') oldPasswordElement?: ElementRef;
  @ViewChild('oldPasswordFeedback') oldPasswordFeedback?: ElementRef;
  changePassword() {
    this.userService.changePassword(this.oldPassword, this.newPassword).subscribe( (data:any) => {
      if(data.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully change your password!' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Old password is incorrect!' });
      }
    },
    (errorCatcher) => {
      if (errorCatcher.error.code == 105) {
        this.oldPasswordElement?.nativeElement.classList.add('is-invalid');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials!'});
      }
    });
  }
}
