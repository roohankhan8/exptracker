import { Component, EventEmitter, Output } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { CrudService } from '../crud.service';
import { Expense } from '../model/expense';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  constructor(private crudService: CrudService) {}
  food: number = 0;
  transportation: number = 0;
  others: number = 0;
  expenseArr: Expense[] = [];

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.crudService.getAll().subscribe(
      (res) => {
        this.expenseArr = res;
        for (let expense of this.expenseArr){
          this.adding(expense);
        }
        console.log(this.expenseArr)
      },
      (err) => {
        alert(err);
      }
    );
  }
  adding(expense: Expense) {
    if (expense['type'] == 'Food') {
      this.food += expense.amount;
    } else if (expense['type'] == 'Transportation') {
      this.transportation += expense.amount;
    } else if (expense['type'] == 'Others') {
      this.others += expense.amount;
    }
    console.log(this.food, this.transportation, this.others);
  }
  // deleting(expenseArr: Expense[]) {
  //   for (let expense of expenseArr) {
  //     if (expense['type'] == 'Food') {
  //       this.food -= expense.amount;
  //     } else if (expense['type'] == 'Transportation') {
  //       this.transportation += expense.amount;
  //     } else if (expense['type'] == 'Others') {
  //       this.others += expense.amount;
  //     }
  //   }
  // }

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  pieChartLabels = ['Food', 'Transportation', 'Others'];
  pieChartDatasets = [
    {
      data: [this.food, this.transportation, this.others],
      // data:[10,20,30]
    },
  ];
  pieChartLegend = true;
  pieChartPlugins = [];
}
