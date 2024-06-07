import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-doctor-search-lead',
  templateUrl: './doctor-search-lead.component.html',
  styleUrl: './doctor-search-lead.component.scss'
})
export class DoctorSearchLeadComponent implements OnInit{
  allLeadList: Array<any> = [];
  icons = freeSet;
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 50;
  total = 0;
  searchQuery: string = '';
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor (
    private _receptionistService: ReceptionistService,
   ){}

  ngOnInit(){
    this.searchControl.valueChanges
    .pipe(debounceTime(700))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getSearchLead(this.searchQuery);
      }, 5000); // Set timeout to 5 seconds (5000 milliseconds)
    });
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
      }else{
        this.allLeadList =[];
        this.total=0;
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
