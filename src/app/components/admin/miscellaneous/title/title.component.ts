import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateTitleComponent } from './add-update-title/add-update-title.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements OnInit{
  allTitleList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0
  color: string | undefined;

  constructor(private dialog: MatDialog, private _adminService: AdminService, private _toastrService: ToastrService) { }
  ngOnInit() {
    this.getAllTitleList();
  }
  //get all title List...
  getAllTitleList() {
    this._adminService.getAllTitleList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTitleList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllTitleList();
  }

  //open title...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateTitleComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllTitleList();
      } else {
      }
    });
  }
  //slide-toggle change 
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.onTitleStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllTitleList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllTitleList();
        }
      },
    })
  }
}
