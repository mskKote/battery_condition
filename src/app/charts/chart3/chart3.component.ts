import {
  Component,
  ViewChild,
  Output,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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
};
@Component({
  selector: 'ngx-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss'],
})
export class Chart3Component {
  // @ViewChild('chart') chart: ChartComponent;

  // form: FormGroup;

  // constructor() {
  //   this.form = new FormGroup({
  //     title: new FormControl('Basic Chart'),
  //     type: new FormControl('line'),
  //     height: new FormControl(350),
  //     series: new FormArray([
  //       new FormGroup({
  //         name: new FormControl('Series'),
  //         type: new FormControl('line'),
  //         data: new FormArray([
  //           new FormControl(this.getRandomArbitrary(0, 100)),
  //           new FormControl(this.getRandomArbitrary(0, 100)),
  //           new FormControl(this.getRandomArbitrary(0, 100)),
  //           new FormControl(this.getRandomArbitrary(0, 100)),
  //         ]),
  //       }),
  //     ]),
  //     xaxis: new FormArray([
  //       new FormControl('Jan'),
  //       new FormControl('Feb'),
  //       new FormControl('Mar'),
  //       new FormControl('Apr'),
  //     ]),
  //   });
  // }

  // addValue() {
  //   (<FormArray>this.form.get('series')).controls.forEach((c) => {
  //     (<FormArray>c.get('data')).push(
  //       new FormControl(this.getRandomArbitrary(0, 100))
  //     );
  //   });
  //   (<FormArray>this.form.get('xaxis')).push(new FormControl('Jan'));
  // }

  // addSeries() {
  //   (<FormArray>this.form.get('series')).push(
  //     new FormGroup({
  //       name: new FormControl('Series'),
  //       type: new FormControl('line'),
  //       data: new FormArray([
  //         new FormControl(this.getRandomArbitrary(0, 100)),
  //         new FormControl(this.getRandomArbitrary(0, 100)),
  //         new FormControl(this.getRandomArbitrary(0, 100)),
  //         new FormControl(this.getRandomArbitrary(0, 100)),
  //       ]),
  //     })
  //   );
  // }

  // withoutType(series) {
  //   return series.map((s) => {
  //     return { name: s.name, data: s.data };
  //   });
  // }

  // private getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  @Input() chart3: any;
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [{
          name: 'Series 1',
          data: [6, -55, -55, 2178, 2213, -55, 2197, -55, -55, 2195],
        },
      ],
      chart: {
        offsetY: 30,
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 5,
          blur: 3,
          color: '#39DA8A',
          opacity: 0.35,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        colors: ['#39DA8A'],
      },
      title: {
        text: 'Потребление по амперам от времени',
      },
      yaxis: {
        show: true,
        title: {
          text: 'Ампер',
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
          `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
          `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
          `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
          `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
          `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
          `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
          `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
          `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
          `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
        ],
        title: {
          text: 'Время',
        },
        labels: {
          show: true,
          style: {
            fontSize: 'auto',
          },
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        tooltip: {
          enabled: true,
        },
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
      markers: {
        colors: '#39DA8A',
        strokeColors: 'white',
        strokeWidth: 3,
        hover: {
          size: 7,
          sizeOffset: 3,
        },
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

  randomSeries() {
    let arr = [];
    for(let i = 0; i < 10; i++) {
      arr.push(Math.floor(1.75 + Math.random() * 2.8))
    }
    return arr;
  }
}
