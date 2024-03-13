import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { InstructionsComponent } from '../instructions.component';

@Component({
  selector: 'app-add-update-instructions',
  templateUrl: './add-update-instructions.component.html',
  styleUrl: './add-update-instructions.component.scss'
})
export class AddUpdateInstructionsComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  instructionsId: any
  constructor(
    private dialogRef: MatDialogRef<InstructionsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.instructionsId = this.data.instructions_id
      console.log('DATA', this.data);
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      instruction: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateInstructions() : this.addInstructions(); }

  updateInstructions() {
    if (this.form.valid) {
      console.log(this.form.value);
      this._adminService.editInstructions(this.form.value, this.instructionsId).subscribe({
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

  addInstructions() {
    if (this.form.valid) {
      this._adminService.addInstructions(this.form.value).subscribe({
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
    this.control['instruction'].patchValue(data.instruction);
    
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
