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
  selector: 'ngx-chart9',
  templateUrl: './chart9.component.html',
  styleUrls: ['./chart9.component.scss']
})
export class Chart9Component{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "TEAM A",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "TEAM B",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "TEAM C",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      chart: {
        height: 550,
        stacked: false,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          endingShape: 'rounded'
        }
      },
      xaxis: {
        tickPlacement: 'on'
      },
      markers: {
        colors: ['#7f5af0', '', '#f9bc60'],
        strokeColors: 'white',
        strokeWidth: 3,
        hover: {
          size: 7
        }
      },
      fill: {
        colors: ['#00473e', '#7f5af0', '#f9bc60'],
        opacity: [0.85, 0.55, 1],
        gradient: {
          inverseColors: false,
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 90, 200, 250]
        }
      },
      stroke: {
        colors: ['', '#7f5af0', '#f9bc60'],
        width: [0, 4, 5],
        curve: 'smooth'
      },
      title: {
        text: 'Chart 9'
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'bottom',
        markers: {
          fillColors: ['#00473e', '#7f5af0', '#f9bc60']
        }
      },
      tooltip: {
        enabled: true,
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