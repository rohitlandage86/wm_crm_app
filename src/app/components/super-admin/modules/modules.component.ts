import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AddUpdateModulesComponent } from './add-update-modules/add-update-modules.component';
import { MatDialog } from '@angular/material/dialog';
import { SuperAdminService } from '../super-admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent implements OnInit {
  allModuleList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0

  constructor(private dialog: MatDialog, private _superAdminService: SuperAdminService) { }
  ngOnInit(){
    this.getAllModuleList();
  }
  //get all Module list...
  getAllModuleList() {
    this._superAdminService.getAllModulesList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length>0) {
          this.allModuleList = res.data;
          this.total= res.pagination.total;
        }
      }
    })
  } 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllModuleList();
  }

  //open module...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateModulesComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message:any) => {
      if (message == 'create' || message == 'update') {
        this.getAllModuleList();
      } else {
        console.log('nothing happen');
      }
    });
  }
}