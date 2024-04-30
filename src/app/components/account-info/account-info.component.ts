import { Component } from '@angular/core';
import {FormCheckComponent, CardModule} from "@coreui/angular";
import {
  ButtonGroupModule,
  ButtonModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';
import {User} from "../../models/user/user";
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
    CardModule
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
  constructor() {
  }
}
