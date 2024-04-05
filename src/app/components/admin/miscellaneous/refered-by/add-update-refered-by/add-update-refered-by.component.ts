import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { ReferedByComponent } from '../refered-by.component';

@Component({
  selector: 'app-add-update-refered-by',
  templateUrl: './add-update-refered-by.component.html',
  styleUrl: './add-update-refered-by.component.scss'
})
export class AddUpdateReferedByComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  referedbyId: any
  constructor(
    private dialogRef: MatDialogRef<ReferedByComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.referedbyId = this.data.refered_by_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      refered_by_name: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateReferedBy() : this.addReferedBy(); }

  updateReferedBy() {
    if (this.form.valid) {
      this._adminService.editReferedBy(this.form.value, this.referedbyId).subscribe({
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

  addReferedBy() {
    if (this.form.valid) {
      this._adminService.addReferedBy(this.form.value).subscribe({
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
    this.control['refered_by_name'].patchValue(data.refered_by_name);
    
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
