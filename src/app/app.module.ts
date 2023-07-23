import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, PieChartComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgChartsModule,ReactiveFormsModule],
  providers: [PieChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  ngOnInit(){
    
  }
}
