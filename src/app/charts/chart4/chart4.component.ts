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
  selector: 'ngx-chart4',
  templateUrl: './chart4.component.html',
  styleUrls: ['./chart4.component.scss']
})
export class Chart4Component implements AfterContentInit{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [{
          name: "My-series",
          data: [50, 100, 0, 60, 20, 30]
        }
      ],
      chart: {
        height: 100,
        offsetY: -25,
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
        colors: ['#8D77FE'],
        width: 4
      },
      title: {
        text: "Chart 4",
        offsetY: 25,
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
        colors: '#8D77FE',
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