import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateCategoryComponent } from './add-update-category/add-update-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  allCategoryList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total=0
color: string|undefined;
  constructor(private dialog: MatDialog, private _adminService: AdminService,private _toastrService: ToastrService) { }

  ngOnInit(){
    this.getAllCategoryList();
  }
    //get all category List...
    getAllCategoryList() {
      this._adminService.getAllCategoryList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length>0) {
         
            this.allCategoryList = res.data;
            
            
            this.total= res.pagination.total;
          }
        }
      });
    } 
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllCategoryList();
    }
  
    //open category...
    openDialog(data?: any) {
      const dialogRef = this.dialog.open(AddUpdateCategoryComponent, {
        data: data,
        width: '50%',
        panelClass: 'mat-mdc-dialog-container'
      });
      dialogRef.afterClosed().subscribe((message:any) => {
        if (message == 'create' || message == 'update') {
          this.getAllCategoryList();
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
      this._adminService.onCategoryStatusChange(status,id).subscribe({     
        next: (res: any) => {
          this._toastrService.success(res.message);
        console.log(res);
        this.getAllCategoryList();
      },
      error: (error: any) => {
        console.log(error.error.message)
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          console.log(error.status);
          this.getAllCategoryList();
        }
      },})
  
  
    }
    
}
