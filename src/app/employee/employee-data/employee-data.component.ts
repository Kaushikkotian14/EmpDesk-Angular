import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})

export class EmployeeDataComponent implements OnInit {
  searchText: string = '';
  employees: Employee[] = [];
  roleList: string[] = [];
  filteredEmployeesByRole: { [key: string]: Employee[] } = {};

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.updateFilteredEmployees();
    });
  }

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { employee: { ...employee } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.editEmployee(result.id, result).subscribe(
          editEmployee => {
            console.log('Employee updated successfully:', editEmployee);
            this.loadEmployees();
          },
          error => {
            console.error('Error updating employee:', error);
          }
        );
      }
    });
  }

  updateFilteredEmployees() {
   
    const filtered = this.employees.filter(emp => {
      if (!this.searchText) return true;
      const searchTerm = this.searchText.toLowerCase();
      return emp.name.toLowerCase().includes(searchTerm) ||
             emp.email.toLowerCase().includes(searchTerm) ||
             emp.designation!.toLowerCase().includes(searchTerm) ||
             emp.role!.toLowerCase().includes(searchTerm);
    });

    this.roleList = [...new Set(filtered.map(emp => emp.role!))];
    this.filteredEmployeesByRole = {};
    
    this.roleList.forEach(role => {
      this.filteredEmployeesByRole[role] = filtered.filter(emp => emp.role === role);
    });
  }

  deleteEmployee(employee: Employee) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employee.id!).subscribe(
        () => {
          console.log('Employee deleted successfully');
          this.loadEmployees();
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  openTeamsChat(emp: Employee) {
          const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${emp.email}`;
          window.open(teamsUrl, '_blank');
        }

}