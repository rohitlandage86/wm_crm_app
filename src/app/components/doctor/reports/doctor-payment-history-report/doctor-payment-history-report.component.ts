import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { DoctorService } from '../../doctor.service';


@Component({
  selector: 'app-doctor-payment-history-report',
  templateUrl: './doctor-payment-history-report.component.html',
  styleUrl: './doctor-payment-history-report.component.scss'
})
export class DoctorPaymentHistoryReportComponent implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  form!:FormGroup;

  allPaymentHistoryList: Array<any> = [];
  fromDate='';
  toDate='';
  gender='';
  minDate = new Date();
  constructor(  private fb:FormBuilder, private _doctorService: DoctorService) { }

  ngOnInit() {
    // this.getAllBillList();

    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Bill List...
  getAllPaymentListList() {
    this._doctorService.getAllPaymentHistoryList(this.page, this.perPage, this.fromDate,this.toDate).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPaymentHistoryList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allPaymentHistoryList =[];
          this.total = 0;
        }
      }
    });
  }


  
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPaymentListList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this._doctorService.getAllPaymentHistoryList(this.page, this.perPage, this.fromDate, this.toDate).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPaymentHistoryList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allPaymentHistoryList = [];
          this.total = 0
        }
      }
    });
    
  }
}
