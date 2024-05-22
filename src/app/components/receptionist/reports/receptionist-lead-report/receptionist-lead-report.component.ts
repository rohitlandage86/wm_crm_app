import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { freeSet } from '@coreui/icons';
import { AdminService } from 'src/app/components/admin/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-receptionist-lead-report',
  templateUrl: './receptionist-lead-report.component.html',
  styleUrl: './receptionist-lead-report.component.scss'
})
export class ReceptionistLeadReportComponent implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  allLeadsList: Array<any> = [];
  //for Category
  searchCategoryValue = '';
  filteredCategoryArray: Array<any> = [];
  allCategoryList: Array<any> = [];
  selectedCategory:any;
  form!:FormGroup;
  fromDate='';
  toDate='';
  category_id='';
  minDate = new Date();
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor(private _receptionistService: ReceptionistService, private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    this.getAllCategoryList();
    this.createForm()
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getAllLeadsList();
      }, 1000); // Set timeout to 5 seconds (5000 milliseconds)
    });
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      category_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Leads List...
  getAllLeadsList() {
    this._receptionistService.getAllLeadsList(this.page, this.perPage, this.fromDate,this.toDate,this.category_id,this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadsList = res.data;
          this.total = res.pagination.total;
        }else{
            this.allLeadsList =[];
            this.total = 0;
        }
      }
    });
  }
  //get category list...
  getAllCategoryList(){
    this._adminService.getAllCategoryListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length > 0) {
          this.allCategoryList = res.data;
          this.filteredCategoryArray = this.allCategoryList;       
        }else
        {
          this.allCategoryList = [];
          this.filteredCategoryArray = this.allCategoryList;    
        }
      }
    })
  }
    //Filter category array
    filterCategory() {
      if (this.searchCategoryValue !== "") {
        this.filteredCategoryArray = this.allCategoryList.filter((obj) =>
          obj.category_name.toLowerCase().includes(this.searchCategoryValue.toLowerCase())
        );
      } else {
        this.filteredCategoryArray = this.allCategoryList;
      }
    }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadsList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.category_id = this.form.value.category_id;
    this._receptionistService.getAllLeadsList(this.page, this.perPage, this.fromDate, this.toDate, this.category_id ,this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadsList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allLeadsList = []
        }
      }
    });
  }
  search(searchTerm: string) {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
    // You can make API calls or perform any other search-related tasks here
    this.getAllLeadsList();
  }
}

