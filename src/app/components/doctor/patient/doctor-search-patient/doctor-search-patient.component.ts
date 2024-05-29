import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-doctor-search-patient',
  templateUrl: './doctor-search-patient.component.html',
  styleUrl: './doctor-search-patient.component.scss'
})
export class DoctorSearchPatientComponent implements OnInit {
  allConsultationList: Array<any> = [];
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  constructor(
    private _doctorService: DoctorService
  ) {}

  ngOnInit() {
  }

  //get is Consultation search data
  getSearchConsultation(searchQuery: string): void {
    // Make API call with the search query
    this._doctorService.getAllSearchConsultationList(this.page, this.perPage, searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationList = res.data;
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

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
  }
}
