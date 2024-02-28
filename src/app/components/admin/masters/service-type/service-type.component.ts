import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateServiceTypeComponent } from './add-update-service-type/add-update-service-type.component';

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
  total=0

  constructor(private dialog: MatDialog, private _adminService: AdminService) { }
  ngOnInit(){
    this.getAllServiceTypeList();
  }
  //get all Service Type List...
  getAllServiceTypeList() {
    this._adminService.getAllServiceTypeList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length>0) {
          console.log(res.data);
          this.allServiceTypeList = res.data;
          this.total= res.pagination.total;
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
    dialogRef.afterClosed().subscribe((message:any) => {
      if (message == 'create' || message == 'update') {
        this.getAllServiceTypeList();
      } else {
        console.log('nothing happen');
      }
    });
  }
}