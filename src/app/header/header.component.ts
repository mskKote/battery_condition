import { Component, OnInit } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  elClicked: any;
  toggleClicked(e: any) {
    if (this.elClicked) {
      this.elClicked.classList.remove('clicked');
    }
    this.elClicked = e.target;
    this.elClicked.classList.add('clicked');
  }
  
  dateRange = new DateRange();
  maxDate = new Date();
  date: Date;
  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }
}
