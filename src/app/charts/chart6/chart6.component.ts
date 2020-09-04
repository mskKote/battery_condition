import { Component, ViewChild, AfterContentInit } from "@angular/core";
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
  selector: 'ngx-chart6',
  templateUrl: './chart6.component.html',
  styleUrls: ['./chart6.component.scss']
})
export class Chart6Component implements AfterContentInit{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [{
          name: "My-series",
          data: [100, 80, 0, 100, 20, 110]
        }
      ],
      chart: {
        offsetY: -15,
        height: 100,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["white"],
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 30, 70, 100]
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        colors: ['orange'],
        width: 4,
        dashArray: [5]
      },
      title: {
        text: "Chart 6",
        offsetY: 15,
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: 'category',
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun"],
        labels: {
            show: false,
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
        colors: 'orange',
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
        },
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
      }
    };
  }
  
  ngAfterContentInit() {

  }
}
