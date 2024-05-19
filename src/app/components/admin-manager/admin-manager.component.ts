import {Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ListService} from "../../services/crud/list/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-admin-manager',
  standalone: false,
  templateUrl: './admin-manager.component.html',
  styleUrl: './admin-manager.component.scss'
})
export class AdminManagerComponent {

  constructor(private listService: ListService, private route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer, private router: Router, private messageService: MessageService) { }
  accountModuleName: string = 'Users';
  accountColumnConfig: any;
  roleModuleName: string = 'Roles';
  roleColumnConfig: any;

}
