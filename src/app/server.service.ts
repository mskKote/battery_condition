
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Timestamp, Observable } from 'rxjs';
///MODELS
export class totals {
  data: total[];
  timestamp: number
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
  constructor(public http: HttpClient) {}
  public static end:Date;
  public static start:Date;
  async getDataQuery(start_time = '1000', end_time = '4999999000', data = '10'){
    const str:string =
    ServerService.HOST +
      '/api/bms?' +
      '\&start\_time=' +
      start_time +
      '\&end\_time=' +
      end_time +
      '\&data=' +
      data;
      let response = await fetch(str);
      let res: totals[] = await response.json();
      return res;
  }
}
