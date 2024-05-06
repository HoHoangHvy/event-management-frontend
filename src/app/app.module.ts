import { NgModule } from '@angular/core';
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

// Import app component
import { AppComponent } from './app.component';
import { routes } from "./app-routing.module";
// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { HttpClientModule } from '@angular/common/http';
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
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideRouter} from "@angular/router";
import {CoreUIFormsModule} from "./views/forms/forms.module";
import {AuthServiceService} from "./services/Auth/auth-service.service";
import {AuthGuardService} from "./services/Auth/auth-guard.service";
import {AuthGuardLoginService} from "./services/Auth/auth-guard-login.service";

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
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
    AvatarComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuardService,
    AuthGuardLoginService,
    IconSetService,
    Title,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
