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

  // Главный график
  yAxisTicks: any[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]//this.getArrY(1.75, 2.8, 0.05);
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'пары батарей';
  yAxisLabel: string = '% Заряда';
  animations: boolean = false;

  //Линиии
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  colorScheme = {
    domain: ['royalblue', 'deeppink']
  };

 onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.genData();
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  multi:any[];
  genData() {    // Генерируем данные
    this.multi = [];
    for (let i = 0; i < 15; i++) {
      this.multi.push({
        "name": i + 1,
        "series": [
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
  single:any[] = [
    {
      "name": "Заряд батареи",
      "value": 50
    },
  ];

  constructor(public server: ServerService){
    //this.genData();
    //setInterval( () => {this.genData();}, 4000);
  }

  ngOnInit(): void {
    this.request();
    //setInterval(() => { this.request(); } , 2000)
  }

  request()  {
    //Создаём объекты с данными
    let contractorArr = [];

    this.server.getDataQuery()
      .then((data: totals[]) => {
        this.multi = [];

        console.groupCollapsed('data from server -- app.component');
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]); // На этом уровне есть данные по таймстемпам

          for (let u = 0; u < data[i].data.length; u++) { // По самим данным
            const element = data[i].data[u];
            //console.log(element);
            for (let voltage = 0; voltage < data[i].data[u].voltages.length; voltage+=2) {
              const battery1 = data[i].data[u].voltages[voltage];
              const battery2 = data[i].data[u].voltages[voltage + 1];
              this.multi.push({
                "name": voltage / 2,
                "series": [
                  {
                    "name": "",
                    "value": battery1.value 
                  }, {
                    "name": ".",
                    "value": battery2.value
                  }
                ]});
            }

          }
          
          //this.multi =
        }
         
        console.groupEnd();
      })
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
