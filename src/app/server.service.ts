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
  static HOST = 'http://80.89.235.39';
  static BOARD_ID = '3737574e430234305d8ff36';
  // public datas: totals[];

  //isToggledBalancingListener = new BehaviorSubject(false);
  isToggledBalancing;
  changedState: Observable<any>;
  tgglrContactorStateReg(state: boolean) {
    // 'http://80.89.235.39/api/contactor/3737574e430234305d8ff36/'
    const str: string =
      ServerService.HOST + '/api/contactor/' + ServerService.BOARD_ID;
    // console.log('contactor сменился на: ' + state + ' и пошел в ' + str);
    let options = {
      headers: 'Content-Type = application/json',
      withCredentials: true,
    };
    let contactor = new Contactor();
    contactor.contactor_close = state;
    contactor.contactor_override = true;
    const contactorStr = JSON.stringify(contactor);
    this.changedState = this.http.post(str, contactorStr);
    // this.isToggledBalancing = this.changedState.subscribe((resp) =>
    //   console.log('contactor changed: ' + state)
    // );
  }
  tgglrBalancerStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/balancer/' + ServerService.BOARD_ID;
    // console.log('балансир сменился на: ' + state + ' и пошел в ' + str);
    let options = {
      headers: 'Content-Type = application/json',
      withCredentials: true,
    };
    let balancer = new Balancer();
    balancer.balancer_override = true;
    balancer.balancing_enable = state;
    const balancerStr = JSON.stringify(balancer);
    this.changedState = this.http.post(str, balancerStr);
    // this.isToggledBalancing = this.changedState.subscribe((resp) =>
    //   console.log('balancer changed: ' + state)
    // );
  }
  modeContactorStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/contactor/' + ServerService.BOARD_ID;
    // console.log('балансир сменился на: ' + state + ' и пошел в ' + str);
    let options = {
      headers: 'Content-Type = application/json',
      withCredentials: true,
    };
    let contactor = new Contactor();
    contactor.contactor_close = false;
    contactor.contactor_override = state;
    const contactorStr = JSON.stringify(contactor);
    this.changedState = this.http.post(str, contactorStr);
    // this.isToggledBalancing = this.changedState.subscribe((resp) =>
    //   console.log('balancer changed: ' + state)
    // );
  }
  modeBalancerStateReg(state: boolean) {
    const str: string =
      ServerService.HOST + '/api/balancer/' + ServerService.BOARD_ID;
    // console.log('балансир сменился на: ' + !state + ' и пошел в ' + str);
    let options = {
      headers: 'Content-Type = application/json',
      withCredentials: true,
    };
    let balancer = new Balancer();
    balancer.balancer_override = !state;
    balancer.balancing_enable = false;
    const balancerStr = JSON.stringify(balancer);
    console.log(balancer);
    this.changedState = this.http.post(str, balancerStr);
    // this.isToggledBalancing = this.changedState.subscribe((resp) =>
    //   console.log('balancer changed: ' + state)
    // );
  }

  public IsAuthored: BehaviorSubject<boolean>;
  // Показывает, есть ли real-time
  public IsRealTimeListener: BehaviorSubject<boolean>;
  public IsRealTime: boolean;

  constructor(public http: HttpClient) {
    this.IsAuthored = new BehaviorSubject(false);
    this.IsRealTimeListener = new BehaviorSubject(true);
    this.IsRealTimeListener.subscribe((x) => (this.IsRealTime = x));
  }
  boardLast: Observable<board>;
  voltagesNowAll: number[][];

  public static end: Date;
  public static start: Date;
  // запрос на сервер с помощью фетча
  getLastBmsQuery(): Observable<board> {
    //output: 0,1,2,3,4,5....
    const str: string = 'http://80.89.235.39/api/bms/last';
    this.boardLast = this.http.get<board>(str);

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
      .post<any>(ServerService.HOST + '/refresh', {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.jwt);
        })
      );
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  //проверка - зареган ли пользователь
}
