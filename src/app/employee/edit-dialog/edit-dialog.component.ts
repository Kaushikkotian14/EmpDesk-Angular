import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { Employee } from '../employee.model'; 

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent {
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      id: [data.employee.id],
      name: [data.employee.name, [Validators.required]],
      email: [data.employee.email, [Validators.required, Validators.email]],
      role: [data.employee.role, [Validators.required]],
      designation: [data.employee.designation, [Validators.required]],
      phone: [data.employee.phone, [Validators.required]],
      address: [data.employee.address, [Validators.required]],
      doj: [data.employee.doj, [Validators.required]],
      img: [data.employee.img]
    });
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}