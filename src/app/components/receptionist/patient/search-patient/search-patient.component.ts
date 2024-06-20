import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from '../../receptionist.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';



@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrl: './search-patient.component.scss'
})
export class SearchPatientComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  searchQuery: string = '';
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor(
    private _receptionistService: ReceptionistService,
  ) {
  }


  ngOnInit() {
    this.searchControl.valueChanges
    this.getSearchPatient(this.searchQuery);
  }

  //get is Patient search data
  getSearchPatient(searchQuery: string): void {
    // Make API call with the search query'
    this.searchQuery = searchQuery
    this._receptionistService.getAllSearchPatientRegistrationList(this.page, this.perPage, this.searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
          
        }else{
          this.allPatientVisitList=[];
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
    this.getSearchPatient(this.searchQuery);
  }
}
