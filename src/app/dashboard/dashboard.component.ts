import { Component, ViewChild } from '@angular/core';
import { CrudService } from '../crud.service';
import { Expense } from '../model/expense';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

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
  oldValue: number = 0;
  expTotal: number = 0;
  parentMethod(): void {
    console.log('Parent method called!');
  }
  
  @ViewChild(PieChartComponent) pieChartComponent!: PieChartComponent;

  callFunctionInPieChartComponent(): void {
    this.pieChartComponent.ngOnInit();
  }
  constructor(
    private crudService: CrudService,
  ) {}

  types: string[] = ['Food', 'Transportation', 'Others'];
  selectedType: string = 'Food';

  ngOnInit() {
    this.addExpAmount = null;
    this.getAll();
    this.callFunctionInPieChartComponent()
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
        this.totalExp(this.expObj.amount);
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
        this.ngOnInit();
        this.expTotal -= exp.amount;
      },
      (err) => {
        alert(err);
      }
    );
  }
  call(exp: Expense) {
    this.expObj = exp;
    this.editExpAmount = exp.amount;
    this.oldValue = exp.amount;
  }
  editExp() {
    this.expTotal -= this.oldValue;
    this.expObj.amount = this.editExpAmount;
    this.crudService.editExp(this.expObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.totalExp(this.expObj.amount);
      },
      (err) => {
        alert(err);
      }
    );
  }

  totalExp(exp: number) {
    this.expTotal += exp;
  }
}
