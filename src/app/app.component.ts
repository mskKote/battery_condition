import { ServerService, totals,total,val } from './server.service';
import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

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
      .then((d: totals[]) => {
        console.groupCollapsed('data from server -- app.component')
        console.log(d)
        console.groupEnd()
      })

  }

  contractor: boolean = true;
  switcher: boolean = false;
  clickContractor() {
    this.contractor = !this.contractor;
  }
  clickSwitcher() {
    this.switcher = !this.switcher;
  }

}
