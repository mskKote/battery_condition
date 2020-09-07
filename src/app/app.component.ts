import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  view: number[] = undefined;
  //multi: any[];

  // Главный график
  yAxisTicksArr: any[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //this.getArrY(1.75, 2.8, 0.05);
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
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    //this.genData();
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
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
            "name": "",
            "value": (Math.random()*100).toFixed(2)
          },
          {
            "name": ".",
            "value": (Math.random()*100).toFixed(2)
          }
        ]
      });
    }
  }
  single: any[] = [
    {
      name: 'Заряд батареи',
      value: 50,
    },
  ];

  constructor(public server: ServerService){
    //this.genData();
    //setInterval( () => {this.genData();}, 4000);
  }

  ngOnInit(): void {
    this.request();
    setInterval(() => { this.request(); } , 1000)
  }

  request()  {
    //Создаём объекты с данными
    let contractorArr = [];

    this.server.getDataQuery()
      .then((data: totals[]) => {
        this.multi = [];
        let lastObj = data[data.length - 1];
        let lastDataset = lastObj.data[lastObj.data.length - 1];  

        console.groupCollapsed('data from server -- app.component');

        let i = lastDataset.voltages.length - 1;
        console.log('lastDataset :>> ', lastDataset);

        for (let j = 0; j < lastDataset.voltages.length; j+=2) {
          const battery1 = lastDataset.voltages[j]; // 1 батарейка
          const battery2 = lastDataset.voltages[j + 1]; // 2 батарейка
          this.multi.push({
            "name": j / 2 + 1 ,
            "series": [
              {
                "name": "",
                "value": battery1.value / 2.8 * 100 
              }, {
                "name": ".",
                "value": battery2.value / 2.8 * 100
              }
            ]});
        }

        console.groupEnd();
      })
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
