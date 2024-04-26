import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-follow-up-list',
  templateUrl: './doctor-follow-up-list.component.html',
  styleUrl: './doctor-follow-up-list.component.scss'
})
export class DoctorFollowUpListComponent  implements OnInit{
  allLeadFollowUpList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0;
  follow_up_date: string;
  // pending follow up list
  allPendingFollowUpList: Array<any> = [];
  pendingPage = 1;
  pendingPerPage = 50;
  pendingTotal = 0;

  constructor(
    private _receptionistService: ReceptionistService,
    private _toastrService: ToastrService
  ) {
    this.follow_up_date = '';
  }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
    this.getAllPendingFollowUpList();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.follow_up_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all LeadFollowUp List...
  getAllLeadFollowUpList() {
    this._receptionistService
      .getAllLeadFollowUpList(this.page, this.perPage, this.follow_up_date)
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allLeadFollowUpList = res.data;
            this.total = res.pagination.total;
          }
        },
      });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadFollowUpList();
  }

  //slide-toggle change Patient
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._receptionistService.onPatientStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllLeadFollowUpList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllLeadFollowUpList();
        }
      },
    });
  }
  //pending follow up list
  getAllPendingFollowUpList(){
    this._receptionistService.getAllPendingLeadFollowUpList(this.pendingPage, this.pendingPerPage, this.follow_up_date).subscribe({
      next:(res:any)=>{
        if (res.data.length > 0) {
          this.allPendingFollowUpList = res.data;
          this.pendingTotal = res.pagination.total;
        }
      }
    })
  }
  onPendingPageChange(event: PageEvent): void {
    this.pendingPage = event.pageIndex + 1;
    this.pendingPerPage = event.pageSize;
    this.getAllPendingFollowUpList();
  }
}
