import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Module } from 'src/app/models/module/module'
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {brandSet, flagSet, freeSet} from '@coreui/icons';
import {IconSetService} from "@coreui/icons-angular";
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  providers: [IconSetService],
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  public icons!: [string, string[]][];
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public moduleList: Module[];
  public restModuleList: Module[];
  constructor(private classToggler: ClassToggleService, public iconSet: IconSetService) {
    super();
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.moduleList = user.moduleList ? user.moduleList as Module[] : [];
      this.restModuleList = user.restModuleList ? user.restModuleList as Module[] : [];
    } else {
      this.moduleList = [];
      this.restModuleList = [];
    }
  }
}
