import { Component, EventEmitter, Output } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { CrudService } from '../crud.service';
import { Expense } from '../model/expense';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @Output() callParentMethodEvent = new EventEmitter<void>();

  callParentMethod(): void {
    this.callParentMethodEvent.emit();
  }
  constructor(private crudService: CrudService) {}
  food: number = 0;
  transportation: number = 0;
  others: number = 0;
  
  expenseArr: Expense[] = [];
  
  ngOnInit() {
    this.getAll();
    console.log(this.food, this.transportation, this.others);
  }
  
  getAll() {
    this.crudService.getAll().subscribe(
      (res) => {
        this.expenseArr = res;
        this.filtering(this.expenseArr);
      },
      (err) => {
        alert(err);
      }
    );
  }
  filtering(expenseArr: Expense[]) {
    for (let expense of expenseArr) {
      if (expense['type'] == 'Food') {
        this.food += expense.amount;
      } else if (expense['type'] == 'Transportation') {
        this.transportation += expense.amount;
      } else if (expense['type'] == 'Others') {
        this.others += expense.amount;
      }
    }
    console.log(this.food, this.transportation, this.others);
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Food', 'Transportation', 'Others'];
  public pieChartDatasets = [
    {
      data: [this.food, this.transportation, this.others],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
