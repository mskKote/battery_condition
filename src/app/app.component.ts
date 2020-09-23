import { ServerService, totals, board,data} from './server.service';
import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
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

  loginForm: FormGroup;

  clickedBtnToggle: HTMLElement;
  clickedBtnTurn: HTMLElement;
  contactor: boolean = false;
  balancing: boolean = false;
  turnModeContactor: boolean = false;
  turnModeBalancing: boolean = false;
  TryAuth($event){
    console.log('object :>> ', $event);
  }
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
      if (this.contactor) this.clickedBtnToggle.classList.remove('clicked');
      else this.clickedBtnToggle.classList.add('clicked');

      this.contactor = !this.contactor;
    }
    if (e.target.classList.contains('balancing')) {
      if (this.balancing) this.clickedBtnToggle.classList.remove('clicked');
      else this.clickedBtnToggle.classList.add('clicked');

      this.balancing = !this.balancing;
    }
  }

  dateRange: any;
  receiveDateRange(event: any) {
    this.dateRange = event;
    this.nullify();
    this.iter = 0;
    this.genGlobalCharts(this.dateRange.start, this.dateRange.end);
  }

  batteryIndex: number;
  receiveBatteryIndex(index: number){
    this.batteryIndex = index;
    console.log(this.batteryIndex);
  }
  

  nullify() {
    // this.colorChange_Temperature.domain = [];
    this.time_temp0 = [
      {
        name: 'Температура 1',
        series: [],
      },
      {
        name: 'Температура 2',
        series: [],
      },
      {
        name: 'Температура 3',
        series: [],
      },
      {
        name: 'Температура 4',
        series: [],
      },
      {
        name: 'Температура 5',
        series: [],
      },
    ];
    this.ACDC = [
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
        name: 'Контактор',
        series: [],
      },
    ];
    this.multi = [];
    this.single = [];
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
  // colorChange_Temperature = { domain: [] };
  colorChange_ACDC = { domain: [] };
  colorScheme = {
    domain: ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'],
  };
  schemeType: string = 'linear';
  timeframe: string = 'Время'; // Нужно изменять мс/cек/мин/час/день/неделя/месяц

  time_temp0: any[];
  ACDC: any[];
  balance: any[];
  contractor: any[];
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
    // Генерит и рисует данные

    // Закидываем значения на график
    this.addTimePoint(this.contractor, {
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
      this.temperature_gen[0] = AppComponent.getNumByPrevious(
        this.temperature_gen[0],
        0.7,
        4,
        -40,
        60
      );
    else if (this.iter == 6 || this.iter == 8)
      this.temperature_gen[0] += (Math.random() < 0.5 ? 1 : -1) * 40;
    else
      this.temperature_gen[0] = AppComponent.getNumByPrevious(
        this.temperature_gen[0],
        0.5,
        10,
        -40,
        60
      );

    if (this.temperature_gen[0] < -40) this.temperature_gen[0] = -40;
    else if (this.temperature_gen[0] > 60) this.temperature_gen[0] = 60;
    // Все равные значения (+-1)
    this.temperature_gen[1] = AppComponent.getNumByPrevious(
      this.temperature_gen[1],
      0.75,
      1.5,
      -40,
      60
    );
    // Только пики +-30
    this.temperature_gen[2] = AppComponent.getNumByPrevious(
      this.temperature_gen[2],
      0.8,
      30,
      -40,
      60
    );
    // Равномерно растущий и убывающий графики
    this.temperature_gen[3] = AppComponent.getNumByPrevious(
      this.temperature_gen[3],
      0.3,
      5,
      -40,
      60
    );
    this.temperature_gen[4] = AppComponent.getNumByPrevious(
      this.temperature_gen[4],
      0.3,
      5,
      -40,
      60
    );

    for (let i = 0; i < this.time_temp0.length; i++) {
      this.time_temp0[i].series.push({
        value: `${Math.round(this.temperature_gen[i] * 100) / 100}`,
        name: new Date(timestamp),
      });
    }

    if (this.iter < 6)
      this.ACDC_gen = AppComponent.getNumByPrevious(
        this.ACDC_gen,
        0.7,
        10,
        15,
        40
      );
    else
      this.ACDC_gen = AppComponent.getNumByPrevious(
        this.ACDC_gen,
        0.7,
        10,
        15,
        25
      );
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
        name: j + 1,
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

  //---------------------------------------------------

  addTimePoint(chart, point, index = 0) {
    chart[index].series.push(point);
    let buff = chart;
    chart = buff;
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
  constructor(private fb: FormBuilder,
    public server: ServerService,
    private breakpointObserver: BreakpointObserver
  ) {
    server.IsAuthored.subscribe((resp)=>this.IsAuthored=resp)
    this.nullify();
    this.genGlobalCharts();
  }
  BoardLast:Observable<board>;
  isTabletScreen;
  isSmallScreen;
  isXSmallScreen;
  ngOnInit() {
    // Запрос -- ТЕСТ -- начало
    this.BoardLast = this.server.getLastBmsQuery();
    this.BoardLast.subscribe((resp)=>console.log(resp))
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
  ChangeTemp(temp) {
    return temp + '°C';
  }
  ChangeAmper(amper) {
    return amper + 'A';
  }

  getArrY(min: number, max: number, dist: number) {
    let arr = [];
    for (let i = 0, l = (max - min) / dist; i < l; i++)
      arr.push(min + i * dist);
    arr.push(max);
    return arr;
  }
}
