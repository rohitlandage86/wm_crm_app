import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from './../receptionist.service';
import { AddUpdateLeadsComponent } from './add-update-leads/add-update-leads.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit{
  allLeadList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
color: string|undefined;
  constructor( private _receptionistService: ReceptionistService,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllLeadsList();
  }
  //get all Lead List...
  getAllLeadsList() {
    this._receptionistService.getAllLeadsList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

          this.allLeadList = res.data;


          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadsList();
  }

  // //open Lead...
  // openDialog(data?: any) {
  //   const dialogRef = this.dialog.open(AddUpdateLeadsComponent, {
  //     data: data,
  //     width: '50%',
  //     panelClass: 'mat-mdc-dialog-container'
  //   });
  //   dialogRef.afterClosed().subscribe((message: any) => {
  //     if (message == 'create' || message == 'update') {
  //       this.getAllLeadsList();
  //     } else {
  //       console.log('nothing happen');
  //     }
  //   });
  // }
  //slide-toggle change Lead
  changeEvent(event: any, id: any) {
    console.log(event.checked, id);
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._receptionistService.onLeadStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        console.log(res);
        this.getAllLeadsList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllLeadsList();
        }
      },
    })


  }
}
