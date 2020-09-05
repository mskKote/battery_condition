import { ServerService, totals,total,val } from './server.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public server: ServerService){

  }
  ngOnInit(): void {
    this.server.getDataQuery()
    .then((d:totals[]) => console.log(d))  }

  contractor: boolean = false;
  switcher: boolean = false;

  clickContractor() {
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.switcher = !this.switcher;
  }

}
