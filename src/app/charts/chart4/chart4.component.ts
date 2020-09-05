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
  selector: 'ngx-chart4',
  templateUrl: './chart4.component.html',
  styleUrls: ['./chart4.component.scss']
})
export class Chart4Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [{
        name: 'Series 1',
        data: [344, -55, -55, -55, -55, -55, -55, -55, -55, -55],
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
        text: 'Chart 4 | Температура от времени'
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
          new Date(1599232519).toLocaleDateString('ru', this.opts),
          new Date(1599296061).toLocaleDateString('ru', this.opts),
          new Date(1599296064).toLocaleDateString('ru', this.opts),
          new Date(1599296067).toLocaleDateString('ru', this.opts),
          new Date(1599296070).toLocaleDateString('ru', this.opts),
          new Date(1599296073).toLocaleDateString('ru', this.opts),
          new Date(1599296076).toLocaleDateString('ru', this.opts),
          new Date(1599296079).toLocaleDateString('ru', this.opts),
          new Date(1599296082).toLocaleDateString('ru', this.opts),
          new Date(1599296085).toLocaleDateString('ru', this.opts),
        ],
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
  opts = {
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  };
}