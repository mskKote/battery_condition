import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { Chart1Component } from './charts/chart1/chart1.component';
import { Chart2Component } from './charts/chart2/chart2.component';
import { Chart3Component } from './charts/chart3/chart3.component';
import { Chart4Component } from './charts/chart4/chart4.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
