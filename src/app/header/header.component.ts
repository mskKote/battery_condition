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
  constructor(private server: ServerService) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  @Output() dateRangeEvent = new EventEmitter<any>();
  sendDateRange() {
    this.dateRangeEvent.emit(this.range);
  }
  start: any;
  end: any;
  obj: any;
  addEvent(event) {
    if(event.value!=null){
      if(event.target.ngControl.name=='start'){
        this.start = event.value;
        // console.log('object :>> ', event.target.ngControl.name);
        // console.log(' start' );
      }
      if(event.target.ngControl.name=='end'){
        this.end = event.value;
        // console.log('object :>> ', event.value);
        this.obj ={start:this.start,end:this.end};
        this.sendDateRange();
        // console.log('end');
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
    this.dateRange.start = new Date(+e.target.value);
    this.dateRange.end = new Date();
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
    new Date().getTime() - 600000, // 10 минут
    new Date().getTime() - 600000 * 6, // 1 час
    new Date().getTime() - 600000 * 6 * 24, // 1 день
    new Date().getTime() - 600000 * 6 * 24 * 7, // 1 неделя
  ];
}
