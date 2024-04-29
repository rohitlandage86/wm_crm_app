import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from '../../receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-receptionist-dashboard',
  templateUrl: './add-update-receptionist-dashboard.component.html',
  styleUrl: './add-update-receptionist-dashboard.component.scss'
})
export class AddUpdateReceptionistDashboardComponent implements OnInit{
 form!:FormGroup;
  isEdit=false;
  lead_hid:any
  allCategoryList:Array<any>=[];
  allLeadStatusList:Array<any>=[];
  leadStatusDetailAdded: boolean = false;
  
  constructor (
    private fb:FormBuilder,
    private _receptionistService: ReceptionistService,private _adminService: AdminService, private router: Router,
    private _toastrService:ToastrService,private _superAdminService: SuperAdminService,private url: ActivatedRoute){}


  ngOnInit(){
    this.createForm();
    this.getAllCategoryList();
    this.getAllLeadStatusList();
    this.form.patchValue({
      lead_date: new Date().toISOString().split('T')[0],
    });
    this.lead_hid = this.url.snapshot.params['id'];
    if (this.lead_hid) {
      this.getLeadById(this.lead_hid);
      this.leadStatusDetailAdded = true;
      this.isEdit = true;
    }
  }

 
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  createForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      lead_date: [new Date().toISOString().split('T')[0], Validators.required],
      city: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      note: [null, Validators.required],
      category_id: [null, Validators.required],
      category_name:[''],
      leadFooterDetails: this.fb.array([this.newLeadFooter()])
    });
  }
  get control(){
    return this.form.controls;
  }
  get leadstatusDetailsArray() {
    return this.form.get('leadFooterDetails') as FormArray<any>;
  }

  newLeadFooter(): FormGroup {
    return this.fb.group({
      lead_fid: [null],
      comments: [null],
      calling_time: [null, Validators.required],
      no_of_calls: [null, Validators.required],
      lead_status_id: [null, Validators.required],
      follow_up_date: [null, Validators.required],
    })
  }
 addLeadFooter() {
   if (this.leadstatusDetailsArray.length < 2) {
    this.leadstatusDetailsArray.push(this.newLeadFooter());
  }
  this.leadStatusDetailAdded = true;
}
  deleteLeadFooter(i: any) {
    this.leadstatusDetailsArray.removeAt(i)
  }
  submit(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.addLeadFollowUp();
      }
    });
    
  }

  addLeadFollowUp(){
    if (this.form.valid) {
      let data = this.form.getRawValue();
      this._receptionistService.editLeadFollowUp(data,this.lead_hid).subscribe({
        next:(res:any)=>{
          if (res.status==200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'follow-up' } }])
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
  
  getLeadById(id: any) {
    this._receptionistService.getLeadById(id).subscribe((result: any) => {
      this.form.patchValue(result.data);
      const leadDate = new Date(result.data.lead_date);
      this.form.get('lead_date')?.patchValue(
        `${leadDate.getFullYear()}-${('0' + (leadDate.getMonth() + 1)).slice(-2)}-${('0' + leadDate.getDate()).slice(-2)}`
      );
      let leadFooterDetails = result.data.leadFooterDetails;
      if (leadFooterDetails.length > 0) {
        this.leadstatusDetailsArray.clear();
        for (let index = 0; index < leadFooterDetails.length + 1; index++) {
          const element = leadFooterDetails[index];
          this.leadstatusDetailsArray.push(this.newLeadFooter());
          this.leadstatusDetailsArray.at(index).get('lead_fid')?.patchValue(element?.lead_fid);
          this.leadstatusDetailsArray.at(index).get('comments')?.patchValue(element?.comments);
          this.leadstatusDetailsArray.at(index).get('calling_time')?.patchValue(element?.calling_time);
          this.leadstatusDetailsArray.at(index).get('no_of_calls')?.patchValue(element?.no_of_calls);
          this.leadstatusDetailsArray.at(index).get('lead_status_id')?.patchValue(element?.lead_status_id);
          const followUpDate = new Date(element?.follow_up_date);
          this.leadstatusDetailsArray.at(index).get('follow_up_date')?.patchValue(
            `${followUpDate.getFullYear()}-${('0' + (followUpDate.getMonth() + 1)).slice(-2)}-${('0' + followUpDate.getDate()).slice(-2)}`
          );
        }
        for (let index = 0; index < leadFooterDetails.length; index++) {
           // Enable controls for all elements including the last one
           this.leadstatusDetailsArray.at(index).get('comments')?.disable();
           this.leadstatusDetailsArray.at(index).get('calling_time')?.disable();
           this.leadstatusDetailsArray.at(index).get('no_of_calls')?.disable();
           this.leadstatusDetailsArray.at(index).get('lead_status_id')?.disable();
           this.leadstatusDetailsArray.at(index).get('follow_up_date')?.disable();
        }
      }
      this.form.get('category_name')?.patchValue(result.data.category_name)
    });
  }

  //get category list...
  getAllCategoryList(){
    this._adminService.getAllCategoryListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allCategoryList =res.data;
        }
      }
    });
  }
   //get  Lead Status list...
   getAllLeadStatusList(){
    this._superAdminService.allLeadStatusList().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allLeadStatusList =res.data;
        }
      }
    });
  }
}
