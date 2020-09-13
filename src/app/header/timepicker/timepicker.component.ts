import {Component} from '@angular/core';

@Component({
  selector: 'app-timepicker-start',
  template: `
    <ngb-timepicker [(ngModel)]="time" [spinners]="spinners"></ngb-timepicker>
  `
})
export class TimepickerStartComponent {
  time = { hour: 13, minute: 0 };
  spinners = false;
}

@Component({
  selector: 'app-timepicker-end',
  template: `
    <ngb-timepicker [(ngModel)]="time" [spinners]="spinners"></ngb-timepicker>
  `
})
export class TimepickerEndComponent {
  time = { hour: 14, minute: 0 };
  spinners = false;
}