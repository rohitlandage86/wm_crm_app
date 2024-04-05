import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityComponent } from '../entity.component';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-add-update-entity',
  templateUrl: './add-update-entity.component.html',
  styleUrl: './add-update-entity.component.scss'
})
export class AddUpdateEntityComponent implements OnInit {
  form!:FormGroup;
  isEdit=false;
  entityId:any
  constructor (
    private dialogRef:MatDialogRef<EntityComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService:AdminService,
    private _toastrService:ToastrService){}
  ngOnInit(){
    this.createForm();
    if (this.data) {
      this.entityId = this.data.entity_id
      console.log('DATA',this.data);
      this.prepopulateData(this.data)
      this.isEdit =true
    }
  }
  createForm(){
    this.form = this.fb.group({
      entity_name:[null,Validators.required],
      abbrivation:[null, Validators.required],
      description:[null, Validators.maxLength(250)]
    });
  }
  get control(){
    return this.form.controls;
  }
  submit(){ this.isEdit? this.updateEntity():this.addEntity();}

  updateEntity(){
    if (this.form.valid) {
      this._adminService.editEntity(this.form.value,this.entityId).subscribe({
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

  addEntity(){
    if (this.form.valid){
      this._adminService.addEntity(this.form.value).subscribe({
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
    this.control['entity_name'].patchValue(data.entity_name);
    this.control['abbrivation'].patchValue(data.abbrivation);
    this.control['description'].patchValue(data.description);
  }
  closeDialog(message?:any) {
    this.dialogRef.close(message);
  }
}