import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // setInterval(() => {
    //   this.server.getDataQuery()
    //     .then((d: totals[]) => {
    //       console.groupCollapsed('data from server -- app.component');
    //       console.log(d);
    //       console.groupEnd();
    //     })
    // }, 2000)
  }

  getArrY(min: number, max: number, dist: number) {
    let arr = [];
    for (let i = 0, l = (max - min) / dist; i < l; i++) {
      arr.push(min + i * dist)
    }
    arr.push(max)
    return arr;
  }

  randomSeries() {
    let arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push((1.75 + Math.random() * (2.8 - 1.75)).toFixed(2));
    }
    return arr;
  }

  contractor: boolean = true;
  switcher: boolean = false;
  clickContractor() {
    // this.genData();
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    // this.genData();
    this.switcher = !this.switcher;
  }
}
