import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from './../receptionist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit {
  allLeadFollowUpList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  lead_date: string;
  color: string | undefined;
  constructor(private _receptionistService: ReceptionistService) { this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadDateList();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all Lead Date List...
  getAllLeadDateList() {
    this._receptionistService.getAllLeadDateList(this.page, this.perPage, this.lead_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          console.log(res);
          this.allLeadFollowUpList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadDateList();
  }
}
