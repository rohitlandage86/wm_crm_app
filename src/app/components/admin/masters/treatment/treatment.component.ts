import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateTreatmentComponent } from './add-update-treatment/add-update-treatment.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.scss'
})
export class TreatmentComponent implements OnInit{
  allTreatmentList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit(){
    this.getAllTreatmentList();
  }
    //get all treatment List...
    getAllTreatmentList() {
      this._adminService.getAllTreatmentList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length>0) {
            this.allTreatmentList = res.data;
            this.total= res.pagination.total;
          }
        }
      });
    } 
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllTreatmentList();
    }
  
    //open treatment...
    openDialog(data?: any) {
      const dialogRef = this.dialog.open(AddUpdateTreatmentComponent, {
        data: data,
        width: '50%',
        panelClass: 'mat-mdc-dialog-container'
      });
      dialogRef.afterClosed().subscribe((message:any) => {
        if (message == 'create' || message == 'update') {
          this.getAllTreatmentList();
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
    this._adminService.onTreatmentStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllTreatmentList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllTreatmentList();
        }
      },
    })
  }
}
