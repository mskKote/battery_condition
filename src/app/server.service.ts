
import { Host, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, Observable, BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { of } from 'rxjs/internal/observable/of';
import { catchError, mapTo, tap } from 'rxjs/operators';
///MODELS
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
  voltages: number[]
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
  static HOST     = 'http://80.89.235.39';
  static BOARD_ID = '3737574e430234305d8ff36';
  // public datas: totals[];

  isOverrideListener = new BehaviorSubject(false);
  changedState: Observable<any>
  tgglrStateReg(state: boolean){
    const str: string = ServerService.HOST + '/api/switcher/' + ServerService.BOARD_ID;
    this.changedState = this.http.post(str, {
      // автоматический режим
    })
  }

  public IsAuthored;
  constructor(public http: HttpClient) {
    this.IsAuthored = new BehaviorSubject(false);
  }
  boardLast:Observable<board>
  voltagesNowAll:number[][];

  public static end: Date;
  public static start: Date;
  // запрос на сервер с помощью фетча
  getLastBmsQuery():Observable<board> {

    //output: 0,1,2,3,4,5....
    const str: string = 'http://80.89.235.39/api/bms/last';
    this.boardLast = this.http.get<board>(str);

    return this.boardLast
  }


  async getDataQuery(
    start_time = '1000',
    end_time = '',
    data = '10'
  ):Promise<Observable<board[]>> {
    const str: string =
      ServerService.HOST +
      '/api/bms?' +
      '&start_time=' +
      start_time +
      '&end_time=' +
      end_time +
      '&data=' +
      data;
      return this.http.get<board[]>(str);
  }
  //LOGIN SECTION
  //
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  login(user:{username:string,password:string}):Observable<boolean>{
    return this.http.post<any>(ServerService.HOST+'/login',user)
    .pipe(
      tap(tokens=> this.doLoginUser(user.username,tokens)),
      mapTo(true),
      catchError(error=>{
        alert(error.error);
        return of(false);
      })
    )
  }
  logout() {
    return this.http.post<any>(ServerService.HOST+'/logout', {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  refreshToken() {
    return this.http.post<any>(ServerService.HOST+'/refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  //проверка - зареган ли пользователь
  isLoggedIn(){
    return 5;
  }

}
