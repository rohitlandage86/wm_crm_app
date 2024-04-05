import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { DosagesComponent } from '../dosages.component';

@Component({
  selector: 'app-add-update-dosages',
  templateUrl: './add-update-dosages.component.html',
  styleUrl: './add-update-dosages.component.scss'
})
export class AddUpdateDosagesComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  dosagesId: any
  constructor(
    private dialogRef: MatDialogRef<DosagesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.dosagesId = this.data.dosage_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      dosage_name: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateDosages() : this.addDosages(); }

  updateDosages() {
    if (this.form.valid) {
      this._adminService.editDosages(this.form.value, this.dosagesId).subscribe({
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

  addDosages() {
    if (this.form.valid) {
      this._adminService.addDosages(this.form.value).subscribe({
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
    this.control['dosage_name'].patchValue(data.dosage_name);
    
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
