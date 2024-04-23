import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { ReceptionistService } from '../../receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-receptionist-bill-report',
  templateUrl: './receptionist-bill-report.component.html',
  styleUrl: './receptionist-bill-report.component.scss'
})
export class ReceptionistBillReportComponent implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  form!:FormGroup;

  allBillList: Array<any> = [];
  allServiceList:Array<any>=[];
  allServiceTypeList:Array<any>=[];
  allEntityList:Array<any>=[];
  fromDate='';
  toDate='';
  gender='';
  entity_id='';
  service_id='';
  service_type_id='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService,  private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllBillList();
    this.getAllServiceList();
    this.getAllServiceTypeList();
    this.getAllEntityList();
    this.createForm();
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      service_id:["null"],
      service_type_id:["null"],
      entity_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Bill List...
  getAllBillList() {
    this._receptionistService.getAllBillList(this.page, this.perPage, this.fromDate,this.toDate,this.entity_id,this.service_id, this.service_type_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allBillList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allBillList =[];
          this.total = 0;
        }
      }
    });
  }
   //get entity list...
   getAllEntityList(){
    this._adminService.getAllEntitiesListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allEntityList = res.data;
        } else {
          this.allEntityList = [];
        }
      }
    })
  }
  //get All Service list...
  getAllServiceList(){
    this._adminService.getAllServiceListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allServiceList = res.data;
        } else {
          this.allServiceList = [];
        }
      }
    })
  }
    //get Service Type list...
    getAllServiceTypeList(){
      this._adminService.getAllServiceTypeListWma().subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allServiceTypeList = res.data;
          } else {
            this.allServiceTypeList = [];
          }
        }
      })
    }
  
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllBillList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.entity_id = this.form.value.entity_id
    this.service_id = this.form.value.service_id;
    this.service_type_id = this.form.value.service_type_id;
    this._receptionistService.getAllBillList(this.page, this.perPage, this.fromDate, this.toDate,this.entity_id, this.service_id , this.service_type_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allBillList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allBillList = [];
          this.total = 0
        }
      }
    });
  }
}
