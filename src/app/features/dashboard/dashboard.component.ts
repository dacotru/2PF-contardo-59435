import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer; 

  ngAfterViewInit() {
    // Aquí puedes hacer algo con la referencia del drawer, si es necesario
  }
}
