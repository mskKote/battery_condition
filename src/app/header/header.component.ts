import { ServerService } from 'src/app/server.service';
import { Component, OnInit } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private server : ServerService) {}

  elClicked: any;
  clickFilter(e: any) {
    if (this.elClicked){ this.elClicked.classList.remove('clicked'); }
    this.elClicked = e.target;
    this.elClicked.classList.add('clicked');

    this.dateRange.start = new Date(+e.target.value);
    this.dateRange.end   = new Date();
    ServerService.start =this.dateRange.start;
    ServerService.end = this.dateRange.end;
  }

  reload() {
    document.cookie = `start=${this.dateRange.start}`;
    document.cookie = `end=${this.dateRange.end}`;
    location.reload();
  }

  dateRange = new DateRange();
  maxDate = new Date();
  date: Date;
  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);

    for (let i = 0, l = document.cookie.split(';').length; i < l; i++) {
      if (document.cookie.split(';')[i].indexOf('start=')) {
        this.dateRange.start = new Date(this.getCookie('start'));
        ServerService.start =this.dateRange.start;
      }
      if (document.cookie.split(';')[i].indexOf('end=')) {
        this.dateRange.end = new Date(this.getCookie('end'));
        ServerService.end = this.dateRange.end;
      }
    }

    // let pickerInput = document.querySelector('input');
    // pickerInput.style.maxWidth = '';
    window.addEventListener('resize', () => { 
      this.smartphone = screen.width < 800;

      let pickerInput = document.querySelector('input');
      pickerInput.style.maxWidth = '';
    });
  }
  smartphone: boolean = false;

  timeRange = [
    new Date().getTime() - 600000,              // 10 минут
    new Date().getTime() - 600000 * 6,          // 1 час
    new Date().getTime() - 600000 * 6 * 24,     // 1 день
    new Date().getTime() - 600000 * 6 * 24 * 7, // 1 неделя
  ];

  getCookie(cookie_name: any) {
    let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
  }
}
