import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerTypeComponent } from '../customer-type.component';

@Component({
  selector: 'app-add-update-customer-type',
  templateUrl: './add-update-customer-type.component.html',
  styleUrl: './add-update-customer-type.component.scss'
})
export class AddUpdateCustomerTypeComponent implements OnInit {
  form!:FormGroup;
  isEdit=false;
  customerTypeId:any
  constructor (
    private dialogRef:MatDialogRef<CustomerTypeComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _superAdminService:SuperAdminService,
    private _toastrService:ToastrService){}


  ngOnInit(){
    this.createForm();
    if (this.data) {
      this.customerTypeId = this.data.customer_type_id
      console.log('DATA',this.data);
      this.prepopulateData(this.data)
      this.isEdit =true
    }
  }
  createForm(){
    this.form = this.fb.group({
      customer_type:[null,Validators.required],
      description:[null]
    });
  }
  get control(){
    return this.form.controls;
  }
  submit(){ this.isEdit? this.updateCustomerType():this.addCustomerType();}

  updateCustomerType(){
    if (this.form.valid) {
      this._superAdminService.editCustomerType(this.form.value,this.customerTypeId).subscribe({
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

  addCustomerType(){
    if (this.form.valid){
      this._superAdminService.addCustomerType(this.form.value).subscribe({
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
      })
    }else{
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  prepopulateData(data:any){
    this.control['customer_type'].patchValue(data.customer_type);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?:any) {
    this.dialogRef.close(message);
  }
}
