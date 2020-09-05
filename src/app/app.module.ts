import { ServerService } from './server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { Chart1Component } from './charts/chart1/chart1.component';
import { Chart2Component } from './charts/chart2/chart2.component';
import { Chart7Component } from './charts/chart7/chart7.component';
import { Chart8Component } from './charts/chart8/chart8.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart7Component,
    Chart8Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    NgbModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
