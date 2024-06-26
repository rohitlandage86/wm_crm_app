import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { ReceptionistService } from '../../receptionist.service';
import { PageEvent } from '@angular/material/paginator';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-receptionist-follow-up-report',
  templateUrl: './receptionist-follow-up-report.component.html',
  styleUrl: './receptionist-follow-up-report.component.scss'
})
export class ReceptionistFollowUpReportComponent  implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  allLeadFollowUpList: Array<any> = [];
  allLeadStatusList:Array<any>=[];
  form!:FormGroup;
  fromDate='';
  toDate='';
  lead_status_id='';
  minDate = new Date();
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor(private _receptionistService: ReceptionistService, private fb:FormBuilder, private _superAdminService:SuperAdminService) { }

  ngOnInit() {
    // this.getAllLeadFollowUpList();
    this.getLeadStatusList();
    this.createForm()
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getAllLeadFollowUpList();
      }, 1000); // Set timeout to 5 seconds (5000 milliseconds)
    });
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      lead_status_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Leads List...
  getAllLeadFollowUpList() {
    this._receptionistService.getAllLeadFollowUpReportList(this.page, this.perPage, this.fromDate,this.toDate,this.lead_status_id,this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadFollowUpList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allLeadFollowUpList = [];
          this.total = 0;
        }
      }
    });
  }
  //get lead status list...
  getLeadStatusList(){
    this._superAdminService.allLeadStatusList().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allLeadStatusList = res.data;
        } else {
          this.allLeadStatusList = [];
        }
      }
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadFollowUpList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.lead_status_id = this.form.value.lead_status_id;
    
    this._receptionistService.getAllLeadFollowUpReportList(this.page, this.perPage, this.fromDate, this.toDate, this.lead_status_id ,this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadFollowUpList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allLeadFollowUpList = []
        }
      }
    });
    
  }
}
