import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { ChiefComplaintsComponent } from '../chief-complaints.component';

@Component({
  selector: 'app-add-update-chief-complaints',
  templateUrl: './add-update-chief-complaints.component.html',
  styleUrl: './add-update-chief-complaints.component.scss'
})
export class AddUpdateChiefComplaintsComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  chiefcomplaintsId: any
  constructor(
    private dialogRef: MatDialogRef<ChiefComplaintsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.chiefcomplaintsId = this.data.chief_complaint_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      chief_complaint: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateChiefComplaints() : this.addChiefComplaints(); }

  updateChiefComplaints() {
    if (this.form.valid) {
      this._adminService.editChiefComplaints(this.form.value, this.chiefcomplaintsId).subscribe({
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

  addChiefComplaints() {
    if (this.form.valid) {
      this._adminService.addChiefComplaints(this.form.value).subscribe({
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
    this.control['chief_complaint'].patchValue(data.chief_complaint);
    
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
