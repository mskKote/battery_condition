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
  ApexTooltip,
  ApexPlotOptions,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  ApexFill
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
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill
};

@Component({
  selector: 'ngx-chart5',
  templateUrl: './chart5.component.html',
  styleUrls: ['./chart5.component.scss']
})
export class Chart5Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [{
          name: "Marine Sprite",
          data: [12, 50, 32, 89, 65, 173, 83, 20]
        }],
      chart: {
        width: '100%',
        offsetX: -5,
        type: "area",
        height: 280,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: {
            enabled: false,
        }
      },
      markers: {
        colors: '#ffa000',
        strokeColors: 'white',
        strokeWidth: 3,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      stroke: {
        show: true,
        colors: ['#ffa000'],
        width: 5,
      },
      fill: {
        colors: ['#ffca28'],
        type: "gradient",
        gradient: {
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 90, 100]
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
      title: {
        text: "Chart 5"
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [0, 25, 75, 100, 125, 150, 175, 200],
        labels: {
          show: true,
        },
        axisBorder: {
            show: false,
        },
        crosshairs: {
            show: false,
        },
        tooltip: {
            enabled: true,
        }
      },
      dataLabels: {
        enabled: false
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
    }
  }
}