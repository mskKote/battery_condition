import {Component} from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent {
  time = { hour: 13, minute: 30 };
  spinners = false;

  toggleSpinners() {
      this.spinners = !this.spinners;
  }
}