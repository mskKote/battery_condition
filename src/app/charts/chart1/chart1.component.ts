import { Component, ViewChild } from '@angular/core';
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
  ApexFill,
} from 'ng-apexcharts';

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
  fill: ApexFill;
};

@Component({
  selector: 'ngx-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Вольтаж',
          data: [
            1.85,
            1.95,
            2.15,
            2.0,
            1.75,
            2.45,
            2.55,
            1.8,
            2.3,
            1.85,
            1.85,
            2.65,
            1.85,
            2.2,
            2.25,
          ],
        },
        {
          name: 'Вольтаж',
          data: [
            1.85,
            2.45,
            2.7,
            2.0,
            1.95,
            2.2,
            2.35,
            2.55,
            2.45,
            2.65,
            2.4,
            2.55,
            1.8,
            2.15,
            2.0,
          ],
        },
      ],
      chart: {
        offsetY: -10,
        type: 'bar',
        height: 700,
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          startingShape: 'flat',
          endingShape: 'rounded',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.1,
          inverseColors: false,
          gradientToColors: ['#00ff00','#00ff00'],
          opacityFrom: 0.9,
          opacityTo: 0.5,
          //   {
          //     offset: 1,
          //     color: '#00ff00',
          //     opacity: 0.75,
          //   },
          //   {
          //     offset: 2,
          //     color: '#b0ff00',
          //     opacity: 0.75,
          //   },
          //   {
          //     offset: 2,
          //     color: '#f9ff00',
          //     opacity: 0.75,
          //   },
          //   {
          //     offset: 2,
          //     color: '#ffaf00',
          //     opacity: 0.75,
          //   },
          //   {
          //     offset: 0,
          //     color: '#ff0000',
          //     opacity: 0.75,
          //   },
          // ],
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      title: {
        offsetY: 10,
        text: 'Chart 1 | Зарядка всех батареек',
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
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
        },
      },
      yaxis: {
        show: true,
        min: 1.75,
        max: 2.75,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        theme: 'light',
        marker: {
          show: false,
        },
        x: {
          show: false,
        },
      },
    };
  }

  brightness: {} = {
    low: [],
  };
}
