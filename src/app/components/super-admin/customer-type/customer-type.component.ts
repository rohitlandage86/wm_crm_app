import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { freeSet } from '@coreui/icons';
import { SuperAdminService } from './../super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateCustomerTypeComponent } from './add-update-customer-type/add-update-customer-type.component';
@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrl: './customer-type.component.scss'
})
export class CustomerTypeComponent implements OnInit {
  allCustomerTypeslist: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0

  constructor(private dialog: MatDialog, private _superAdminService: SuperAdminService) { }
  ngOnInit(){
    this.getAllCustomerTypeList();
  }
  //get all customer type list...
  getAllCustomerTypeList() {
    this._superAdminService.getAllCustomerypesList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length>0) {
          this.allCustomerTypeslist = res.data;
          this.total= res.pagination.total;
        }
      }
    })
  } 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllCustomerTypeList();
  }

  //open customer type...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateCustomerTypeComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message:any) => {
      if (message == 'create' || message == 'update') {
        this.getAllCustomerTypeList();
      } else {
        console.log('nothing happen');
      }
      console.log(message );
      
    });
  }
}
