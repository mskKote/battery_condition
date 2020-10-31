import { Host, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, Observable, BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { of } from 'rxjs/internal/observable/of';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ɵBrowserGetTestability } from '@angular/platform-browser';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
///MODELS
// export class Switcher{
//     contactor_override: boolean;
//     contactor_close: boolean;
//     balancer_override: boolean;
//     balancing_enable: boolean;
// }
export class Contactor {
  contactor_override: boolean;
  contactor_close: boolean;
}
export class Balancer {
  balancer_override: boolean;
  balancing_enable: boolean;
}
export class Tokens {
  jwt: string;
  refreshToken: string;
}
export interface board {
  balancer_override: boolean;
  // balancing_enable: boolean;
  balancing_enabled: boolean;
  // board_id: string;
  // chg_present: boolean;
  contactor0_closed: boolean;
  // contactor1_closed: boolean;
  // contactor_close: boolean;
  contactor_override: boolean;
  controls: any;
  // created_at: string;
  current_ma: number;
  data: data[];
  timestamp: number;
  // v_bat_mv: number;
}
export interface data {
  balancing_enabled: boolean;
  // bms_id: number;
  board_temperature: number;
  created_at: string;
  voltages: number[];
  // temperatures: number[];
  // timestamp: Timestamp<number>;
}
export interface boards {
  boards: string[]
}
// export class totals {
//   data: total[];
//   timestamp: number;
// }
// export class total {
//   total_voltage: val[];
//   total_amp: val;
//   temperatures: val[];
//   voltages: val[];
//   contractor: boolean;
//   created_at: Date;
//   timestamp: Timestamp<number>;
// }
// export class val {
//   index: number;
//   value: number;
// }
///ENDMODELS

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  // static HOST = 'http://80.89.235.39';
  static HOST = 'http://localhost:4200/api';
  // static BOARD_ID = '3737574e430234305d8ff36';
  static BOARD_ID  = ''; // выбранная батарея
  public board_id_emit: BehaviorSubject<string>;
  // public datas: totals[];
  // public boards_ids = ['3737574e430234305d8ff36'];
  public boards_ids = [];
  async getBoardsIds(): Promise<Observable<boards>> {

    const URL: string = ServerService.HOST + '/api/boards'; // Поменять URL
    // console.log('REQUEST URL >> ', URL);
    return this.http.get<boards>(URL);
  }
  //isToggledBalancingListener = new BehaviorSubject(false);
  isToggledBalancing;
  changedState: Observable<any>;
  tgglrContactorStateReg(state: boolean) {
    // 'http://80.89.235.39/api/contactor/3737574e430234305d8ff36/'
    const str: string =
      ServerService.HOST + '/api/contactor/' + ServerService.BOARD_ID + '/';
    // console.log('contactor сменился на: ' + state + ' и пошел в ' + str);
    // let options = {
    //   headers: 'Content-Type = application/json',
    //   withCredentials: true,
    // };
    let contactor = new Contactor();
    contactor.contactor_close = state;
    // contactor.contactor_override = true;
    const contactorStr = JSON.stringify(contactor);
    this.changedState = this.http.post(str, contactorStr);
    this.isToggledBalancing = this.changedState.subscribe((resp) =>
      console.log('contactor changed: ' + state)
    );
  }
  tgglrBalancerStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/balancer/' + ServerService.BOARD_ID + '/';
    // console.log('балансир сменился на: ' + state + ' и пошел в ' + str);
    // let options = {
    //   headers: 'Content-Type = application/json',
    //   withCredentials: true,
    // };
    let balancer = new Balancer();
    // balancer.balancer_override = true;
    balancer.balancing_enable = state;
    const balancerStr = JSON.stringify(balancer);
    this.changedState = this.http.post(str, balancerStr);
    this.isToggledBalancing = this.changedState.subscribe((resp) =>
      console.log('balancer changed: ' + state)
    );
  }
  modeContactorStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/contactor/' + ServerService.BOARD_ID + '/';
    // console.log('балансир сменился на: ' + state + ' и пошел в ' + str);
    // let options = {
    //   headers: 'Content-Type = application/json',
    //   withCredentials: true,
    // };
    let contactor = new Contactor();
    // contactor.contactor_close = false;
    contactor.contactor_override = state;
    const contactorStr = JSON.stringify(contactor);
    this.changedState = this.http.post(str, contactorStr);
    this.isToggledBalancing = this.changedState.subscribe((resp) =>
      console.log('mode cont changed: ' + state)
    );
  }
  modeBalancerStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/balancer/' + ServerService.BOARD_ID + '/';
    // console.log('балансир сменился на: ' + !state + ' и пошел в ' + str);
    // let options = {
    //   headers: 'Content-Type = application/json',
    //   withCredentials: true,
    // };
    let balancer = new Balancer();
    balancer.balancer_override = state;
    // balancer.balancing_enable = false;
    const balancerStr = JSON.stringify(balancer);
    console.log(balancer);
    this.changedState = this.http.post(str, balancerStr);
    this.isToggledBalancing = this.changedState.subscribe((resp) =>
      console.log('mode bal changed: ' + state)
    );
  }

  public IsAuthored: BehaviorSubject<boolean>;
  // Показывает, есть ли real-time
  public IsRealTimeListener: BehaviorSubject<boolean>;
  public IsRealTime: boolean;

  constructor(public http: HttpClient) {
    this.IsAuthored = new BehaviorSubject(false);
    this.IsRealTimeListener = new BehaviorSubject(true);
    this.IsRealTimeListener.subscribe((x) => (this.IsRealTime = x));
    this.board_id_emit = new BehaviorSubject("3737574e430251305d3ff36");
    this.board_id_emit.subscribe(resp => ServerService.BOARD_ID = resp);
  }
  boardLast: Observable<board>;
  voltagesNowAll: number[][];

  public static end: Date;
  public static start: Date;
  // запрос на сервер с помощью фетча
  getLastBmsQuery(): Observable<board> {
    //output: 0,1,2,3,4,5....
    // console.log('getLastBmsQuery :>> ', ServerService.BOARD_ID);
    const str: string = ServerService.HOST + '/api/bms/last' + '?board_id=' + ServerService.BOARD_ID;
    // console.log('str :>> ', str);
    this.boardLast = this.http.get<board>(str);
    // console.log('bms last resp >> ', this.boardLast);
    // this.boardLast.pipe(tap((resp) => {console.log('bms last resp >> ', resp);}))

    return this.boardLast;
  }

  async getDataQuery(
    start_time = '1000',
    end_time = '',
    data = '100'
  ): Promise<Observable<board[]>> {
    // Героическими усилиями осмысленно добавляем 3 часа
    // start_time = `${+start_time + 10800}`;
    // end_time = `${+end_time + 10800}`;

    console.log(new Date(+start_time * 1000), new Date(+end_time * 1000));

    const str: string =
      ServerService.HOST +
      '/api/bms?' +
      '&start_time=' +
      start_time +
      '&end_time=' +
      end_time;
      // '&data=' +
      // data

    console.log('REQUEST URL >> ', str);
    return this.http.get<board[]>(str);
  }
  //LOGIN SECTION
  //
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly IS_AUTH = 'IS_AUTH';
  private loggedUser: string;

  loginError: any;
  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http
      .post<any>(
        ServerService.HOST + '/api/account/login',
        JSON.stringify(user)
      )
      .pipe(
        tap((tokens) =>
          this.doLoginUser(user.username, {
            jwt: tokens.access_token,
            refreshToken: tokens.refresh_token,
          })
        ),
        mapTo(true),
        catchError((error) => {
          console.log('log ERROR ', error.error);
          this.loginError = error.error;
          return of(false);
        })
      );
  }
  logout() {
    return this.http
      .post<any>(ServerService.HOST + '/logout', {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        mapTo(true),
        catchError((error) => {
          console.log(error.error);
          return of(false);
        })
      );
  }
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.IsAuthored.next(false);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
    console.log('tokens:' + tokens + 'user: ' + username);
    this.IsAuthored.next(true);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    this.IsAuthored.next(true);
    localStorage.setItem(this.IS_AUTH, `${this.IsAuthored.getValue()}`);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUserStatus(): boolean {
    return !!localStorage.getItem(this.IS_AUTH);
  }

  refreshToken() {
    return this.http
      .post<any>(ServerService.HOST + '/api/account/tokens/update', {
          access_token: this.getJwtToken(),
          refresh_token: this.getRefreshToken(),
        })
      // .post<any>(ServerService.HOST + '/account/tokens/update', {
      //   access_token: this.getJwtToken(),
      //   refresh_token: this.getRefreshToken(),
      // })
      .pipe(
        tap((tokens: Tokens) => {
          // console.log('tokens refresh >> ', tokens);
          this.storeTokens(tokens)
          // console.log('tokens >> ', tokens);
          // this.storeJwtToken(tokens.jwt);
        })
      );
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  //проверка - зареган ли пользователь
}
