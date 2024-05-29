import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from '../../../receptionist.service';

@Component({
  selector: 'app-pending-followup',
  templateUrl: './pending-followup.component.html',
  styleUrl: './pending-followup.component.scss'
})
export class PendingFollowupComponent implements OnInit{
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
  ) {
    this.follow_up_date = '';
  }

  ngOnInit() {
    this.setTodayDate();
    this.getAllPendingFollowUpList();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.follow_up_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
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
