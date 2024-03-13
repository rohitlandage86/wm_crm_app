import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { SuperAdminService } from './../super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateCustomersComponent } from './add-update-customers/add-update-customers.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit{
  allCustomerslist: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0

  constructor( private _superAdminService: SuperAdminService) { }
  ngOnInit(){
    this.getAllCustomersList();
  }
  //get all customers list...
  getAllCustomersList() {
    this._superAdminService.getAllCustomersList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length>0) {
          this.allCustomerslist = res.data;
          this.total= res.pagination.total;
        }
      }
    })
  } 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllCustomersList();
  }


}
