
import { ServerService } from './server.service';import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Chart1Component } from './charts/chart1/chart1.component';
import { Chart2Component } from './charts/chart2/chart2.component';
import { Chart3Component } from './charts/chart3/chart3.component';
import { Chart4Component } from './charts/chart4/chart4.component';
import { Chart5Component } from './charts/chart5/chart5.component';
import { Chart6Component } from './charts/chart6/chart6.component';
import { Chart7Component } from './charts/chart7/chart7.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { SeriesPipe } from './charts/chart3/series.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    Chart5Component,
    Chart6Component,
    Chart7Component,
    HeaderComponent,
    SeriesPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    DateRangePickerModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
