import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { DiagnosisComponent } from '../diagnosis.component';

@Component({
  selector: 'app-add-update-diagnosis',
  templateUrl: './add-update-diagnosis.component.html',
  styleUrl: './add-update-diagnosis.component.scss'
})
export class AddUpdateDiagnosisComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  diagnosisId: any
  constructor(
    private dialogRef: MatDialogRef<DiagnosisComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.diagnosisId = this.data.diagnosis_id
      console.log('DATA', this.data);
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      diagnosis_name: [null, Validators.required],
      description: [null, Validators.maxLength(250)]
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateDiagnosis() : this.addDiagnosis(); }

  updateDiagnosis() {
    if (this.form.valid) {
      this._adminService.editDiagnosis(this.form.value, this.diagnosisId).subscribe({
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

  addDiagnosis() {
    if (this.form.valid) {
      this._adminService.addDiagnosis(this.form.value).subscribe({
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
    this.control['diagnosis_name'].patchValue(data.diagnosis_name);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
