import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../admin.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceComponent } from '../service.component';

@Component({
  selector: 'app-add-update-service',
  templateUrl: './add-update-service.component.html',
  styleUrl: './add-update-service.component.scss'
})
export class AddUpdateServiceComponent implements OnInit {
  form!:FormGroup;
  isEdit=false;
  serviceId:any
  allEntitiesList:Array<any>=[];
  allServiceTypeList:Array<any>=[];

  constructor (
    private dialogRef:MatDialogRef<ServiceComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService:AdminService,
    private _toastrService:ToastrService){}


  ngOnInit(){
    this.createForm();
    this.getAllEntitiesList();
    this.getAllServiceTypeList();

    if (this.data) {
      this.serviceId = this.data.service_id
      console.log('DATA',this.data);
      this.prepopulateData(this.data)
      this.isEdit =true
    }
  }
  createForm(){
    this.form = this.fb.group({
      service_name :[null,Validators.required],
      entity_id:[null, Validators.required],
      service_type_id:[null, Validators.required],
      description:[null, Validators.maxLength(250)]
    });
  }
  get control(){
    return this.form.controls;
  }
  submit(){ this.isEdit? this.updateService():this.addService();}

  updateService(){
    if (this.form.valid) {
      console.log(this.form.value);
      this._adminService.editService(this.form.value,this.serviceId).subscribe({
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

  addService(){
    if (this.form.valid){
      this._adminService.addService(this.form.value).subscribe({
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
    this.control['service_name'].patchValue(data.service_name);
    this.control['entity_id'].patchValue(data.entity_id);
    this.control['service_type_id'].patchValue(data.service_type_id);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?:any) {
    this.dialogRef.close(message);
  }
  //get entities list...
  getAllEntitiesList(){
    this._adminService.getAllEntitiesListWma().subscribe({
      next:(res:any)=>{
        console.log(res);
        if (res.data.length>0) {
          this.allEntitiesList =res.data;
        }
      }
    });
  }
  //get service type list...
  getAllServiceTypeList(){
    this._adminService.getAllServiceTypeListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allServiceTypeList= res.data;
        }
      }
    });

  }
}
