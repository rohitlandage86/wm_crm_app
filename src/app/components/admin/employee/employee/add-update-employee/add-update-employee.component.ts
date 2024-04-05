import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrl: './add-update-employee.component.scss'
})
export class AddUpdateEmployeeComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  employeeId: any
  customer_id: any;
  allDesignationList: Array<any> = [];
  password: string = '';
  passwordVisible: boolean = false;
  selectedDesignation: any = null
  isDoctor = false;
  constructor(
    private dialogRef: MatDialogRef<EmployeeComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }


  ngOnInit() {
    this.customer_id = localStorage.getItem('customer_id') as string;
    this.createForm();
    this.getAllDesignationList();
    if (this.data) {
      this.employeeId = this.data.employee_id
      console.log('DATA', this.data);
      this.prepopulateData(this.data)
      this.isEdit = true;
      this.disablePasswordValidation();
    }
  }
  createForm() {
    const passwordValidators = this.isEdit ? [] : [Validators.required];
    this.form = this.fb.group({
      name: [null, Validators.required],
      charges: [null],
      designation_id: [null, Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      customer_id: [this.customer_id, Validators.required],
      password: [this.isEdit ? [''] : null, passwordValidators],

    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateEmployee() : this.addEmployee(); }

  updateEmployee() {
    if (this.form.valid) {
      delete this.form.value['password'];
      this._adminService.editEmployee(this.form.value, this.employeeId).subscribe({
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

  addEmployee() {
    if (this.form.valid) {
      this._adminService.addEmployee(this.form.value).subscribe({
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
    this.control['name'].patchValue(data.name);
    this.control['designation_id'].patchValue(data.designation_id);
    this.control['email_id'].patchValue(data.email_id);
    this.control['customer_id'].patchValue(data.customer_id);
    // Check if the designation is doctor or receptionist
    if (data.designation_name.trim().toLowerCase() === 'doctor') {
      this.selectedDesignation = this.allDesignationList.find(designation => designation.designation_name.trim().toLowerCase() === 'doctor');
      this.isDoctor = true;
      // Patch charges field for doctor
      this.form.patchValue({
        charges: data.charges // Assuming 'charges' is the field for doctors
      });
    } else {
      this.selectedDesignation = this.allDesignationList.find(designation => designation.designation_name.trim().toLowerCase() !== 'doctor');
      this.isDoctor = false;
      // Remove charges field if not doctor
      if (this.form.contains('charges')) {
        this.form.removeControl('charges');
      }
    }
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
  //get designation list...
  getAllDesignationList() {
    this._adminService.getAllDesignationListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          const filteredData = res.data.map(({ designation_id, designation_name }: any) => ({ designation_id, designation_name }));
          this.allDesignationList = filteredData
        }
      }
    });

  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  disablePasswordValidation() {
    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
  }
  //patient by id patch data
  onDesignationChange(event: any) {
    const id = event.target.value;
    this._adminService.getDesignationById(id).subscribe((result: any) => {
      const DesignationData = result.data;
      let designation_name = DesignationData.designation_name
      if (designation_name.trim().toLowerCase() == 'doctor') {
        this.isDoctor = true;
        this.form.addControl('charges', new FormControl('', Validators.required));
      } else {
        this.isDoctor = false;
        this.control['charges'].removeValidators([Validators.required]);
        this.control['charges'].updateValueAndValidity();
        this.form.removeControl('charges')
      }
    });
  }
}
