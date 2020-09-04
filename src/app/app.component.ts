import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor() {
    
  }
  
  ngOnInit() {
    if(this.screenWidth <= 1740) {
      this.adaptCharts = true;
    }
    window.addEventListener('resize', () => {
      this.adaptCharts = document.documentElement.clientWidth <= 1740; 
    });
    window.addEventListener('load', () => {
      this.adaptCharts = document.documentElement.clientWidth <= 1740;
    });
  }
  screenWidth: number  = screen.width;
  adaptCharts: boolean = false;
}
