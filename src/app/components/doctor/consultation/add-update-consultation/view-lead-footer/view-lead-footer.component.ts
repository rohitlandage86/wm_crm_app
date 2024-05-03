import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EntityComponent } from 'src/app/components/admin/masters/entity/entity.component';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-view-lead-footer',
  templateUrl: './view-lead-footer.component.html',
  styleUrl: './view-lead-footer.component.scss'
})
export class ViewLeadFooterComponent implements OnInit {
  form!: FormGroup;
  allLeadList: Array<any> = [];
  searchQuery: string = '';
  leadHid: any;
  page = 1;
  perPage = 10;
  total = 0;
  isEdit = false;
  mobile_no: any
  allCategoryList: Array<any> = [];
  allLeadFooterList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService,
    private dialogRef: MatDialogRef<EntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit() {
    this.createForm();
    if (this.data) {
      const leadHid = this.data;
      this.getLeadById(this.data)
      this.isEdit = true
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: [''],
      lead_date: [''],
      city: [''],
      mobile_number: [''],
      note: [null],
      category_id: [null],
      leadFooterDetails: this.fb.array([this.newLeadFooter()])
    });
  }
  get control() {
    return this.form.controls;
  }
  get leadstatusDetailsArray() {
    return this.form.get('leadFooterDetails') as FormArray<any>;
  }
  newLeadFooter(): FormGroup {
    return this.fb.group({
      lead_fid: [null],
      comments: [null],
      calling_time: [null],
      no_of_calls: [null],
      lead_status_id: [null],
      follow_up_date: [null],

    })
  }
  getLeadById(id: any) {
    this._receptionistService.getLeadById(id).subscribe((result: any) => {
      let leadFooterDetails = result.data.leadFooterDetails;
      this.allLeadFooterList = leadFooterDetails;
      if (Array.isArray(result.data)) {
        this.allLeadList = result.data;
      } else {
        this.allLeadList = [result.data];
      }
    });
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getLeadById(this.leadHid);
  }
}
