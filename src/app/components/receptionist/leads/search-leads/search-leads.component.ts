import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute } from '@angular/router';
import { ReceptionistService } from '../../receptionist.service';

@Component({
  selector: 'app-search-leads',
  templateUrl: './search-leads.component.html',
  styleUrl: './search-leads.component.scss'
})
export class SearchLeadsComponent implements OnInit {
  allLeadList: Array<any> = [];
  icons = freeSet;
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 50;
  total = 0;
  searchQuery: string = '';
  constructor(
    private _receptionistService: ReceptionistService,
  ) { }

  ngOnInit() {
  }
  //get is lead search data
  getSearchLead(searchQuery: string): void {
    this.searchQuery = searchQuery;
    // Make API call with the search query
    this._receptionistService.getAllSearchLeadHeaderList(this.page, this.perPage, this.searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadList = res.data;
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
    this.getSearchLead(this.searchQuery);
  }
}




