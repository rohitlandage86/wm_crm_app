import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateServiceTypeComponent } from './add-update-service-type/add-update-service-type.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrl: './service-type.component.scss'
})
export class ServiceTypeComponent implements OnInit {
  allServiceTypeList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
  color: string | undefined;

  constructor(private dialog: MatDialog, private _adminService: AdminService, private _toastrService: ToastrService) { }
  ngOnInit() {
    this.getAllServiceTypeList();
  }
  //get all Service Type List...
  getAllServiceTypeList() {
    this._adminService.getAllServiceTypeList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          console.log(res.data);
          this.allServiceTypeList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllServiceTypeList();
  }

  //open Service Type...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateServiceTypeComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllServiceTypeList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  //slide-toggle change 
  changeEvent(event: any, id: any) {
    console.log(event.checked, id);
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.onServiceTypeStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllServiceTypeList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllServiceTypeList();
        }
      },
    })


  }

}