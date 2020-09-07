import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //multi: any[];
  view: any[] = [700, 400];

  // options
  yAxisTicks: any[] = this.getArrY(1.75, 2.8, 0.05);
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Заряд От Всех Батареек';
  animations: boolean = false;

  colorScheme = {
    domain: ['#6391ef', 'deeppink']
  };

 onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.genData();
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  multi:any[];
  genData() {    // Генерируем данные
    this.multi = [];
    for (let i = 0; i < 15; i++) {
      this.multi.push(    {
        "name": "USA" + i,
        "series": [
          {
            "name": "2010",
            "value": 1.75 + Math.random()*1.05
          },
          {
            "name": "2011",
            "value": 1.75 + Math.random()*1.05
          }
        ]
      });
    }
  }

  constructor(public server: ServerService){
    this.genData();
    setInterval( () => {this.genData();}, 1000);
  }

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
    this.genData();
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.genData();
    this.switcher = !this.switcher;
  }

}
