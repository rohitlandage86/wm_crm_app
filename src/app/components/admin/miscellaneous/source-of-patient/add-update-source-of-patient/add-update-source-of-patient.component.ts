import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { SourceOfPatientComponent } from '../source-of-patient.component';

@Component({
  selector: 'app-add-update-source-of-patient',
  templateUrl: './add-update-source-of-patient.component.html',
  styleUrl: './add-update-source-of-patient.component.scss'
})
export class AddUpdateSourceOfPatientComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  sourceofpatientId: any
  constructor(
    private dialogRef: MatDialogRef<SourceOfPatientComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.sourceofpatientId = this.data.source_of_patient_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      source_of_patient_name: [null, Validators.required],
      description: [null, Validators.maxLength(250)]
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateSourceOfPatient() : this.addSourceOfPatient(); }

  updateSourceOfPatient() {
    if (this.form.valid) {
      this._adminService.editSourceOfPatient(this.form.value, this.sourceofpatientId).subscribe({
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

  addSourceOfPatient() {
    if (this.form.valid) {
      this._adminService.addSourceOfPatient(this.form.value).subscribe({
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
    this.control['source_of_patient_name'].patchValue(data.source_of_patient_name);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
