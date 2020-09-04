import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  contractor: boolean = false;
  switcher: boolean = false;

  clickContractor() {
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.switcher = !this.switcher;
  }

}
