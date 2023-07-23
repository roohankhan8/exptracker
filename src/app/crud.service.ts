import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './model/expense';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceURL: string = '';
  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/expense';
  }
  addExp(exp: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.serviceURL, exp);
  }
  deleteExp(exp: Expense): Observable<Expense> {
    return this.http.delete<Expense>(this.serviceURL + '/' + exp.id);
  }
  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.serviceURL);
  }
  editExp(exp: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.serviceURL + '/' + exp.id, exp);
  }
}
