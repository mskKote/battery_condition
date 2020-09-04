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
  selector: 'ngx-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [55],
      title: {
        text: 'Chart 2',
        offsetY: 35
      },
      chart: {
        height: 380,
        type: "radialBar",
        offsetY: -35
      },
      plotOptions: {
        radialBar: {
          startAngle: -125,
          endAngle: 125,
          dataLabels: {
            name: {
              fontSize: "16px",
            },
            value: {
              fontSize: "22px",
              formatter: (val: number) => val + "%"
            }
          }
        }
      },
      colors: ['blue'],
      fill: {
        type: "gradient",
        gradient: {
          type: 'diagonal1',
          gradientToColors: ["red"],
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 6
      },
      labels: ["Median Ratio"]
    };
  }
}