import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employee?: Employee;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get("name");
    this.employeeService.readByName(name).subscribe((employee) => {
      this.employee =  employee;
      console.log(JSON.stringify(this.employee));
    });
  }


  validated(): void {
    alert('validated')
  }

  notValidated(): void {
    alert('not_validated')
  }

}
