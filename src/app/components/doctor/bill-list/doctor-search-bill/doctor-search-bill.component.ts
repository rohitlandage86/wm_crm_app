import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-doctor-search-bill',
  templateUrl: './doctor-search-bill.component.html',
  styleUrl: './doctor-search-bill.component.scss'
})
export class DoctorSearchBillComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  mrno: any
  allBillList: Array<any> = [];
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
    private _receptionistService: ReceptionistService) { }

  ngOnInit() {
    this.searchControl.valueChanges
    .pipe(debounceTime(700))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getbillHistory(this.searchQuery);
      }, 5000); // Set timeout to 5 seconds (5000 milliseconds)
    });
  }

  //get all consutlation view by mrno (history)..
  getbillHistory(searchQuery: any) {
    this.searchQuery = searchQuery;
    this._receptionistService.getAllSearchBillList(this.page, this.perPage, searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allBillList = res.data;
        }else{
          this.allBillList =[];
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
  }
}
