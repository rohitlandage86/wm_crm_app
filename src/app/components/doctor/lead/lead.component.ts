import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from '../../receptionist/receptionist.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrl: './lead.component.scss'
})
export class LeadComponent implements OnInit {
  allLeadFollowUpList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  lead_date: string;
  color: string | undefined;
  constructor(private _receptionistService: ReceptionistService) { this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all LeadFollowUp List...
  getAllLeadFollowUpList() {
    this._receptionistService.getAllLeadFollowUpList(this.page, this.perPage, this.lead_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadFollowUpList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadFollowUpList();
  }
}
