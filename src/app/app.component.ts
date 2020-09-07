import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule, ColorHelper } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';

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

  // RightTickValues: string[] = ['Выкл','Вкл']

  //Линиии
  linearCurveCardinal= shape.curveCardinal;
  linearCurveStep= shape.curveStep;
  amperTicks: any[] =  [0, 0.01, 0.02, 0.03, 0.04];
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

  time_temp0: any[] = [{
    "name": "Температура",
    "series": []
  }];
  time_temp1: any[] = [{
    "name": "Сила тока",
    "series": []
  }];
  balance: any[] = [{
    "name": "Балансировка",
    "series": []
  }];
  contractor: any[] = [{
    "name": "Контактор",
    "series": []
  }];
  multi:any[];
  single: any[] = [
    {
      name: 'Заряд батареи',
      value: 50,
    },
  ];
  batteries: any[] = new Array(30);
  
  currentBattery: number = 0;
  changeBattery(target){
    this.time_temp0 = [{
      "name": "Температура",
      "series": []
    }];
    this.time_temp1 = [{
      "name": "Сила тока",
      "series": []
    }];
    this.balance = [{
      "name": "Балансировка",
      "series": []
    }];
    this.contractor = [{
      "name": "Балансировка",
      "series": []
    }];
    this.currentBattery = target;
  }

  static randomDate(start:Date, end:Date): Date {
    return new Date(start.getTime() 
            + Math.random() * (end.getTime() - start.getTime()));
  }
  genData() {    // Генерируем данные
    // try{
    //   console.log(ServerService.end.getTime());
    //   console.log(ServerService.start.getTime());
    //   const bn = this.server.getDataQuery(ServerService.start.getTime().toString(),ServerService.end.getTime().toString());
    //   bn.then(b=>console.log(b));
    // }
    // catch{}
    // this.multi = [];
    // for (let i = 0; i < 15; i++) {
    //   this.multi.push({
    //     name: i + 1,
    //     series: [
    //       {
    //         "name": "",
    //         "value": (Math.random()*100).toFixed(2)
    //       },
    //       {
    //         "name": ".",
    //         "value": (Math.random()*100).toFixed(2)
    //       }
    //     ]
    //   });
    // }
    // this.time_temp0[0].series.push({
    //   "value": (Math.random()*1000).toFixed(2),
    //   "name": AppComponent.randomDate(new Date(2012, 0, 1), new Date())
    // });
    // this.time_temp1[0].series.push({
    //   "value": (Math.random()*1000).toFixed(2),
    //   "name": AppComponent.randomDate(new Date(2012, 0, 1), new Date())
    // });

    // let buff0 = this.time_temp0[0];
    // this.time_temp0 = [buff0];

    // let buff1 = this.time_temp1[0];
    // this.time_temp1 = [buff1];
    this.addTimePointTime0();
    this.addTimePointTime1();
  }

  addTimePointTime0(point = {
    "value": (Math.random()*1000).toFixed(2),
    "name": AppComponent.randomDate(new Date(2012, 0, 1), new Date())
  }) {
    this.time_temp0[0].series.push(point);
    let buff = this.time_temp0[0];
    this.time_temp0 = [buff];
  }
  addTimePointTime1(point = {
    "value": (Math.random()*1000).toFixed(2),
    "name": AppComponent.randomDate(new Date(2012, 0, 1), new Date())
  }) {
    this.time_temp1[0].series.push(point);
    let buff = this.time_temp1[0];
    this.time_temp1 = [buff];
  }
  addTimePointContractor(point) {
    this.contractor[0].series.push(point);
    let buff = this.contractor[0];
    this.contractor = [buff];
  }
  addTimePointBalance(point) {
    this.balance[0].series.push(point);
    let buff = this.balance[0];
    this.balance = [buff];
  }


  
  constructor(public server: ServerService){
    //this.genData();
    //setInterval( () => {this.genData();}, 4000);
  }

  ngOnInit(): void {
    this.request();
    setInterval(() => { this.request(); } , 1000)
  }

  request()  {  
    this.server.getDataQuery()
      .then((data: totals[]) => {
        this.multi = [];
        this.single = [];
        let total_voltage_value = 0;
        let lastDataset;
        try {
          let lastObj = data[this.currentBattery];//data.length - 1];
          lastDataset = lastObj.data[lastObj.data.length - 1];
        } catch (error) {
          let lastObj = data[data.length - 1];
          lastDataset = lastObj.data[lastObj.data.length - 1];
        }


        console.groupCollapsed('data from server -- app.component');
        // Графикс c 30 батареями и total_voltage
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
          total_voltage_value += battery1.value + battery2.value;

        }
        this.single.push({
          name: 'Заряд батареи',
          value: total_voltage_value / (1.05 * lastDataset.voltages.length) * 100
        });
      
        // Line charts
        for (let i = 0; i < data.length; i++) {
          const element = data[i]; // 1 по Х
          console.log(element);
          for (let j = 0; j < element.data.length; j++) {
            const dataset = element.data[j];
            //console.log('dataset :>> ', dataset);
            // temp0 = dataset.temperatures[0].value;
            //console.log('Ampere :>> ', (dataset.total_amp.value).toFixed(2));
            //console.log('contractor :>> ', dataset.contractor ? "Вкл" : "Выкл");
            if (dataset.total_amp.value > 100)
              continue;              

            this.addTimePointTime1({
              "value": (dataset.total_amp.value).toFixed(2),
              "name": new Date(element.timestamp)
            }); 

            this.addTimePointContractor({
              "value":  dataset.contractor ? "1" : "0",
              "name": new Date(element.timestamp)
            }); 
          }
          this.addTimePointTime0({
            "value": "" + element.data[0].temperatures[this.currentBattery].value,
            "name": new Date(element.timestamp)
          });                  
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
}
