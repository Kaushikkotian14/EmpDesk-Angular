import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
employeeName: string = '';
    employees: string[] = [];

    addEmployee() {
        if (this.employeeName && this.employeeName.trim()) {
            this.employees.push(this.employeeName.trim());
            this.employeeName = '';
        }
    }

    removeEmployee(index: number) {
        this.employees.splice(index, 1);
    }

    createProject() {
        
       
    }
}


