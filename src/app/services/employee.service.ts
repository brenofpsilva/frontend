import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = "http://localhost/api/employees";

  constructor(private http: HttpClient) { };

  employee: Employee = {
    id: '',
    name: '',
    email: '',
    cpf: '',
    phone: '',
    knowledge: ''
  }


  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee)
  }

  readById(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  readByName(name: any): Observable<Employee> {
    const url = `${this.baseUrl}/${name}`;
    return this.http.get<Employee>(url);
  }



}
