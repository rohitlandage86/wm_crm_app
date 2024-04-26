import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateServiceComponent } from './add-update-service/add-update-service.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent  implements OnInit {
  allEntitieslist: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 50;
  total=0
color: string|undefined;

  constructor(private dialog: MatDialog, private _adminService: AdminService, private _toastrService: ToastrService) { }
  ngOnInit(){
    this.getAllEntitiesList();
  }
  //get all Entities list...
  getAllEntitiesList() {
    this._adminService.getAllServicesList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length>0) {
          this.allEntitieslist = res.data;
          this.total= res.pagination.total;
        }
      }
    })
  } 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllEntitiesList();
  }

  //open Entity...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateServiceComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message:any) => {
      if (message == 'create' || message == 'update') {
        this.getAllEntitiesList();
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
    this._adminService.onServiceStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllEntitiesList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllEntitiesList();
        }
      },
    })
  }
}
