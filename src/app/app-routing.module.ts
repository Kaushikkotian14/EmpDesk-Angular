import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {path:'aboutUs', component: AboutComponent},
  {path:'contactUs', component: ContactComponent},
  {path:'employee', component: EmployeeComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: LoginComponent},
  {path:'project', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
