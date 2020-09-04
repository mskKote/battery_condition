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
      // '#47b43a', '#fdfb1d', '#fc4545'
      colors: ['red'],
      fill: {
        type: "gradient",
        gradient: {
          type: "horizontal",
          gradientFromColors: ['#47b43a', '#fdfb1d', '#fc4545'],
          inverseColors: false,
          stops: [0, 50, 100],
          colorStops: []
        }
      },
      stroke: {
        dashArray: 6
      },
      labels: ["Median Ratio"]
    };
  }
}