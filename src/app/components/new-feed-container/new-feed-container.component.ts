import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthServiceService} from "../../services/Auth/auth-service.service";

@Component({
  selector: 'app-new-feed-container',
  standalone: false,
  templateUrl: './new-feed-container.component.html',
  styleUrl: './new-feed-container.component.scss'
})
export class NewFeedContainerComponent {
  activeIndex: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthServiceService) { }
  showCreateButton: boolean = true;
  createPost() {
    this.router.navigateByUrl('base/create/news');
  }
  ngOnInit() {
    this.showCreateButton = this.authService.checkUserPermission('News', 'UPSERT');
    console.log(this.showCreateButton)
    this.route.queryParams.subscribe(params => {
      this.activeIndex = +params['activeIndex'] || 0;
    });
  }}
