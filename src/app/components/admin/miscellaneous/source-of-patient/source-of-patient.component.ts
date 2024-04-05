import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateSourceOfPatientComponent } from './add-update-source-of-patient/add-update-source-of-patient.component';

@Component({
  selector: 'app-source-of-patient',
  templateUrl: './source-of-patient.component.html',
  styleUrl: './source-of-patient.component.scss'
})
export class SourceOfPatientComponent implements OnInit{
  allSourceOfPatientList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
  color: string | undefined;

  constructor(private dialog: MatDialog, private _adminService: AdminService, private _toastrService: ToastrService) { }
  ngOnInit() {
    this.getAllSourceOfPatientList();
  }
  //get all SourceOfPatient List...
  getAllSourceOfPatientList() {
    this._adminService.getAllSourceOfPatientList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSourceOfPatientList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllSourceOfPatientList();
  }
  //open SourceOfPatient...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateSourceOfPatientComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllSourceOfPatientList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  //slide-toggle change 
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.onSourceOfPatientStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllSourceOfPatientList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllSourceOfPatientList();
        }
      },
    })
  }
}
