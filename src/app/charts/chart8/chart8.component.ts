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
  selector: 'ngx-chart8',
  templateUrl: './chart8.component.html',
  styleUrls: ['./chart8.component.scss']
})
export class Chart8Component{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  
  constructor() {
    this.chartOptions = {
      series: [80, 30, 60],
      labels: ['Social', 'Email', 'Search'],
      chart: {
        type: 'donut',
        height: 230
      },
      title: {
        text: 'Chart 8'
      },
      fill: {
        colors: ['#5A8DEE', '#00CFDD', '#FDAC41']
      },
      stroke: {
        show: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '87%',
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
              total: {
                show: true,
                color: 'black'
              }
            }
          },
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'bottom',
        offsetY: -10,
        markers: {
          fillColors: ['#5A8DEE', '#00CFDD', '#FDAC41']
        }
      }
    };
  }
}