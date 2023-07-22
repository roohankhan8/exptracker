import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { Expense } from '../model/expense';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  expObj: Expense = new Expense();
  expenseArr: Expense[] = [];
  addExpAmount: any = null;
  editExpAmount: number = 0;
  expTotal: number = 0;

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.addExpAmount;
    this.getAll();
  }
  getAll() {
    this.crudService.getAll().subscribe(
      (res) => {
        this.expenseArr = res;
      },
      (err) => {
        alert(err);
      }
    );
  }
  addExpense() {
    this.expObj.amount = this.addExpAmount;
    this.crudService.addExpense(this.expObj).subscribe(
      (res) => {
        this.ngOnInit();
        // this.addExpAmount = 0;
      },
      (err) => {
        alert(err);
      }
    );
  }
}
