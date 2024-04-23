import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute } from '@angular/router';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-search-lead',
  templateUrl: './doctor-search-lead.component.html',
  styleUrl: './doctor-search-lead.component.scss'
})
export class DoctorSearchLeadComponent implements OnInit{
  form!:FormGroup;
  allLeadList: Array<any> = [];
  isEdit=false;
  lead_hid:any;
  icons = freeSet;
  allCategoryList:Array<any>=[];
  allLeadStatusList:Array<any>=[];
  leadStatusDetailAdded: boolean = false;
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 10;
  total = 0;
  searchQuery: string = '';
  constructor (
    private fb:FormBuilder,
    private _receptionistService: ReceptionistService,private _adminService: AdminService,
   private _superAdminService: SuperAdminService, private url: ActivatedRoute){}

  ngOnInit(){
    this.createForm();
    this.getAllCategoryList();
    this.getAllLeadStatusList();
    this.form.patchValue({
      lead_date: new Date().toISOString().split('T')[0],
    });
    this.lead_hid = this.url.snapshot.params['id']
    if (this.lead_hid) {
      this.getLeadById(this.lead_hid)
      this.leadStatusDetailAdded = true;
      this.isEdit =true;
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
      lead_date: ['', Validators.required],
      city: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      note: [null, Validators.required],
      category_id: [null, Validators.required],
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
    this.leadstatusDetailsArray.push(this.newLeadFooter());
      this.leadStatusDetailAdded = true;
  }
  deleteLeadFooter(i: any) {
    this.leadstatusDetailsArray.removeAt(i)
  }
//get is lead search data
getSearchLead(searchQuery: string): void {
  // Make API call with the search query
  this._receptionistService.getAllSearchLeadHeaderList(this.page, this.perPage, searchQuery).subscribe({
    next: (res: any) => {
      if (res.data.length > 0) {
        this.allLeadList = res.data;
        this.total = res.pagination.total;
      }
    }
  });
}
  // Other properties and methods
  isValidName(inputValue: string): boolean {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(inputValue);
  }
  validateMobileNo(inputValue: string): boolean {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(inputValue);
  }
  isValidInput(inputValue: string): boolean {
    return this.validateMobileNo(inputValue) || this.isValidName(inputValue);
  }

  getLeadById(id:any){
    this._receptionistService.getLeadById(id).subscribe((result: any) => {
      this.form.patchValue(result.data)
      this.form.disable(); 
      const leadDate = new Date(result.data.lead_date);
    this.form.get('lead_date')?.patchValue(
      `${leadDate.getFullYear()}-${('0' + (leadDate.getMonth() + 1)).slice(-2)}-${('0' + leadDate.getDate()).slice(-2)}`
    );
      let leadFooterDetails = result.data.leadFooterDetails;
      if (leadFooterDetails.length > 0) {
        this.leadstatusDetailsArray.clear();
        for (let index = 0; index < leadFooterDetails.length; index++) {
          const element = leadFooterDetails[index];
          this.leadstatusDetailsArray.push(this.newLeadFooter())
          this.leadstatusDetailsArray.at(index).get('lead_fid')?.patchValue(element.lead_fid)
        this.leadstatusDetailsArray.at(index).get('comments')?.patchValue(element.comments);
        this.leadstatusDetailsArray.at(index).get('calling_time')?.patchValue(element.calling_time);
        this.leadstatusDetailsArray.at(index).get('no_of_calls')?.patchValue(element.no_of_calls);
        this.leadstatusDetailsArray.at(index).get('lead_status_id')?.patchValue(element.lead_status_id);
        const followUpDate = new Date(element.follow_up_date);
        this.leadstatusDetailsArray.at(index).get('follow_up_date')?.patchValue(
          `${followUpDate.getFullYear()}-${('0' + (followUpDate.getMonth() + 1)).slice(-2)}-${('0' + followUpDate.getDate()).slice(-2)}`
        );
        }
      }

    })
    
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
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
  }
}
