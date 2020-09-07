import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //multi: any[];

  // Главный график
  yAxisTicks: any[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //this.getArrY(1.75, 2.8, 0.05);
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Пары батарей';
  yAxisLabel: string = '% Заряда';
  animations: boolean = false;
  showDataLabel: boolean = true;
  showGridLines: boolean = false;
  roundDomains: boolean = true;
  noBarWhenZero: boolean = true;
  rotateXAxisTicks: boolean = false;

  //Линиии
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  colorScheme = {
    domain: ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'],
  };
  schemeType: string = 'linear';

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

  multi: any[];
  genData() {
    // Генерируем данные
    this.multi = [];
    for (let i = 0; i < 15; i++) {
      this.multi.push({
        name: i + 1,
        series: [
          {
            name: '',
            value: (Math.random() * 100).toFixed(2),
          },
          {
            name: '.',
            value: (Math.random() * 100).toFixed(2),
          },
        ],
      });
    }
  }
  single: any[] = [
    {
      name: 'Заряд батареи',
      value: 50,
    },
  ];

  constructor(public server: ServerService) {
    this.genData();
    setInterval(() => {
      this.genData();
    }, 4000);
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
      arr.push(min + i * dist);
    }
    arr.push(max);
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
