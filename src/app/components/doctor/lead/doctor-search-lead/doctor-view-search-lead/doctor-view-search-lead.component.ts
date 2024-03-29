import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';

@Component({
  selector: 'app-doctor-view-search-lead',
  templateUrl: './doctor-view-search-lead.component.html',
  styleUrl: './doctor-view-search-lead.component.scss'
})
export class DoctorViewSearchLeadComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  lead_hid: any
  allCategoryList: Array<any> = [];
  allLeadStatusList: Array<any> = [];
  leadStatusDetailAdded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService,
     private _superAdminService: SuperAdminService, private url: ActivatedRoute) { }


  ngOnInit() {
    this.createForm();
    this.getAllCategoryList();
    this.getAllLeadStatusList();
    this.disableFormFields();
    this.form.patchValue({
      lead_date: new Date().toISOString().split('T')[0],
    });
    this.lead_hid = this.url.snapshot.params['id']

    if (this.lead_hid) {
      this.getLeadById(this.lead_hid)
      // this.prepopulateData(this.lead_hid)
      this.leadStatusDetailAdded = true;
      this.isEdit = true;

    }
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + today.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
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
  addLeadFooter() {
    this.leadstatusDetailsArray.push(this.newLeadFooter());
    this.leadStatusDetailAdded = true;

  }
  deleteLeadFooter(i: any) {
    this.leadstatusDetailsArray.removeAt(i)
  }


  // patientform all filed disable
  disableFormFields() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.disable();
      }
    });
  }

  getLeadById(id: any) {
    this._receptionistService.getLeadById(id).subscribe((result: any) => {
      this.form.patchValue(result.data)
      const leadDate = new Date(result.data.lead_date);
      this.form.get('lead_date')?.patchValue(
        `${leadDate.getFullYear()}-${('0' + (leadDate.getMonth() + 1)).slice(-2)}-${('0' + leadDate.getDate()).slice(-2)}`
      );
      let leadFooterDetails = result.data.leadFooterDetails;
      if (leadFooterDetails.length > 0) {
        this.leadstatusDetailsArray.clear();
        for (let index = 0; index < leadFooterDetails.length; index++) {
          const element = leadFooterDetails[index];

          this.leadstatusDetailsArray.push(this.newLeadFooter())
          this.leadstatusDetailsArray.at(index).get('lead_fid')?.patchValue(element.lead_fid)
          this.leadstatusDetailsArray.at(index).get('comments')?.patchValue(element.comments);
          this.leadstatusDetailsArray.at(index).get('calling_time')?.patchValue(element.calling_time);
          this.leadstatusDetailsArray.at(index).get('no_of_calls')?.patchValue(element.no_of_calls);
          this.leadstatusDetailsArray.at(index).get('lead_status_id')?.patchValue(element.lead_status_id);
          const followUpDate = new Date(element.follow_up_date);
          this.leadstatusDetailsArray.at(index).get('follow_up_date')?.patchValue(
            `${followUpDate.getFullYear()}-${('0' + (followUpDate.getMonth() + 1)).slice(-2)}-${('0' + followUpDate.getDate()).slice(-2)}`
          );
          if (index !== leadFooterDetails.length) {
            this.leadstatusDetailsArray.at(index).get('comments')?.disable();
            this.leadstatusDetailsArray.at(index).get('calling_time')?.disable();
            this.leadstatusDetailsArray.at(index).get('no_of_calls')?.disable();
            this.leadstatusDetailsArray.at(index).get('lead_status_id')?.disable();
            this.leadstatusDetailsArray.at(index).get('follow_up_date')?.disable();
          }
        }
      }

    })
  }


  //get category list...
  getAllCategoryList() {
    this._adminService.getAllCategoryListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCategoryList = res.data;
        }
      }
    });

  }
  //get  Lead Status list...
  getAllLeadStatusList() {
    this._superAdminService.allLeadStatusList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadStatusList = res.data;
        }
      }
    });
  }
}
