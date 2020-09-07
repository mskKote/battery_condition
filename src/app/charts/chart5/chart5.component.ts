import { Component, ViewChild } from "@angular/core";
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
  ApexTooltip
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
  selector: 'ngx-chart5',
  templateUrl: './chart5.component.html',
  styleUrls: ['./chart5.component.scss']
})
export class Chart5Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  getDataArr() {
    return [344, -55, -55, -55, -55, -55, -55, -55, -55, -55]
  }
  constructor() {
    this.chartOptions = {
      series: [{
        name: 'Series 1',
        // data: [344, -55, -55, -55, -55, -55, -55, -55, -55, -55],
        data: this.getDataArr()
      }],
      chart: {
        offsetY: 30,
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
        text: 'Температура от времени'
      },
      yaxis: {
        show: true,
        title: {
          text: 'Температура'
        }
      },
      xaxis: {
        type: 'category',
        categories: [
          `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
          `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
          `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
          `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
          `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
          `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
          `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
          `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
          `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
          `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
        ],
        title: {
          text: 'Время'
        },
        labels: {
            show: true,
            style: {
              fontSize: 'auto',
            },
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
}