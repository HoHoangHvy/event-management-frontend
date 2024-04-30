import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../services/Auth/auth-service.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public authService: AuthServiceService, public router: Router, public toastService: ToastrService, public userService: UserService) { }
  onLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
        if(res.success) {
          debugger
          let jwt = res.data.token;
          localStorage.setItem('jwtToken', jwt);
          this.authService.getMe().subscribe((res: any) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            debugger
            this.userService.setCurrentUser(res.data.user);
            this.router.navigateByUrl('/home').then(r => {
              this.toastService.success('Login successfully', 'Success', {timeOut: 5000});
            });
          });
        }
      },
      (errorCatcher) => {
        if (errorCatcher.error.code == 105) {
          this.toastService.error('Invalid Credentials', 'Error', {timeOut: 5000});
        } else if (errorCatcher.error.code == 104) {
          this.toastService.error('User not found', 'Error', {timeOut: 5000});
        }
      }

    );
  }
}
