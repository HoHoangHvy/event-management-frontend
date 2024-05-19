import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
  standalone: false
})
export class ListViewComponent {
  constructor(private route: ActivatedRoute) { }
  moduleName: string = '';

  ngOnInit() {
    this.moduleName = this.route.snapshot.paramMap.get('moduleName') || '';
  }
}
