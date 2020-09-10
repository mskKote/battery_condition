import { ServerService } from './server.service';import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './header/header.component';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
  
    MatCardModule,
    MatGridListModule,
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
