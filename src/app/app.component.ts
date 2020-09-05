import { Timestamp } from 'rxjs';
import { ServerService, totals,total,val } from './server.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public server: ServerService){

  }
  ngOnInit(): void {
    let data: any;
    this.server.getDataQuery()
      .then((d: totals[]) => data = d)
      // .then(() => console.log(data))
      .then(() => {
        for(let i = 0, l = 10; i < l; i++) {          
          this.charts.chart3.categories.push(data[i].timestamp);
          this.charts.chart3.yVal.push(data[i].data[1].temperatures[1].value)
        }
      })
      .then(() => {
        // console.log(this.charts.chart3)
      });
  }
  charts = {
    chart1: {},
    chart2: {},
    chart3: {
      categories: [],
      yVal: [],
    },
    chart4: {},
    switcher: {},
    contractor: {}
  }


  contractor: boolean = false;
  switcher: boolean = false;
  clickContractor() {
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.switcher = !this.switcher;
  }

}
