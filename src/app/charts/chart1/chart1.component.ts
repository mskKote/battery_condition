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
  selector: 'ngx-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [{
        name: "Marine Sprite",
        data: [1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85, 1.85]
      },{
        name: "Marine Sprite-2",
        data: [1.85, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75, 2.75]
      }],
      chart: {
        offsetY: -10,
        type: "bar",
        height: 700,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          startingShape: 'flat',
          endingShape: 'rounded',
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          inverseColors: true,
          colorStops: [
            {
              offset: 1.75,
              color: "#00ff00",
              opacity: .75
            },
            {
              offset:  1.95,
              color: "#b0ff00",
              opacity: .75
            },
            {
              offset:  2.15,
              color: "#f9ff00",
              opacity: .75
            },
            {
              offset:  2.45,
              color: "#ffaf00",
              opacity: .75
            },
            {
              offset:  2.75,
              color: "#ff0000",
              opacity: .75
            },
          ]
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
        offsetY: 10,
        text: "Chart 1 | Зарядка всех батареек"
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [0, 25, 75, 100, 125, 150, 175, 225, 250, 275, 300, 325, 350, 375, 400],
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
      yaxis: {
        show: true,
        min: 1.75,
        max: 2.75,
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

  brightness: {} = {
    low: [],
  }
}