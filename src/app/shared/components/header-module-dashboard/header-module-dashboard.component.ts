import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header-module-dashboard',
  templateUrl: './header-module-dashboard.component.html',
  styleUrls: ['./header-module-dashboard.component.scss']
})
export class HeaderModuleDashboardComponent {
  constructor(private location: Location) {}
  @Input() title: any;
  goBack(): void {
    this.location.back();
  }
}
