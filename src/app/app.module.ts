import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { Chart1Component } from './charts/chart1/chart1.component';
import { Chart2Component } from './charts/chart2/chart2.component';
// import { Chart3Component } from './charts/chart3/chart3.component';
// import { Chart4Component } from './charts/chart4/chart4.component';
// import { Chart5Component } from './charts/chart5/chart5.component';
// import { Chart6Component } from './charts/chart6/chart6.component';
import { Chart7Component } from './charts/chart7/chart7.component';
// import { Chart8Component } from './charts/chart8/chart8.component';
// import { Chart9Component } from './charts/chart9/chart9.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    // Chart5Component,
    Chart2Component,
    // Chart3Component,
    // Chart4Component,
    // Chart6Component,
    Chart7Component,
    // Chart8Component,
    // Chart9Component,
  ],
  imports: [
    BrowserModule,
    // ChartjsBarComponent,
    NgApexchartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
