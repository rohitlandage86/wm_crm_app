import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateMedicinesComponent } from './add-update-medicines/add-update-medicines.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss'
})
export class MedicinesComponent implements OnInit{
  allMedicinesList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit(){
    this.getAllMedicinesList();
  }
    //get all medicines List...
    getAllMedicinesList() {
      this._adminService.getAllMedicinesList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length>0) {
            this.allMedicinesList = res.data;
            this.total= res.pagination.total;
          }
        }
      });
    } 
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllMedicinesList();
    }
  
    //open medicines...
    openDialog(data?: any) {
      const dialogRef = this.dialog.open(AddUpdateMedicinesComponent, {
        data: data,
        width: '50%',
        panelClass: 'mat-mdc-dialog-container'
      });
      dialogRef.afterClosed().subscribe((message:any) => {
        if (message == 'create' || message == 'update') {
          this.getAllMedicinesList();
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
        status=1;
      }
      this._adminService.onMedicinesStatusChange(status,id).subscribe({     
        next: (res: any) => {
          this._toastrService.success(res.message);
        this.getAllMedicinesList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllMedicinesList();
        }
      },})
    }
}
