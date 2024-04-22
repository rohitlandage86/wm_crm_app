import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import {  FormBuilder,  FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ReceptionistService } from '../../receptionist.service';

@Component({
  selector: 'app-search-bill',
  templateUrl: './search-bill.component.html',
  styleUrl: './search-bill.component.scss'
})
export class SearchBillComponent implements OnInit{
  form!: FormGroup;
  isEdit = false;
  mrno: any
  allBillList: Array<any> = [];
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 10;
  total = 0;
   icons = freeSet;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService, private url: ActivatedRoute) { }


  ngOnInit() {
  

  }

 //get all consutlation view by mrno (history)..
 getConsultationHistory(searchQuery: any) {
  this._receptionistService.getAllSearchBillList(this.page, this.perPage,searchQuery).subscribe({
    next: (res: any) => {
      if (res.data.length > 0) {
        this.allBillList = res.data;
        console.log(res);

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
