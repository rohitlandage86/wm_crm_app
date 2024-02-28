import { Component, Inject, OnInit } from '@angular/core';
import { ModulesComponent } from '../modules.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-modules',
  templateUrl: './add-update-modules.component.html',
  styleUrl: './add-update-modules.component.scss'
})
export class AddUpdateModulesComponent  implements OnInit {
  form!:FormGroup;
  isEdit=false;
  moduleId:any
  constructor (
    private dialogRef:MatDialogRef<ModulesComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _superAdminService:SuperAdminService,
    private _toastrService:ToastrService){}


  ngOnInit(){
    this.createForm();
    if (this.data) {
      this.moduleId = this.data.module_id;
      this.prepopulateData(this.data)
      this.isEdit =true
    }
  }
  createForm(){
    this.form = this.fb.group({
      module_name:[null,Validators.required],
      description:[null]
    });
  }
  get control(){
    return this.form.controls;
  }
  submit(){ this.isEdit? this.updateModule():this.addModule();}

  updateModule(){
    if (this.form.valid) {
      this._superAdminService.editModule(this.form.value,this.moduleId).subscribe({
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

  addModule(){
    if (this.form.valid){
      this._superAdminService.addModule(this.form.value).subscribe({
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
    this.control['module_name'].patchValue(data.module_name);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?:any) {
    this.dialogRef.close(message);
  }
}

