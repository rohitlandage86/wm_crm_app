import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { DoctorService } from '../../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pending-consultation-list',
  templateUrl: './pending-consultation-list.component.html',
  styleUrls: ['./pending-consultation-list.component.scss']
})
export class PendingConsultationListComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0;
  searchInput: string = ''; // Property to store search input

  constructor(
    private _doctorService: DoctorService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllPatientVisitLists('');
  }

  getAllPatientVisitLists(mobileNo?: string) {
    this._doctorService.getAllPatientVisitLists(this.page, this.perPage, '',mobileNo).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allPatientVisitList = [];
          this.total = 0;
        }
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitLists(this.searchInput); // Pass the current search input
  }

  transformVisitType(visitType: string): string {
    switch (visitType) {
      case 'FIRST_VISIT':
        return 'First Visit';
      case 'Follow_UP':
        return 'Follow Up';
      case 'RE_VISIT':
        return 'Re Visit';
      default:
        return visitType;
    }
  }

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

  onSearch(mobileNo: string) {
    this.searchInput = mobileNo; // Store the search input
    this.page = 1;  // Reset to first page on search
    this.getAllPatientVisitLists(mobileNo);
  }
}
