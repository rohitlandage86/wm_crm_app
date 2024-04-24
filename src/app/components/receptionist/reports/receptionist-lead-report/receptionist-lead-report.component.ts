import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { freeSet } from '@coreui/icons';
import { AdminService } from 'src/app/components/admin/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-receptionist-lead-report',
  templateUrl: './receptionist-lead-report.component.html',
  styleUrl: './receptionist-lead-report.component.scss'
})
export class ReceptionistLeadReportComponent implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  allLeadsList: Array<any> = [];
  allCategoryList:Array<any>=[];
  selectedCategory:any;
  form!:FormGroup;
  fromDate='';
  toDate='';
  category_id='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService, private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllLeadsList();
    this.getAllCategoryList();
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      category_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Leads List...
  getAllLeadsList() {
    this._receptionistService.getAllLeadsList(this.page, this.perPage, this.fromDate,this.toDate,this.category_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadsList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  //get category list...
  getAllCategoryList(){
    this._adminService.getAllCategoryListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allCategoryList = res.data;
        } else {
          this.allCategoryList = [];
        }
      }
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadsList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.category_id = this.form.value.category_id;
    this._receptionistService.getAllLeadsList(this.page, this.perPage, this.fromDate, this.toDate, this.category_id ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadsList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allLeadsList = []
        }
      }
    });
  }
}

