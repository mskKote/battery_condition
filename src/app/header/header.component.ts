import { ServerService } from 'src/app/server.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private server: ServerService) {}

  @Output() dateRangeEvent = new EventEmitter<any>()
  sendDateRange() {
    this.dateRangeEvent.emit(this.dateRange)
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
    
    // let pickerInput = document.querySelector('input');
    // pickerInput.style.maxWidth = '';
  }

  timeRange = [
    new Date().getTime() - 600000, // 10 минут
    new Date().getTime() - 600000 * 6, // 1 час
    new Date().getTime() - 600000 * 6 * 24, // 1 день
    new Date().getTime() - 600000 * 6 * 24 * 7, // 1 неделя
  ];
}
