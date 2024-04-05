import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateReferedByComponent } from './add-update-refered-by/add-update-refered-by.component';

@Component({
  selector: 'app-refered-by',
  templateUrl: './refered-by.component.html',
  styleUrl: './refered-by.component.scss'
})
export class ReferedByComponent implements OnInit {
  allReferedByList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllReferedByList();
  }
  //get all refered_by List...
  getAllReferedByList() {
    this._adminService.getAllReferedByList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allReferedByList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllReferedByList();
  }

  //open refered_by...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateReferedByComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllReferedByList();
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
    this._adminService.onReferedByStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllReferedByList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllReferedByList();
        }
      },
    })
  }
}
