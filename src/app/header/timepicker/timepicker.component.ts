import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker-start',
  template: `
    <ngb-timepicker 
      (change)="getTimeStart()"
      [(ngModel)]="time" 
      [spinners]="spinners"></ngb-timepicker>
  `
})
export class TimepickerStartComponent implements OnInit {
  @Output() timeStartEvent = new EventEmitter<any>();

  time = { hour: 13, minute: 0 };
  spinners = false;

  ngOnInit() {
    this.timeStartEvent.emit(this.time);
  }

  getTimeStart() {
    this.timeStartEvent.emit(this.time);
  }
}

@Component({
  selector: 'app-timepicker-end',
  template: `
    <ngb-timepicker 
      [(ngModel)]="time" 
      [spinners]="spinners"></ngb-timepicker>
  `
})
export class TimepickerEndComponent {
  @Output() timeStartEvent = new EventEmitter<any>();

  time = { hour: 13, minute: 0 };
  spinners = false;

  getTimeEnd() {
    console.log(this.time)
  }
}