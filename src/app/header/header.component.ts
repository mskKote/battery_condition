import { ServerService } from 'src/app/server.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  timestart: any
  receiveTimeStart(e: any) {
    this.timestart = e;
  }

  constructor(private server: ServerService) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  @Output() dateRangeEvent = new EventEmitter<any>();
  sendDateRange(tRange: any) {
    let obj = {};
    if(typeof tRange == 'object') {
      obj = {
        start: new Date(tRange.start),
        end: new Date(tRange.end),
        timeStart: this.timestart
      }
    } else if(typeof tRange == 'number') {
      obj = {
        start: new Date(tRange),
        end: new Date(),
        timeStart: this.timestart
      }
    }
    this.dateRangeEvent.emit(obj);
  }
  start: any;
  end: any;
  obj: any;
  addEvent(event: any) {
    if(event.value != null){
      if(event.target.ngControl.name == 'start'){
        this.start = event.value;
      }
      if(event.target.ngControl.name == 'end'){
        this.end = event.value;
        this.obj = { start: this.start, end: this.end };
        this.sendDateRange(this.obj);
      }
    }
  }

  elClicked: any;
  clickFilter(e: any) {
    if (this.elClicked) {
      this.elClicked.classList.remove('clicked');
    }

    this.elClicked = e.target;
    this.elClicked.classList.add('clicked');
    // this.dateRange.start = new Date(+e.target.value);
    // this.dateRange.end   = new Date();
    // ServerService.start =this.dateRange.start;
    // ServerService.end = this.dateRange.end;
  }

  dateRange = new DateRange();
  maxDate = new Date();
  date: Date;
  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate());
  }

  timeRange = [
    new Date().getTime() - 60000, // 1 минута
    new Date().getTime() - 60000 * 10, // 10 минут
    new Date().getTime() - 60000 * 10 * 6, // 1 час
    new Date().getTime() - 60000 * 10 * 6 * 24, // 1 день
    new Date().getTime() - 60000 * 10 * 6 * 24 * 7, // 1 неделя
    new Date().getTime() - 60000 * 10 * 6 * 24 * 7 * 4, // 1 месяц
  ];
}
