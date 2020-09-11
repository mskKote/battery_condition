import { ServerService, totals } from './server.service';
import { Component, OnInit, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dateRange: any
  receiveDateRange($event: any){
    this.dateRange = $event;
    // Вызывать обнуление
    this.time_temp0 = [
      {
        name: 'Температура',
        series: [],
      },
    ];
    this.time_temp1 = [
      {
        name: 'Сила тока',
        series: [],
      },
    ];
    this.balance = [
      {
        name: 'Балансировка',
        series: [],
      },
    ];
    this.contractor = [
      {
        name: 'Балансировка',
        series: [],
      },
    ];
    // Генерим новое
    this.iter = 0;
    this.genGlobalCharts(this.dateRange.start, this.dateRange.end);
  }
  
  // Главный график
  yAxisTicksArr: any[] = this.getArrY(0, 1.05, 0.15);
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'Пары батарей';
  yAxisLabel: string = '';
  animations: boolean = false;
  showDataLabel: boolean = true;
  showGridLines: boolean = true;
  roundDomains: boolean = true;
  noBarWhenZero: boolean = true;
  rotateXAxisTicks: boolean = false;
  yAxisTickFormattingMulti(val: any) {
    return val + 1.75 + 'V';
  }
  yAxisTickFormattingMulti2(val: any) {
    return 52.5 + (84 - 52.5) * (val / 100) + 'V';
  }

  batteryCharge(charge: any) {
    return charge + '%';
  }
  //Линиии
  yAxisTickFormattingLine(val: any) {
    if (val == '0') {
      return 'Выкл';
    }
    if (val == '1') {
      return 'Вкл';
    }
  }

  linearCurveCardinal = shape.curveCardinal;
  linearCurveStep = shape.curveStepAfter;
  amperTicks: any[] = [0, 0.01, 0.02, 0.03, 0.04];
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  colorChange = {
    domain: [],
  };
  colorChange_Total = {
    domain: [],
  };
  colorChange_Temperature = {
    domain: [],
  };
  colorChange_ACDC = {
    domain: [],
  };
  colorScheme = {
    domain: ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'],
  };
  schemeType: string = 'linear';
  timeframe: string = 'Время, мин'; // Нужно изменять мс/cек/мин/час/день/неделя/месяц

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  time_temp0: any[] = [
    {
      name: 'Температура',
      series: [],
    },
    
  ];
  time_temp1: any[] = [
    {
      name: 'Сила тока',
      series: [],
    },
  ];
  balance: any[] = [
    {
      name: 'Балансировка',
      series: [],
    },
  ];
  contractor: any[] = [
    {
      name: 'Контактор',
      series: [],
    },
  ];
  multi: any[] = [];
  single: any[] = [];
  batteries: any[] = new Array(30);

  currentBattery: number = 0;
  changeBattery(target) {
    this.time_temp0 = [
      {
        name: 'Температура',
        series: [],
      },
    ];
    this.time_temp1 = [
      {
        name: 'Сила тока',
        series: [],
      },
    ];
    this.balance = [
      {
        name: 'Балансировка',
        series: [],
      },
    ];
    this.contractor = [
      {
        name: 'Балансировка',
        series: [],
      },
    ];
    this.currentBattery = target;
  }

  //---------------------------------------------------Раздел генерации значений
  static randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  static randomNumber(start: number, end: number): number {
    return start + Math.random() * (end - start);
  }
  // Изменяю значения, расчётом на прежнее
  // volatile -- вероятность смены значения
  static genBoolByPrevious(volatile): boolean {
    return Math.random() > volatile;
  }

  // Изменяем значения, НО с сохранением тренда с вероятностью volatile
  // Может изменяться на variability
  // Разворачивается при min и max
  // @ Изменяем volatile и variability, чтобы сделать график более спокойным/буйным
  static getNumByPrevious(
    prev: number,
    volatile: number,
    variability: number,
    min: number,
    max: number
  ): number {
    // Предыдущее += знак*(изменяемость)
    prev += (Math.random() > volatile ? 1 : -1) * (Math.random() * variability);
    // Мы достигли дна. Принудительно останавливаем падение/рост
    if (prev < min) {
      prev = min;
    } else if (prev > max) {
      prev = max;
    }
    // Приступаем к развороту тренда, когда будет 10% до минимума или максимума
    if (prev < min + (max - min) * 0.1) {
      prev += (max - min) * AppComponent.randomNumber(0.03, 0.07);
    } // Прибавляем от 3% до 7%
    else if (prev > max - (max - min) * 0.1) {
      prev -= (max - min) * AppComponent.randomNumber(0.03, 0.07);
    }

    return prev;
  }
  // Генерит 1 партию данных с указанным timestamp
  contactor_gen: boolean;
  balance_gen: boolean;
  temperature_gen: number = AppComponent.randomNumber(-40, 60);
  ACDC_gen: number = AppComponent.randomNumber(0, 1000);
  // Итерация значений нужна, чтобы создавать кастомные изменения на графике
  iter: number = 0;

  genData(timestamp: number) { // Генерит и рисует данные

    this.contactor_gen = AppComponent.genBoolByPrevious(0.4);//Значение изменится с 40% вероятностью
    this.balance_gen =   AppComponent.genBoolByPrevious(0.4);
    this.temperature_gen = AppComponent.getNumByPrevious(this.temperature_gen, 0.4, 5, -40, 60)
    this.ACDC_gen =        AppComponent.getNumByPrevious(this.ACDC_gen, 0.6, 100, 15, 40);
    
    
    // Закидываем значения на график
    this.addTimePointContractor({
      value: this.contactor_gen ? '1' : '0',
      name: new Date(timestamp),
    });
    this.addTimePointBalance({
      value: this.balance_gen ? '1' : '0',
      name: new Date(timestamp),
    });
    this.addTimePointTime0({
      value: `${this.temperature_gen}`,
      name: new Date(timestamp),
    });
    this.addTimePointTime1({
      value: `${this.ACDC_gen}`,
      name: new Date(timestamp),
    });

    // Меняем цвета -- он вроде бы не обновляет значения...
    this.colorChange.domain = [['#ff0000']];
    this.colorChange_Temperature.domain = [
      ['#18D8FF', '#AFDAFC', '#1F75FE', '#0000FF', '#CC0605', '#C10020'][
        Math.round(Math.abs((this.temperature_gen + 20) / 20))
      ],
    ];
    let buff = this.colorChange_Temperature;
    this.colorChange_Temperature = buff;

    this.colorChange_ACDC.domain = [
      ['#000000', '#011465', '#1F75FE', '#1845FF', '#1888FF', '#18D8FF'][
        Math.round(((this.ACDC_gen / 2000) * 100 + 1) / 20)
      ],
    ];
    this.iter++;
  }
  genGlobalCharts(start = +Date.now() - 1000 * 60 * 10, end = Date.now(), amount = 10){
    // Генерируем данные для 30 батарей --> общее
    // Графикс c 30 батареями и total_voltage
    this.total_voltage = 0;
    for (let j = 0; j < 30; j++) {
      const battery1 = AppComponent.randomNumber(1.75, 2.8);

      this.multi.push({
        name: j + 1,
        value: battery1 - 1.75
      });

      this.total_voltage += battery1;// + battery2;
    }
    this.single.push({
      name: 'Заряд батареи',
      value: Math.floor((this.total_voltage - 30 * 1.75) / (30 * 1.05) * 100)
    });
    // Цвет графика 
    this.colorChange_Total.domain = [
      ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00']
      [Math.round(((this.total_voltage - 30 * 1.75) / (30 * 1.05) * 100 + 1) / 20)]
    ];
    
    // Данные для остальных графиков
    for (let i = amount; i > 0; i--) {
      this.genData(end - (end - start) / amount * i);
    }
  }
  //---------------------------------------------------

  addTimePointTime0(
    point = {
      value: (Math.random() * 1000).toFixed(2),
      name: AppComponent.randomDate(new Date(2012, 0, 1), new Date()),
    }
  ) {
    this.time_temp0[0].series.push(point);
    let buff = this.time_temp0[0];
    this.time_temp0 = [buff];
  }
  addTimePointTime1(
    point = {
      value: (Math.random() * 1000).toFixed(2),
      name: AppComponent.randomDate(new Date(2012, 0, 1), new Date()),
    }
  ) {
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


  total_voltage: number = 52.5;
  tooltipText = 'Баттарея №';
  constructor(public server: ServerService, private breakpointObserver:BreakpointObserver){
    this.genGlobalCharts();
  }

  isTabletScreen;
  isSmallScreen;
  isXSmallScreen;
  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Small)
      .subscribe((resp) => (this.isSmallScreen = resp.matches));
    this.breakpointObserver
      .observe(Breakpoints.Medium)
      .subscribe((resp) => (this.isTabletScreen = resp.matches));
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((resp) => (this.isXSmallScreen = resp.matches));

    // Настройка вертикальных разделительных линий для главного графика
    // let divYLines = document.querySelector('div.gridYLines') as HTMLElement;
    // divYLines.style.position = 'absolute';
    // divYLines.style.width   = '2px';
    // divYLines.style.height  = '2px';
    // divYLines.style.outline = 'dashed 2px violet';

    // let svgBarsGroup = document.querySelector('.ng-tns-c161-5');
    // for (let i = 0, l = svgBarsGroup.children.length; i < l; i++) {
    //   if (i % 2 == 0)
    //     (svgBarsGroup.children[i] as HTMLElement).style.boxShadow =
    //       '5px 0 2px 2px black';
    // }

    // this.request();
    // setInterval(() => { this.request(); } , 1000)
  }
  ChangeTemp(temp){
    return temp+"°C";
  }
  ChangeAmper(amper){
    return amper +'A';
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
                "name": "Battery1",
                "value": battery1.value - 1.75
              }, {
                "name": "Battery2",
                "value": battery2.value - 1.75
              }
          ]});
          total_voltage_value += battery1.value + battery2.value;
        }
      console.groupCollapsed('data from server -- app.component');
      // Графикс c 30 батареями и total_voltage
      for (let j = 0; j < lastDataset.voltages.length; j += 2) {
        const battery1 = lastDataset.voltages[j]; // 1 батарейка
        const battery2 = lastDataset.voltages[j + 1]; // 2 батарейка
        this.multi.push({
          name: j / 2 + 1,
          series: [
            {
              name: 'Battery1',
              value: battery1.value - 1.75,
            },
            {
              name: 'Battery2',
              value: battery2.value - 1.75,
            },
          ],
        });
        total_voltage_value += battery1.value + battery2.value;
      }
      this.single.push({
        name: 'Заряд батареи',
        value:
          (total_voltage_value / (1.05 * lastDataset.voltages.length)) * 100,
      });

      // Line charts
      for (let i = 0; i < data.length; i++) {
        const element = data[i]; // 1 по Х
        //console.log(element);
        for (let j = 0; j < element.data.length; j++) {
          const dataset = element.data[j];
          //console.log('dataset :>> ', dataset);
          // temp0 = dataset.temperatures[0].value;
          //console.log('Ampere :>> ', (dataset.total_amp.value).toFixed(2));
          //console.log('contractor :>> ', dataset.contractor ? "Вкл" : "Выкл");
          if (dataset.total_amp.value > 100) continue;

          this.addTimePointTime1({
            value: dataset.total_amp.value.toFixed(2),
            name: new Date(element.timestamp),
          });

          this.addTimePointContractor({
            value: dataset.contractor ? '1' : '0',
            name: new Date(element.timestamp),
          });
        }
        this.addTimePointTime0({
          value: '' + element.data[0].temperatures[this.currentBattery].value,
          name: new Date(element.timestamp),
        });
      }
      console.groupEnd();
    });
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
