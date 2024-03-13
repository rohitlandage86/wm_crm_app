import { AddUpdateChiefComplaintsComponent } from './add-update-chief-complaints/add-update-chief-complaints.component';
import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chief-complaints',
  templateUrl: './chief-complaints.component.html',
  styleUrl: './chief-complaints.component.scss'
})
export class ChiefComplaintsComponent implements OnInit {
  allChiefComplaintsList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllChiefComplaintsList();
  }
  //get all chief_complaints List...
  getAllChiefComplaintsList() {
    this._adminService.getAllChiefComplaintsList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

          this.allChiefComplaintsList = res.data;


          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllChiefComplaintsList();
  }

  //open Chief_Complaints...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateChiefComplaintsComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllChiefComplaintsList();
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
    this._adminService.onChiefComplaintsStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllChiefComplaintsList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllChiefComplaintsList();
        }
      },
    })


  }
}
