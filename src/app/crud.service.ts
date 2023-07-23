import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './model/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceURl: string=''
  constructor(private http: HttpClient) {
    this.serviceURl = 'http://localhost:3000/expense';
  }
  addExp(exp: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.serviceURl, exp);
  }
  deleteExp(exp: Expense): Observable<Expense> {
    return this.http.delete<Expense>(this.serviceURl + '/' + exp.id);
  }
  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.serviceURl);
  }
  editExp(exp: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.serviceURl + '/' + exp.id, exp);
  }
}
