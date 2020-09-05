import { Component, ViewChild, Output, OnInit, Input, AfterViewInit } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexTooltip,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'ngx-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit{
  @Input() chart3: any
  
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [{
        name: 'Series 1',
        data: [-80, 50, 30, 40, 90, 20, 5, 35, 50, 55],
      }],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 5,
          blur: 3,
          color: '#39DA8A',
          opacity: 0.35
        },
        zoom: {
          enabled: false,
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        colors: ['#39DA8A']
      },
      title: {
        text: 'Chart 3 | Потребление по амперам от времени'
      },
      yaxis: {
        show: true,
        title: {
          text: 'Ампер'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        title: {
          text: 'Время'
        },
        labels: {
            show: true,
        },
        axisBorder: {
            show: false,
        },
        crosshairs: {
            show: true,
        },
        tooltip: {
            enabled: true,
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          }
        },
        yaxis: {
          lines: {
            show: false,
          }
        },
      },
      markers: {
        colors: '#39DA8A',
        strokeColors: 'white',
        strokeWidth: 3,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        marker: {
            show: false,
        },
        x: {
          show: false
        }
      }
    };
  }

  ngOnInit() {
    console.log(this.chart3.yVal);
    setInterval(() => {
      this.updateSeries()
    }, 1000);
  }
  updateSeries() {
    let vals = [];
    for(let i = 0, l = this.chart3.yVal.length; i < l; i++) {
      vals.push(this.chart3.yVal[i])
    }
    this.chartOptions.series[0].data = vals;
    // console.log(this.chartOptions.series[0])
  }
  updateCategories() {
    this.chartOptions.series = [{
      data: [23, 44, 1, 22]
    }];
  }
}