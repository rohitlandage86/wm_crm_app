import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { MedicinesComponent } from '../medicines.component';

@Component({
  selector: 'app-add-update-medicines',
  templateUrl: './add-update-medicines.component.html',
  styleUrl: './add-update-medicines.component.scss'
})
export class AddUpdateMedicinesComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  medicinesId: any
  constructor(
    private dialogRef: MatDialogRef<MedicinesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.medicinesId = this.data.medicines_id
      console.log('DATA', this.data);
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      medicines_name: [null, Validators.required],
      content: [null, Validators.maxLength(250)]
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateMedicines() : this.addMedicines(); }

  updateMedicines() {
    if (this.form.valid) {
      this._adminService.editMedicines(this.form.value, this.medicinesId).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.closeDialog('update');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }

  addMedicines() {
    if (this.form.valid) {
      this._adminService.addMedicines(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.closeDialog('create');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  prepopulateData(data: any) {
    this.control['medicines_name'].patchValue(data.medicines_name);
    this.control['content'].patchValue(data.content);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
