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

  realTimeBtnText = "LIVE";
  realTimeWorks: boolean = true;
  isFirstSendDate: boolean = true;
  clickedBtnRT: HTMLElement;

  @Output() activateRealTimeEvent = new EventEmitter<boolean>()
  toRealTime(e: any) {
    e.preventDefault();
    this.server.IsRealTimeListener.next(true); 

    this.clickedBtnRT = e.target;
    if(!this.realTimeWorks)
      this.realTimeWorks = true;

    this.activateRealTimeEvent.emit(true);
  }

  timeStart: any
  timeEnd: any
  receiveTimeStart(e: any) {
    this.timeStart = e;
    if(this.timeEnd && this.timeStart) {
      this.sendDateRange({
        // new Date().getTime() - 60000
        start: new Date(),
        end: new Date()
      })
    }
  }
  receiveTimeEnd(e: any) {
    this.timeEnd = e;
    if(this.timeEnd && this.timeStart) {
      
      this.sendDateRange({
        // new Date().getTime() - 60000
        start: (this.obj ? this.obj.start : new Date()),
        end: (this.obj ? this.obj.end : new Date())
      })
    }
  }

  constructor(public server: ServerService) {
    this.server.getBoardsIds()
    .then((data) =>
      data.subscribe(ids => {
        server.boards_ids = ids;
        for (const id of ids) {
          console.log('id :>> ', id);
        }
      })
    );
  }

  range = new FormGroup({
    start: new FormControl(),
    end:   new FormControl()
  });
  @Output() dateRangeEvent = new EventEmitter<any>();
  sendDateRange(tRange: any) {
    let obj = {};
    if(typeof tRange == 'object') {
      obj = {
        start: new Date(tRange.start.toString()
                .replace(/\d\d:\d\d:\d\d/, `${this.timeStart ? this.timeStart.hour   : '13'}:
                                            ${this.timeStart ? this.timeStart.minute : '00'}:00`)),
        end: new Date(tRange.end.toString()
                .replace(/\d\d:\d\d:\d\d/, `${this.timeEnd ? this.timeEnd.hour   : '14'}:
                                            ${this.timeEnd ? this.timeEnd.minute : '00'}:00`)),
        // timeStart: this.timeStart,
        // timeEnd: this.timeEnd
      }
      // console.log(obj);
    } else if(typeof tRange == 'number') {
      obj = {
        start: new Date(tRange),
        end: new Date(),
        // timeStart: this.timeStart
      }
    }

    this.realTimeWorks = this.isFirstSendDate;
    this.server.IsRealTimeListener.next(this.isFirstSendDate); 

    this.isFirstSendDate = false;
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

  @Output() sendBatteryIndexEvent = new EventEmitter<any>();
  sendBatteryIndex(index:number) {
    this.sendBatteryIndexEvent.emit(index);
  }


  elClicked: any;
  clickFilter(e: any) {
    if (this.elClicked)
      this.elClicked.classList.remove('clicked');

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

  @Input() lastTime;

  ngOnInit() {
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
