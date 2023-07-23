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

  types: string[] = ['Food', 'Transportation', 'Others'];
  selectedType: string = 'Food';

  totalExp() {
    for (let i = 0; i < this.expenseArr.length; i++) {
      let val = this.expenseArr[i];
      this.expTotal += val['amount'];
      console.log(this.expTotal);
    }
  }

  ngOnInit() {
    this.addExpAmount = null;
    this.getAll();
    // this.totalExp()
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
  addExp() {
    this.expObj.amount = this.addExpAmount;
    this.expObj.type = this.selectedType;
    this.crudService.addExp(this.expObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert(err);
      }
    );
  }
  deleteExp(exp: Expense) {
    this.crudService.deleteExp(exp).subscribe(
      (res) => {
        // this.expTotal-=exp.amount
        this.ngOnInit();
      },
      (err) => {
        alert(err);
      }
    );
  }
  editExp() {
    this.expObj.amount = this.editExpAmount;
    this.crudService.editExp(this.expObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert(err);
      }
    );
  }
  call(exp: Expense) {
    this.expObj = exp;
    this.editExpAmount = exp.amount;
  }
}
