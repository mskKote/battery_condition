import { Component, ViewChild } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexYAxis,
//   ApexXAxis,
//   ApexTitleSubtitle,
//   ApexStroke,
//   ApexGrid,
//   ApexMarkers,
//   ApexTooltip,
//   ApexPlotOptions,
//   ApexResponsive,
//   ApexDataLabels,
//   ApexLegend,
//   ApexFill,
// } from 'ng-apexcharts';
import { ServerService } from 'src/app/server.service';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
//   stroke: ApexStroke;
//   grid: ApexGrid;
//   markers: ApexMarkers;
//   tooltip: ApexTooltip;
//   plotOptions: ApexPlotOptions;
//   responsive: ApexResponsive;
//   dataLabels: ApexDataLabels;
//   legend: ApexLegend;
//   fill: ApexFill;
// };

@Component({
  selector: 'ngx-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component {
  // options
  // yAxisTicks: any[] = this.getArrY(175, 280, 5);
  yAxisTicks: any[] = this.getArrY(1.75, 2.8, 0.05);
  // yAxisTicks: any[] = [1.75, 1.8, 4, 5];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Заряд От Всех Батареек';
  animations: boolean = false;
  roundDomains: boolean = false;
  colorScheme = {
    domain: ['#6391ef', 'deeppink']
  };

 onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.genData();
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  multi:any[];
  genData() {    // Генерируем данные
    this.multi = [];
    for (let i = 0; i < 15; i++) {
      this.multi.push(    {
        name: 'USA' + i,
        series: [
          {
            name: '2010',
            value: 1.75 + Math.random() * 1.05
          },
          {
            name: '2011',
            value: 1.75 + Math.random() * 1.05
          }
        ]
      });
    }
  }

  constructor(public server: ServerService){
    this.genData();
    setInterval( () => {this.genData();}, 1000);
  }

  getArrY(min: number, max: number, dist: number) {
    let arr = [];
    for (let i = 0, l = (max - min) / dist; i < l; i++) {
      arr.push(min + i * dist)
    }
    arr.push(max)
    console.log(arr)
    return arr;
  }
  
  randomSeries() {
    let arr = [];
    for (let i = 0; i < 15; i++) {
      let val = (1.75 + Math.random() * (2.8 - 1.75)).toFixed(2);
      arr.push(val);
    }
    return arr;
  }
  // brightness: {} = {
  //   low: [],
  // };
}