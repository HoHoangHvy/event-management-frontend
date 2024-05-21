import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {BrowserModule, provideClientHydration, Title} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AvatarModule } from './components/avatar/avatar.module';

// Import routing module
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://socket.dotb.cloud/', options: {}};

// Import app component
import { AppComponent } from './app.component';
import { routes } from "./app-routing.module";
// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {
  AvatarComponent,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule, ToasterComponent, ToastModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {provideRouter} from "@angular/router";
import {CoreUIFormsModule} from "./views/forms/forms.module";
import {AuthServiceService} from "./services/Auth/auth-service.service";
import {AuthGuardService} from "./services/Auth/auth-guard.service";
import {AuthGuardLoginService} from "./services/Auth/auth-guard-login.service";
import {Observable, tap} from "rxjs";
import {User} from "./models/user/user";
import {UserService} from "./services/user/user.service";
import {BaseModule} from "./views/base/base.module";

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];
function initializeAppFactory(httpClient: HttpClient, userService: UserService, authService: AuthServiceService): () => Promise<void> {
  return () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || !authService.isAuthenticated()) {
      return Promise.resolve();
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`
    });

    return httpClient.get<any>('http://localhost:8080/auth/me', { headers }).pipe(
      tap((response) => {
        const userData = response.data.user;
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

        localStorage.setItem('isAdmin', String(userData.userName === 'admin'));
        userService.setCurrentUser(user);
        localStorage.setItem('moduleList', JSON.stringify(response.data.moduleList));
      })
    ).toPromise();
  };
}

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
    imports: [
        SocketIoModule.forRoot(config),
        AvatarModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BreadcrumbModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        NavModule,
        ButtonModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        CardModule,
        NgScrollbarModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(),
        CoreUIFormsModule,
        AvatarComponent,
        BaseModule,
    ],
  providers: [
    UserService,
    AuthServiceService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient, UserService, AuthServiceService],
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuardService,
    AuthGuardLoginService,
    IconSetService,
    Title,
    // provideClientHydration(),
    // provideAnimationsAsync(),
    // provideHttpClient(withFetch()),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
