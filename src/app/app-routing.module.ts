import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CollaboratorListComponent } from './components/collaborator/collaborator-list/collaborator-list.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "registros",
    component: EmployeeListComponent
  },
  {
    path: "gerar-link",
    component: CollaboratorListComponent
  },
  {
    path: ':name/registrar',
    component: EmployeeCreateComponent
  },
  {
    path: ':name/validar',
    component: EmployeeEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
