import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.scss'
})
export class AddUpdateCategoryComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  categoryId: any
  constructor(
    private dialogRef: MatDialogRef<CategoryComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.categoryId = this.data.category_id
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      category_name: [null, Validators.required],
      description: [null, Validators.maxLength(250)]
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateCategory() : this.addCategory(); }

  updateCategory() {
    if (this.form.valid) {
      this._adminService.editCategory(this.form.value, this.categoryId).subscribe({
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

  addCategory() {
    if (this.form.valid) {
      this._adminService.addCategory(this.form.value).subscribe({
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
    this.control['category_name'].patchValue(data.category_name);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
