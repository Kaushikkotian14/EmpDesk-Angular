import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model'; 

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  employee: Employee = {
    img: 'assets/profile.png',
    name: '',
    email: '',
    role: '',
    designation: '',
    phone: '',
    address: '',
    doj: ''
  };

  onSubmit() {
    if (
      !this.employee.name ||
      !this.employee.email ||
      !this.employee.role ||
      !this.employee.phone ||
      !this.employee.address ||
      !this.employee.doj ||
      !this.employee.designation
    ) {
      this._snackBar.open('Please fill in all fields', 'Close', { duration: 3000 });
      return;
    }

    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        this._snackBar.open('Successfully saved', 'Close', { duration: 3000 });
      },
      error: () => {
        this._snackBar.open('Failed to save employee', 'Close', { duration: 3000 });
      }
    });
  }

  onImageSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      
      this.employee.img = `assets/${file.name}`;
    }
  }

  showEmployees = false;
}
