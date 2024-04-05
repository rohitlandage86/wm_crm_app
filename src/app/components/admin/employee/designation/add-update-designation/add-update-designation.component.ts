import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';  
import { DesignationComponent } from '../designation.component';

@Component({
  selector: 'app-add-update-designation',
  templateUrl: './add-update-designation.component.html',
  styleUrl: './add-update-designation.component.scss'
})
export class AddUpdateDesignationComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  designationId: any
  constructor(
    private dialogRef: MatDialogRef<DesignationComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.designationId = this.data.designation_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      designation_name: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateDesignation() : this.addDesignation(); }

  updateDesignation() {
    if (this.form.valid) {
      this._adminService.editDesignation(this.form.value, this.designationId).subscribe({
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

  addDesignation() {
    if (this.form.valid) {
      this._adminService.addDesignation(this.form.value).subscribe({
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
    this.control['designation_name'].patchValue(data.designation_name);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
