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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    MatSlideToggleModule,
MatSelectModule,  MatCardModule,
MatIconModule,
    MatGridListModule,
MatButtonToggleModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDatepickerModule,
    HttpClientModule,
    NgApexchartsModule,
    DateRangePickerModule,
    MatButtonModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
