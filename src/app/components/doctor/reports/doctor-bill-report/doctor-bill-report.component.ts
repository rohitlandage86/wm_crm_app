import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { AdminService } from 'src/app/components/admin/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-doctor-bill-report',
  templateUrl: './doctor-bill-report.component.html',
  styleUrl: './doctor-bill-report.component.scss'
})
export class DoctorBillReportComponent implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  form!:FormGroup;
  //for Service
  searchServiceValue = '';
  allServiceList:Array<any>=[];
  filteredServiceArray: Array<any> = [];

  allBillList: Array<any> = [];
  allServiceTypeList:Array<any>=[];
  allEntityList:Array<any>=[];
  fromDate='';
  toDate='';
  gender='';
  entity_id='';
  service_id='';
  service_type_id='';
  minDate = new Date();
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor(private _receptionistService: ReceptionistService,  private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllBillList();
    this.getAllServiceList();
    this.getAllServiceTypeList();
    this.getAllEntityList();
    this.createForm();
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getAllBillList();
      }, 1000); // Set timeout to 5 seconds (5000 milliseconds)
    });
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
    this._receptionistService.getAllBillList(this.page, this.perPage, this.fromDate,this.toDate,this.entity_id,this.service_id, this.service_type_id, this.searchTerm).subscribe({
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
        if (res.data.length > 0) {
          this.allServiceList = res.data;
          this.filteredServiceArray = this.allServiceList;       
        }else
        {
          this.allServiceList = [];
          this.filteredServiceArray = this.allServiceList;    
        }
      }
    })
  }
   //Filter Service array
   filterService() {
    if (this.searchServiceValue !== "") {
      this.filteredServiceArray = this.allServiceList.filter((obj) =>
        obj.service_name.toLowerCase().includes(this.searchServiceValue.toLowerCase())
      );
    } else {
      this.filteredServiceArray = this.allServiceList;
    }
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
    filterServicesByType() {
      const selectedServiceTypeId = parseInt(this.form.value.service_type_id); // Convert to integer if service_type_id is a number
      if (!isNaN(selectedServiceTypeId) && selectedServiceTypeId !== null) { // Check if it's a valid number
         this.filteredServiceArray = this.allServiceList.filter(service => service.service_type_id === selectedServiceTypeId);
      } else {
         this.filteredServiceArray = this.allServiceList;
      }
   }   
    onServiceTypeChange() {
      this.filterServicesByType();
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
    this._receptionistService.getAllBillList(this.page, this.perPage, this.fromDate, this.toDate,this.entity_id, this.service_id , this.service_type_id, this.searchTerm).subscribe({
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
