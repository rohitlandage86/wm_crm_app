import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddUpdateDiagnosisComponent } from './add-update-diagnosis/add-update-diagnosis.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss'
})
export class DiagnosisComponent implements OnInit {
  allDiagnosisList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit(){
    this.getAllDiagnosisList();
  }
    //get all diagnosis List...
    getAllDiagnosisList() {
      this._adminService.getAllDiagnosisList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length>0) {
         
            this.allDiagnosisList = res.data;
            
            
            this.total= res.pagination.total;
          }
        }
      });
    } 
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllDiagnosisList();
    }
  
    //open diagnosis...
    openDialog(data?: any) {
      const dialogRef = this.dialog.open(AddUpdateDiagnosisComponent, {
        data: data,
        width: '50%',
        panelClass: 'mat-mdc-dialog-container'
      });
      dialogRef.afterClosed().subscribe((message:any) => {
        if (message == 'create' || message == 'update') {
          this.getAllDiagnosisList();
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
      this._adminService.onDiagnosisStatusChange(status,id).subscribe({     
        next: (res: any) => {
          this._toastrService.success(res.message);
        console.log(res);
        this.getAllDiagnosisList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllDiagnosisList();
        }
      },})
  
  
    }
}
