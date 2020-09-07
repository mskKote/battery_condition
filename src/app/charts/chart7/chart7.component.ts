import { Component, NgModule } from '@angular/core';
import { ServerService, totals } from 'src/app/server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-chart7',
  templateUrl: './chart7.component.html',
  styleUrls: ['./chart7.component.scss'],
})
export class Chart7Component {
  single: any[];
  view: any[] = [500, 400];
  legend: boolean = true;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(public server: ServerService){
  }
}
