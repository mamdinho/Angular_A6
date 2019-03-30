import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/positions';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //properties
  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubcription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;


  constructor(private empS: EmployeeService, private activeRoute: ActivatedRoute, private posS: PositionService) { }

  ngOnInit() { 
    this.paramSubscription = this.activeRoute.params.subscribe((params) => {
      this.employeeSubscription = this.empS.getEmployee(params['_id']).subscribe((employee) => {
        this.employee = employee[0];
        this.getPositionsSubcription = this.posS.getPositions().subscribe(position => this.positions = position);
      });
      
    });

  }

  onSubmit(f: NgForm) : void {
    this.saveEmployeeSubscription = this.empS.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2500);  //automatically set the successMessage property to false after 2500 ms
    },
      () => {
        this.failMessage = true;
        setTimeout(() => this.failMessage = false, 2500);  //automatically set the failMessage property to false after 2500 ms
      });

  }

  ngOnDestroy() { /** unsubscribing */
    if (this.paramSubscription) this.paramSubscription.unsubscribe();
    if (this.employeeSubscription) this.employeeSubscription.unsubscribe();
    if (this.getPositionsSubcription) this.getPositionsSubcription.unsubscribe();
    if (this.saveEmployeeSubscription) this.saveEmployeeSubscription.unsubscribe();

  }

}
