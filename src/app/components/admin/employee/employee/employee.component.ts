import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateEmployeeComponent } from './add-update-employee/add-update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  allEmployeeList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllEmployeeList();
  }
  //get all employee List...
  getAllEmployeeList() {
    this._adminService.getAllEmployeeList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

          this.allEmployeeList = res.data;


          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllEmployeeList();
  }

  //open employee...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateEmployeeComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllEmployeeList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  //slide-toggle change employee
  changeEvent(event: any, id: any) {
    console.log(event.checked, id);
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._adminService.onEmployeeStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllEmployeeList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllEmployeeList();
        }
      },
    })


  }
}
