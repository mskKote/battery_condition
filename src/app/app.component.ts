import { ServerService, totals,total,val } from './server.service';
import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';


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
      .then( (d: totals[]) => {
        console.log(d)
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
