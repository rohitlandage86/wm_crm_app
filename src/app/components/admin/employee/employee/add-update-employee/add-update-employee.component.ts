import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrl: './add-update-employee.component.scss'
})
export class AddUpdateEmployeeComponent implements OnInit{
  form!:FormGroup;
  isEdit: boolean=false;
  employeeId:any
  customer_id:any;
  allDesignationList:Array<any>=[];
  password: string = '';
  passwordVisible: boolean = false;

  constructor (
    private dialogRef:MatDialogRef<EmployeeComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService:AdminService,
    private _toastrService:ToastrService){}


    ngOnInit(){
    this.customer_id = localStorage.getItem('customer_id') as string;
    this.createForm();
    this.getAllDesignationList();
    
    if (this.data) {
      this.employeeId = this.data.employee_id
      console.log('DATA',this.data);
      this.prepopulateData(this.data)
      this.isEdit =true;
      this.disablePasswordValidation();
    }

  }
  createForm(){
    const passwordValidators = this.isEdit ? [] : [Validators.required];
    this.form = this.fb.group({
      name :[null,Validators.required],
      charges :[null,Validators.required],
      designation_id:[null, Validators.required],
      email_id:[null, Validators.required],
      customer_id:[this.customer_id, Validators.required],
      password:[this.isEdit ? [''] : null, passwordValidators],
     
    });
  }
  get control(){
    return this.form.controls;
  }
  submit(){ this.isEdit? this.updateEmployee():this.addEmployee();}

  updateEmployee(){
    if (this.form.valid) {
      delete this.form.value['password'];
      this._adminService.editEmployee(this.form.value,this.employeeId).subscribe({
        next:(res:any)=>{
          if (res.status==200) {
            this._toastrService.success(res.message);
            this.closeDialog('update');
          }else{
            this._toastrService.warning(res.message);
          }
        },
        error:(err:any)=>{
          if (err.error.status==401 || err.error.status==422) {
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

  addEmployee(){
    console.log(this.form.value);

    if (this.form.valid){
      
      this._adminService.addEmployee(this.form.value).subscribe({
        next:(res:any)=>{
          if(res.status==201||res.status==200){
            this._toastrService.success(res.message);
            this.closeDialog('create');
          }else{
            this._toastrService.warning(res.message);
          }
        },
        error:(err:any)=>{
          if(err.error.status== 422){
            this._toastrService.warning(err.error.message);
          }else{
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    }else{
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  prepopulateData(data:any){
    this.control['name'].patchValue(data.name);
    this.control['designation_id'].patchValue(data.designation_id);
    this.control['email_id'].patchValue(data.email_id);
    this.control['customer_id'].patchValue(this.customer_id);
  }
  closeDialog(message?:any) {
    this.dialogRef.close(message);
  }
  //get designation list...
  getAllDesignationList(){
    this._adminService.getAllDesignationListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allDesignationList= res.data;
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

}
