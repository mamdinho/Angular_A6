import { Component, OnInit, ɵConsole } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[]; //type Employee object array
  getEmployeesSub: any; //the subscriber
  loadingError: boolean = false;
  filteredEmployees: Employee[];

  constructor(private empservice: EmployeeService, private router: Router) { } //injecting the service EmployeeService for my component to use

  ngOnInit() {
    /** Subscribing to the method of the service EmployeeService and giving getEmployeesSub a reference of the subscribtion. Storing the fetched data into employees array */
    this.getEmployeesSub = this.empservice.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.filteredEmployees = employees;
    } , 
      err => this.loadingError = true); 

  }

  ngOnDestroy(){
    if(this.getEmployeesSub) this.getEmployeesSub.unsubscribe(); //unsubscribing when the components is no longer loaded "a.k is destroyed"
  }

  routeEmployee(id: string){
    this.router.navigate(['/employee', id]); //navigate to this specific employee
  }

  onEmployeeSearchKeyUP(event:any){
    this.filteredEmployees = this.employees.filter((emps) => {
      return emps.FirstName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || emps.LastName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || emps.Position.PositionName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      });
   
  }
}
