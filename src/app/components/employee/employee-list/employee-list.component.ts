import { Component } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees?: Employee[];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.list().subscribe(

      employees => {
        console.log(employees);
        // collaborators.map(obj => console.log(obj))
        this.employees = employees
      }
    )
  }
}
