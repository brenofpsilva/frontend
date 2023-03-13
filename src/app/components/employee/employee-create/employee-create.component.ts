import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../../interfaces/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {

  employee: Employee = {
    id: '',
    name: '',
    email: '',
    cpf: '',
    phone: '',
    knowledge: ''
  }

  selectedKnowledgeError: boolean = false;
  msgErrorName?: string = '';
  msgErrorEmail?: string = '';
  msgErrorCpf?: string = '';
  msgErrorKnowledge?: string = '';
  msgErrorPhone?: string = '';
  msgSuccess?: string = '';

  employeeForm: FormGroup;

  knowledges: Array<any> = [
    { name: 'Git', value: 'Git' },
    { name: 'React', value: 'React' },
    { name: 'PHP', value: 'PHP' },
    { name: 'NodeJS', value: 'NodeJS' },
    { name: 'DevOps', value: 'DevOps' },
    { name: 'Banco de Dados', value: 'Banco de Dados' },
    { name: 'TypeScript', value: 'TypeScript' },
  ];


  constructor(fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.employeeForm = fb.group({
    //  selectedKnowledge:  new FormArray([])
    });
  }

  ngOnInit(): void{
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      selectedKnowledge:  new FormArray([], [Validators.required]),
      knowledge: new FormControl(),
    });
  }

  get name() { return this.employeeForm.get('name')!; }
  get email() { return this.employeeForm.get('email')!; }
  get cpf() { return this.employeeForm.get('cpf')!; }
  get phone() { return this.employeeForm.get('phone')!; }
  get selectedKnowledge() { return this.employeeForm.get('name')!; }

  onCheckboxChange(event: any) {

    const selectedKnowledge = (this.employeeForm.controls['selectedKnowledge'] as FormArray);
    if (event.target.checked) {
      selectedKnowledge.push(new FormControl(event.target.value));
    } else {
      const index = selectedKnowledge.controls
      .findIndex(x => x.value === event.target.value);
      selectedKnowledge.removeAt(index);
    }
  }

  createEmployee(): void {
    this.employeeService.create(this.employee).subscribe(() => {
      console.log('Employee Criado');
      this.router.navigate(['/'])
    })
  }

  async submit() {
    if(this.employeeForm.invalid) {
      if(this.employeeForm.value.selectedKnowledge){
        this.selectedKnowledgeError = true;
        return
      }
      return;
    }else{
      this.selectedKnowledgeError = false;
    }

    this.employeeForm.value.knowledge = this.employeeForm.value.selectedKnowledge.toString()
    console.log(this.employeeForm.value);
    await this.employeeService.create(this.employeeForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.msgSuccess = 'Cadastro efetuado com sucesso!'
          this.employee.name = '';
          this.employee.email = '';
          this.employee.cpf = '';
          this.employee.phone = '';
          this.employee.knowledge = '';
          this.employeeForm.value.selectedKnowledge = '';
        },
        error: (e) => {
          this.msgErrorName = JSON.stringify(e.error.errors.namel);
          this.msgErrorEmail = JSON.stringify(e.error.errors.email);
          this.msgErrorCpf = JSON.stringify(e.error.errors.cpf);
          this.msgErrorKnowledge = JSON.stringify(e.error.errors.knowledge);
          this.msgErrorPhone = JSON.stringify(e.error.errors.phone);
        },
        complete: () => console.log('done'),
      // console.log('Employee Criado');
      // this.router.navigate(['/'])
    })
  }

  changeCheckbox(event: Event) {
    console.log(event.target);
  }

}
