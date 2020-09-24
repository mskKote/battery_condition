import { ServerService, board, data } from './server.service';
import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Timestamp } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
// Если сделать стандартный импорт - вылетит ошибка, поэтому так
declare var jQuery: any;

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

  clickedBtnToggle: HTMLElement;
  clickedBtnTurn: HTMLElement;
  contactorTog: boolean = false;
  balancingTog: boolean = false;
  turnModeContactor: boolean = false;
  turnModeBalancing: boolean = false;

  //---------------------------------------------------Переключение тоглеров
  turnMode(e: any) {
    e.preventDefault()

    this.clickedBtnTurn = e.target;

    if (this.clickedBtnTurn.id == 'modeContactor') {
      if(this.clickedBtnTurn.classList.contains('turnAutoOn')){
        this.clickedBtnTurn.classList.remove('turnAutoOn');
      } else {
        this.clickedBtnTurn.classList.add('turnAutoOn');
      }
      this.turnModeContactor = !this.turnModeContactor;
    }

    if(this.clickedBtnTurn.id == 'modeBalancing') {
      if(this.clickedBtnTurn.classList.contains('turnAutoOn')){
        this.clickedBtnTurn.classList.remove('turnAutoOn');
      } else {
        this.clickedBtnTurn.classList.add('turnAutoOn');
      }
      this.turnModeBalancing = !this.turnModeBalancing;
    }
  }
  onSwitch(e: any) {
    e.preventDefault()

    this.clickedBtnToggle = e.target;

    // Проверка статуса контактора
    if (
      this.clickedBtnToggle.id == 'toggle_contactor' &&
      this.turnModeContactor == false
    ) {
      jQuery('#modal-contactor').modal('show');
    }

    // Проверка статуса балансировки
    if (
      this.clickedBtnToggle.id == 'toggle_balancing' &&
      this.turnModeBalancing == false
    ) {
      jQuery('#modal-balancing').modal('show');
    }
  }
  confirmed(e: any) {
    if (e.target.classList.contains('contactor')) {
      if (this.contactorTog) this.clickedBtnToggle.classList.remove('clicked');
      else this.clickedBtnToggle.classList.add('clicked');

      this.contactorTog = !this.contactorTog;
    }
    if (e.target.classList.contains('balancing')) {
      if (this.balancingTog) this.clickedBtnToggle.classList.remove('clicked');
      else this.clickedBtnToggle.classList.add('clicked');

      this.balancingTog = !this.balancingTog;
    }
  }

  dateRange: any;
  receiveDateRange(event: any) {
    this.dateRange = event;
    // let timeStart=  +this.dateRange['start'];

    // this.nullify();
    // this.iter = 0;
    // this.genGlobalCharts(this.dateRange.start, this.dateRange.end);
  }

  batteryIndex: number;
  receiveBatteryIndex(index: number){
    this.batteryIndex = index;
    console.log(this.batteryIndex);
  }


  nullify() {
    this.time_temp0 = [{
        name: 'Температура 1',
        series: [],
      }, {
        name: 'Температура 2',
        series: [],
      }, {
        name: 'Температура 3',
        series: [],
      }
    ];
    this.ACDC = [{
        name: 'Сила тока',
        series: [],
      },
    ];
    this.balance = [{
        name: 'Балансировка',
        series: [],
      },
    ];
    this.contactor = [{
        name: 'Контактор',
        series: [],
      },
    ];
    this.multi = [];
    this.single = [];
  }

  ChangeTemp(temp) {
    return temp + '°C';
  }
  ChangeAmper(amper) {
    return amper + 'A';
  }

  // Главный график
  yAxisTicksArr: any[] = this.getArrY(0, 1.05, 0.15);
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = false;
  xAxisLabel: string = '';
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
    return (52.5 + (84 - 52.5) * (val / 100)).toFixed(2) + 'V';
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
  showTimeline: boolean = true;
  linearCurveCardinal = shape.curveCardinal;
  linearCurveStep = shape.curveStepAfter;
  amperTicks: any[] = [0, 0.01, 0.02, 0.03, 0.04];
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;
  colorChange = { domain: [] };
  colorChange_Total = { domain: [] };
  colorChange_ACDC = { domain: [] };
  colorScheme = {
    domain: ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'],
    // domain: ['#ff615e', '#ffc13b', '#e0e356', '#c1ff38', '#61ff61'], // Более тусклая гамма
  };
  schemeType: string = 'linear';
  timeframe: string = 'Время'; // Нужно изменять мс/cек/мин/час/день/неделя/месяц

  time_temp0: any[];
  ACDC: any[];
  balance: any[];
  contactor: any[];
  multi: any[] = [];
  single: any[] = [];
  batteries: any[] = new Array(30);

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
  temperature_gen: number[] = [
    // Можно вручную задать стартовые значения
    AppComponent.randomNumber(-40, 60),
    AppComponent.randomNumber(-40, 60),
    AppComponent.randomNumber(-40, 60),
    AppComponent.randomNumber(-40, 60),
    AppComponent.randomNumber(-40, 60),
  ];
  ACDC_gen: number = AppComponent.randomNumber(0, 1000);
  // Итерация значений нужна, чтобы создавать кастомные изменения на графике
  iter: number = 0;

  total_voltage: number = 52.5;
  tooltipText = 'Баттарея №';

  genData(timestamp: number) {

    // Закидываем значения на график
    this.addTimePoint(this.contactor, {
      value: AppComponent.genBoolByPrevious(0.4) ? '1' : '0',
      name: new Date(timestamp),
    });
    this.addTimePoint(this.balance, {
      value: AppComponent.genBoolByPrevious(0.4) ? '1' : '0',
      name: new Date(timestamp),
    });
    //---------Создаём параметры графиков
    //3 примерно равных значения (+-1-3) + 1 сильный пик
    if (this.iter < 5)
      this.temperature_gen[0] = AppComponent.getNumByPrevious(this.temperature_gen[0], 0.7, 4, -40, 60);
    else if (this.iter == 6 || this.iter == 8)
      this.temperature_gen[0] += (Math.random() < 0.5 ? 1 : -1) * 40;
    else
      this.temperature_gen[0] = AppComponent.getNumByPrevious(this.temperature_gen[0], 0.5, 10, -40, 60);

    if (this.temperature_gen[0] < -40) this.temperature_gen[0] = -40;
    else if (this.temperature_gen[0] > 60) this.temperature_gen[0] = 60;
    // Все равные значения (+-1)
    this.temperature_gen[1] = AppComponent.getNumByPrevious(this.temperature_gen[1], 0.75, 1.5, -40, 60);
    // Только пики +-30
    this.temperature_gen[2] = AppComponent.getNumByPrevious(this.temperature_gen[2], 0.8, 30, -40, 60);
    // Равномерно растущий и убывающий графики
    this.temperature_gen[3] = AppComponent.getNumByPrevious(this.temperature_gen[3], 0.3, 5, -40, 60);
    this.temperature_gen[4] = AppComponent.getNumByPrevious(this.temperature_gen[4], 0.3, 5, -40, 60);

    for (let i = 0; i < this.time_temp0.length; i++) {
      this.time_temp0[i].series.push({
        value: `${Math.round(this.temperature_gen[i] * 100) / 100}`,
        name: new Date(timestamp),
      });
    }

    if (this.iter < 6)
      this.ACDC_gen = AppComponent.getNumByPrevious(this.ACDC_gen, 0.7, 10, 15, 40);
    else
      this.ACDC_gen = AppComponent.getNumByPrevious(this.ACDC_gen, 0.7, 10, 15, 25);
    this.addTimePoint(this.ACDC, {
      value: `${this.ACDC_gen}`,
      name: new Date(timestamp),
    });

    // Меняем цвета -- он вроде бы не обновляет значения...
    this.colorChange.domain = ['#ff0000'];

    this.colorChange_ACDC.domain = [];
    this.colorChange_ACDC.domain.push([
      ['#000000', '#011465', '#1F75FE', '#1845FF', '#1888FF', '#18D8FF'][
        Math.round((this.ACDC_gen - 15) / 5)
      ],
    ]);
    this.iter++;
  }
  genGlobalCharts(
    start = +Date.now() - 1000 * 60 * 10,
    end = Date.now(),
    amount = 10
  ) {
    // Генерируем данные для 30 батарей --> общее
    // Графикс c 30 батареями и total_voltage
    this.total_voltage = 0;

    for (let j = 0; j < 15; j++) {
      const battery1 = AppComponent.randomNumber(1.75, 2.8);
      const battery2 = AppComponent.randomNumber(1.75, 2.8);

      this.multi.push({
        name: (j + 1),
        series: [
          {
            name: 'first',
            value: battery1 - 1.75,
            number: j * 2,
          },
          {
            name: 'second',
            value: battery2 - 1.75,
            number: j * 2 + 1,
          },
        ],
      });

      this.total_voltage += battery1 + battery2;
    }
    this.single.push({
      name: 'Заряд батареи',
      value: Math.floor(((this.total_voltage - 30 * 1.75) / (30 * 1.05)) * 100),
    });
    // Цвет графика
    this.colorChange_Total.domain = [
      ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'][
        Math.round(((this.total_voltage - 30 * 1.75) / (30 * 1.05)) * 5 - 1)
      ],
    ];

    // Данные для остальных графиков
    for (let i = amount; i > 0; i--) {
      this.genData(end - ((end - start) / amount) * i);
    }
  }

  addTimePoint(chart, point, index = 0) {
    chart[index].series.push(point);
    let buff = chart;
    chart = buff;
  }
  //---------------------------------------------------Аутентификация

  loginForm: FormGroup;
  TryAuth($event){
    console.log('object :>> ', $event);
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  IsAuthored;
  IsWrong = false;
  login(): void {
    if(this.loginForm.value.email=="battery@condition.ru"&& this.loginForm.value.password=="12354"){
      this.server.IsAuthored.next(true);
      this.IsWrong = false;
    }else{
      this.IsWrong = true;
    }
  }

  //---------------------------------------------------Старт
  constructor(private fb: FormBuilder,
    public server: ServerService,
    private breakpointObserver: BreakpointObserver
  ) {
    server.IsAuthored.subscribe((resp)=>this.IsAuthored=resp);
    // this.nullify();
    // this.genGlobalCharts();
  }

  BoardLast:Observable<board>;
  isTabletScreen;
  isSmallScreen;
  isXSmallScreen;

  ngOnInit() {
    // Запрос -- ТЕСТ -- начало
    this.BoardLast = this.server.getLastBmsQuery();
    const source = interval(1000);
    const subscribe = source.subscribe(val =>{

      this.BoardLast.subscribe((resp)=> {this.drawServerData(resp);})});
   //console.log(resp)
    // Запрос -- ТЕСТ -- конец
    this.initForm();
    this.breakpointObserver
      .observe(Breakpoints.Small)
      .subscribe((resp) => (this.isSmallScreen = resp.matches));
    this.breakpointObserver
      .observe(Breakpoints.Medium)
      .subscribe((resp) => (this.isTabletScreen = resp.matches));
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((resp) => (this.isXSmallScreen = resp.matches));

    // this.request();
    // setInterval(() => { this.request(); } , 1000)
  }
  Now:string;
  isFirst: boolean = true;
  drawServerData(data: board) {
    // this.server.getDataQuery().then((data) => {
      // Десереализация -- начало
      this.Now = `${new Date(data.timestamp*1000).getDate()}/${new Date(data.timestamp*1000).getMonth()}/${new Date(data.timestamp*1000).getFullYear()}  ${new Date(data.timestamp*1000).getHours()}:${new Date(data.timestamp*1000).getMinutes()}:${new Date(data.timestamp*1000).getSeconds()}`;
      let newACDC = data.current_ma/1000;
      let dataArray: data[] = data.data;
      let voltages: number[] = [];
      let contactor: boolean = data.contactor0_closed;
      let balancing: boolean = data.balancing_enabled; // балансировка есть во всех объектах даты, но балансировка синхронна, так что беру 1 значение
      let contactorOverride: boolean = data.contactor_override;
      let balancingOverride: boolean = data.balancer_override;

      let boardsTemp: number[] = [];
      let timestamp: number = data.timestamp;

      for(let i = 0; i < dataArray.length; i++){
        // Берём 30 вольтажей
        for(let j = 0, len = dataArray[i].voltages.length; j < len; j++)
          voltages.push(dataArray[i].voltages[j]);
        // Берём температру
        boardsTemp.push(dataArray[i].board_temperature);
      }

      // console.groupCollapsed('data from JSON')

      // console.log('dataArray >> ', dataArray);
      // console.log('voltages :>> ', voltages);
      // console.log('newACDC >> ', newACDC);

      // console.log('contactor >> ', contactor);
      // console.log('balancing >> ', balancing);
      // console.log('contactorOverride >> ', contactorOverride);
      // console.log('balancingOverride >> ', balancingOverride);
      // console.log('timestamp >> ', timestamp);
      // console.groupEnd()
      // Десереализация -- конец
      if (this.isFirst) {
        this.nullify();
        this.isFirst = false;
      }
      // this.genData(timestamp*1000);
      this.multi = [];
      this.single = [];
      let total_voltage_value = 0;
      // Графикс c 30 батареями и total_voltage
      for (let j = 0; j < voltages.length; j += 2) {
        const battery1 = voltages[j]; // 1 батарейка
        const battery2 = voltages[j + 1]; // 2 батарейка

        this.multi.push({
          name: j  + 2,
          series: [{
              name: 'first',
              value: battery1 - 1.75,
              number: j + 1
            }, {
              name: 'second',
              value: battery2 - 1.75,
              number: j + 2
            }]
        });
        total_voltage_value += battery1 + battery2;
      }

      //------------------График с зарядом батареи
      this.single.push({//Значение
        name: 'Заряд батареи',
        value: Math.floor(((total_voltage_value - 30 * 1.75) / (30 * 1.05)) * 100),
      });
      this.colorChange_Total.domain = [// Цвет графика
        ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'][
          Math.floor(((total_voltage_value - 30 * 1.75) / (30 * 1.05)) * 5)
        ],
      ];

      //------------------Контактор и балансировка
      this.addTimePoint(this.contactor, {
        value: contactor ? '1' : '0',
        name: new Date(timestamp*1000),
      });
      this.addTimePoint(this.balance, {
        value: balancing ? '1' : '0',
        name: new Date(timestamp*1000),
      });
      this.colorChange.domain = ['#ff0000'];

      //------------------Сила тока
      this.addTimePoint(this.ACDC, {
        value: `${newACDC}`,
        name: new Date(timestamp*1000),
      });

      this.colorChange_ACDC.domain = [];
      this.colorChange_ACDC.domain.push([
        ['#000000', '#011465', '#1F75FE', '#1845FF', '#1888FF', '#18D8FF']
        [Math.floor((newACDC - 15) / 5)],
      ]);

      //------------------Температуры
      for (let i = 0; i < boardsTemp.length; i++) {
        this.time_temp0[i].series.push({
          value: `${Math.floor(boardsTemp[i] * 100) / 100}`,
          name: new Date(timestamp*1000),
        });
      }

      // Добавление значений
      let buff;
      buff = this.ACDC[0].series;
      this.ACDC = [{
        name: 'Сила тока',
        series: [...buff],
      }];

      buff = [
        this.time_temp0[0].series,
        this.time_temp0[1].series,
        this.time_temp0[2].series
      ]
      this.time_temp0 = [{
        name: 'Температура 1',
        series: [...buff[0]],
      }, {
        name: 'Температура 2',
        series: [...buff[1]],
      }, {
        name: 'Температура 3',
        series: [...buff[2]],
      }
      ];
      buff = this.balance[0].series;
      this.balance = [{
        name: 'Балансировка',
        series: [...buff],
      }];
      buff = this.contactor[0].series;
      this.contactor = [{
        name: 'Контактор',
        series: [...buff],
    }];
  }

  getArrY(min: number, max: number, dist: number) {
    let arr = [];
    for (let i = 0, l = (max - min) / dist; i < l; i++)
      arr.push(min + i * dist);
    arr.push(max);
    return arr;
  }
}
