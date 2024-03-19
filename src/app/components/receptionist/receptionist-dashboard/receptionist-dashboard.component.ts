          import { Component, OnInit } from '@angular/core';
          import { freeSet } from '@coreui/icons';
          import { PageEvent } from '@angular/material/paginator';
          import { ToastrService } from 'ngx-toastr';
          import { ReceptionistService } from './../receptionist.service';
          import { AdminService } from '../../admin/admin.service';

          @Component({
            selector: 'app-receptionist-dashboard',
            templateUrl: './receptionist-dashboard.component.html',
            styleUrl: './receptionist-dashboard.component.scss'
          })
          export class ReceptionistDashboardComponent implements OnInit{
            allLeadFollowUpList: Array<any> = [];
            icons = freeSet;
            page = 1;
            perPage = 10;
            total = 0;
          
            lead_date: string;
          color: string|undefined;
            constructor( private _adminService: AdminService, private _receptionistService: ReceptionistService,private _toastrService: ToastrService) { this.lead_date = '';}

            ngOnInit() {
              this.setTodayDate();
              this.getAllLeadFollowUpList();
            }
          setTodayDate() {
              const today = new Date();
              // Format the date as per your backend requirement
              this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
            }
            //get all LeadFollowUp List...
            getAllLeadFollowUpList() {
              this._receptionistService.getAllLeadFollowUpList(this.page, this.perPage,this.lead_date).subscribe({
                next: (res: any) => {
                  if (res.data.length > 0) {
                    this.allLeadFollowUpList = res.data;
                    console.log(res.data);
                    
                    this.total = res.pagination.total;
                  }
                }
              });
            }
            onPageChange(event: PageEvent): void {
              this.page = event.pageIndex + 1;
              this.perPage = event.pageSize;
              this.getAllLeadFollowUpList();
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
            //slide-toggle change Patient
            changeEvent(event: any, id: any) {
              console.log(event.checked, id);
              let status = 0;
              if (event.checked) {
                status = 1;
              }
              this._receptionistService.onPatientStatusChange(status, id).subscribe({
                next: (res: any) => {
                  this._toastrService.success(res.message);
                  console.log(res);
                  this.getAllLeadFollowUpList();
                },
                error: (error: any) => {
                  console.log(error.error.message)
                  if (error.status == 422) {
                    this._toastrService.warning(error.message);
                    console.log(error.status);
                    this.getAllLeadFollowUpList();
                  }
                },
              })


            }
          }
