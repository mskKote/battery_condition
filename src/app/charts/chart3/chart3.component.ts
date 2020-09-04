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
  selector: 'ngx-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements AfterContentInit{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [{
          name: "New clients",
          data: [75, 150, 225, 200, 35, 50, 150, 180, 50, 150, 240, 140, 75, 35, 60, 120]
        },{
          name: "Retained clients",
          data: [-100, -55, -40, -120, -70, -40, -60, -50, -70, -30, -60, -40, -50, -70, -40, -50]
        }
      ],
      chart: {
        height: 345,
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          startingShape: 'rounded',
          endingShape: 'rounded',
          colors: {
            ranges: [
              {
                from: -150,
                to: 0,
                color: "#FEB019"
              }
            ]
          },
          columnWidth: "35%"
        }
      },
      title: {
        text: "Chart 3"
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
      yaxis: {
        show: false
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"],
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
  
  ngAfterContentInit() {

  }
}