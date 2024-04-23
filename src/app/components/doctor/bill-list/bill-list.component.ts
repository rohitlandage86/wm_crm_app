import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from '../../receptionist/receptionist.service';


@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss'
})
export class BillListComponent implements OnInit{
  allBillList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  Bill_date: string;
  color: string | undefined;
  constructor(private _receptionistService: ReceptionistService) { this.Bill_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllBillDateList();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.Bill_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all Lead Date List...
  getAllBillDateList() {
    this._receptionistService.getBillDateList(this.page, this.perPage, this.Bill_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allBillList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllBillDateList();
  }
}
