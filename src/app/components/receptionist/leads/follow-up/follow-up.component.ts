import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from '../../receptionist.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrl: './follow-up.component.scss',
})
export class FollowUpComponent implements OnInit {
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
    private _receptionistService: ReceptionistService, private _sharedService:SharedService
  ) {
    this.follow_up_date = '';
  }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
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
            this._sharedService.setLoading1(true);
            setTimeout(() => {
              this._sharedService.setLoading1(false);
            }, 1000); 
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

}
