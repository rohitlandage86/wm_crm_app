import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../admin.service';
import { MedicinesComponent } from '../medicines.component';

@Component({
  selector: 'app-add-update-medicines',
  templateUrl: './add-update-medicines.component.html',
  styleUrl: './add-update-medicines.component.scss'
})
export class AddUpdateMedicinesComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  medicinesId: any;
  //for Dosages
  searchDosagesValue = '';
  filteredDosagesArray: Array<any> = [];
  allDosages: Array<any> = [];
  //for Instructions
  searchInstructionsValue = '';
  filteredInstructionsArray: Array<any> = [];
  allInstructions: Array<any> = [];
  constructor(
    private dialogRef: MatDialogRef<MedicinesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _adminService: AdminService,
    private _toastrService: ToastrService) { }
  ngOnInit() {
    this.createForm();
    this.getAllDosagesList();
    this.getAllInstructionsList();
    if (this.data) {
      this.medicinesId = this.data.medicines_id
      console.log('DATA', this.data);
      this.prepopulateData(this.data)
      this.isEdit = true
    }
  }
  createForm() {
    this.form = this.fb.group({
      medicines_name: [null, Validators.required],
      content: [null, Validators.maxLength(250)],
      dosage_id: [null],
      instructions_id: [null],
    });
  }
  get control() {
    return this.form.controls;
  }
  submit() { this.isEdit ? this.updateMedicines() : this.addMedicines(); }

  updateMedicines() {
    if (this.form.valid) {
      this._adminService.editMedicines(this.form.value, this.medicinesId).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.closeDialog('update');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }

  addMedicines() {
    if (this.form.valid) {
      this._adminService.addMedicines(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.closeDialog('create');
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  prepopulateData(data: any) {
    this.control['medicines_name'].patchValue(data.medicines_name);
    this.control['dosage_id'].patchValue(data.dosage_id);
    this.control['instructions_id'].patchValue(data.instructions_id);
    this.control['content'].patchValue(data.content);
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
  //get dosages list...
  getAllDosagesList() {
    this._adminService.getAllDosagesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDosages = res.data;
            this.filteredDosagesArray = this.allDosages;
        }
      },
    });
  }
  //Filter Dosages array
  filterDosages() {
    if (this.searchDosagesValue != '') {
      this.filteredDosagesArray = [];
      const filteredArr = this.allDosages.filter((obj: any) =>
        obj.dosage_name.toLowerCase().includes(this.searchDosagesValue.toLowerCase())
      );
      this.filteredDosagesArray = filteredArr;
    } else {
      this.filteredDosagesArray = this.allDosages;
    }
  }
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get Instructions list...
  getAllInstructionsList() {
    this._adminService.getAllInstructionsWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allInstructions = res.data;
          this.filteredInstructionsArray = this.allInstructions;
        }
      },
    });
  }
  //Filter Instructions array
  filterInstructions() {
    if (this.searchInstructionsValue != '') {
      this.filteredInstructionsArray = [];
      const filteredArr = this.allInstructions.filter((obj: any) =>
        obj.instruction.toLowerCase().includes(this.searchInstructionsValue.toLowerCase())
      );
      this.filteredInstructionsArray = filteredArr;
    } else {
      this.filteredInstructionsArray = this.allInstructions;
    }
  }
}
