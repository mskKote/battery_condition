import { ServerService, totals } from './server.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'пары батарей';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Заряд От Всех Батареек';
  animations: boolean = false;

  colorScheme = {
    domain: ['royalblue', 'deeppink']
  };

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.genData();
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  multi:any[];
  genData() {    // Генерируем данные
    this.multi = [];
    for (let i = 0; i < 15; i++) {
      this.multi.push(    {
        "name": i,
        "series": [
          {
            "name": "2010",
            "value": 1.75 + Math.random()*1.05
          },
          {
            "name": "2011",
            "value": 1.75 + Math.random()*1.05
          }
        ]
      });
    }
  }

  constructor(public server: ServerService){
    this.genData();
    setInterval( () => {this.genData();}, 1000);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.server.getDataQuery()
        .then((d: totals[]) => {
          console.groupCollapsed('data from server -- app.component');
          console.log(d);
          console.groupEnd();
        })
    }, 2000)
  }

  contractor: boolean = true;
  switcher: boolean = false;
  clickContractor() {
    this.genData();
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.genData();
    this.switcher = !this.switcher;
  }

}
