import { ServerService } from './server.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Chart1Component } from './charts/chart1/chart1.component';
import { Chart2Component } from './charts/chart2/chart2.component';
import { Chart3Component } from './charts/chart3/chart3.component';
import { Chart4Component } from './charts/chart4/chart4.component';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { SeriesPipe } from './charts/chart3/series.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    HeaderComponent,
    SeriesPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    DateRangePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
