import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, Observable, BehaviorSubject } from 'rxjs';
///MODELS
export class board {
  balancer_override: boolean;
  balancing_enable: boolean;
  balancing_enabled: boolean;
  board_id: string;
  chg_present: boolean;
  contactor0_closed: boolean;
  contactor1_closed: boolean;
  contactor_close: boolean;
  contactor_override: boolean;
  created_at: string;
  current_ma: number;
  data: data[];
  timestamp: Timestamp<number>;
  v_bat_mv: number;
}
export class data {
  balancing_enabled: boolean;
  bms_id: number;
  board_temperature: number;
  created_at: string;
  temperatures: number[];
  timestamp: Timestamp<number>;
}
export class totals {
  data: total[];
  timestamp: number;
}
export class total {
  total_voltage: val[];
  total_amp: val;
  temperatures: val[];
  voltages: val[];
  contractor: boolean;
  created_at: Date;
  timestamp: Timestamp<number>;
}
export class val {
  index: number;
  value: number;
}
///ENDMODELS

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  static HOST = 'http://80.89.235.39';
  public datas: totals[];
  public IsAuthored;
  constructor(public http: HttpClient) {
    this.IsAuthored = new BehaviorSubject(false);
  }
  public static end: Date;
  public static start: Date;
  // запрос на сервер с помощью фетча
  getLastBmsQuery():Observable<board> {
    const str: string = 'http://80.89.235.39/api/bms/last';
    return this.http.get<board>(str);
  }


  async getDataQuery(
    start_time = '1000',
    end_time = '4999999000',
    data = '10'
  ) {
    const str: string =
      ServerService.HOST +
      '/api/bms?' +
      '&start_time=' +
      start_time +
      '&end_time=' +
      end_time +
      '&data=' +
      data;
    let response = await fetch(str, {
      keepalive: false,
    });
    let res = await response.json();
    // let res: totals[] = await response.json();
    return res;
  }
}
