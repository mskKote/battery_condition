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
      series: [100],
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
          startAngle: -90,
          endAngle: 90,
          dataLabels: {
            name: {
              offsetY: -25,
              fontSize: "16px",
              colour: 'black',
              
            },
            value: {
              offsetY: -20,
              fontSize: "22px",
              formatter: (val: number) => val + "%"
            },
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          inverseColors: true,
          colorStops: [
            {
              offset: 0,
              color: "#00ff00",
              opacity: 1
            },
            {
              offset: 20,
              color: "#b0ff00",
              opacity: 1
            },
            {
              offset: 50,
              color: "#f9ff00",
              opacity: 1
            },
            {
              offset: 80,
              color: "#ffaf00",
              opacity: 1
            },
            {
              offset: 100,
              color: "#ff0000",
              opacity: 1
            },
          ]
        }
      },
      stroke: {
        dashArray: 6
      },
      labels: ["Уровень зарядки"]
    };
  }
}