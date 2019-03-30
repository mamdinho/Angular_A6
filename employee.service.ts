import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { EmployeeRaw } from './employeeRaw';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("https://thawing-wildwood-69422.herokuapp.com/employees"); //fetch data from the route and return an Observable array of Employee objects when invoked
  }

  saveEmployee(employee: EmployeeRaw) :Observable<any> {
    var id = employee._id;
    //Not sure below
    return this.http.put<any>(`https://thawing-wildwood-69422.herokuapp.com/employee/${id}`, employee);
  }

  getEmployee(id): Observable<EmployeeRaw[]>{
    return this.http.get<EmployeeRaw[]>(`https://thawing-wildwood-69422.herokuapp.com/employee-raw/${id}`);
  }
}
