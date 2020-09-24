
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, Observable, BehaviorSubject } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
///MODELS
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
  static HOST = 'http://80.89.235.39';
  // public datas: totals[];
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
}
