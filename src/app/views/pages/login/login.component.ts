import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/Auth/auth-service.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user/user";
import { ToastModule } from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard').then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully!'});
      });
    }
  }
  constructor(public authService: AuthServiceService, public router: Router, public toastService: ToastrService, public userService: UserService, public messageService: MessageService) { }
  onLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.handleUserData();
        }
      },
      (errorCatcher) => {
        if (errorCatcher.error.code == 105) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials!' });
        } else if (errorCatcher.error.code == 104) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not found!' });
        }
      }
    );
  }

  private handleUserData() {
    this.authService.getMe().subscribe(
      (res: any) => {
        if (res.data.user.status === 'inactive') {
          this.toastService.error('Your account has been disabled please contact the administrator for more information', 'Account was disabled', { timeOut: 5000 });
        } else {
          localStorage.setItem('moduleList', JSON.stringify(res.data.moduleList));
          this.processUserDetails(res.data.user);
          this.router.navigateByUrl('/dashboard').then(() => {
            this.toastService.success('Login successfully', 'Success', { timeOut: 5000 });
          });
        }
      },
      (error) => {
        // Handle error while fetching user data
        console.error('Error fetching user data:', error);
      }
    );
  }

  private processUserDetails(userData: any) {
    const dobDate = userData.employee.dob ? new Date(userData.employee.dob[0], userData.employee.dob[1] - 1, userData.employee.dob[2]) : new Date();
    const startDate = userData.employee.startDate ? new Date(userData.employee.startDate[0], userData.employee.startDate[1] - 1, userData.employee.startDate[2]) : new Date();

    const user = new User(
      userData.id,
      userData.employee ? userData.employee.name : null,
      userData.userName,
      userData.status,
      dobDate,
      userData.role,
      userData.employee ? userData.employee.email : null,
      userData.employee ? userData.employee.phone : null,
      userData.employee ? userData.employee.gender : null,
      userData.employee ? userData.employee.status : null,
      userData.employee ? userData.employee.id : null,
      userData.employee ? userData.employee.empLevel : null,
      userData.employee ? userData.employee.department : null,
      startDate,
      userData.userName === 'admin'
    );

    this.userService.setCurrentUser(user);
  }

}
