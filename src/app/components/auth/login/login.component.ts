import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      email_id: [null],
      password: [null],
      role: [null]
    });
  }
  get control() {
    return this.form.controls;
  }

  onRoleSelect() {

  }
  submit() {
    let role = this.control['role'].value;
    console.log(role);
    if (role == 1) {
      this.submitSuperAdmin();
    } else if (role == 2) {
      this.submitAdmin();
    } else if (role == 3) {
      this.submitDoctor();
    } else if (role == 4) {
      this.submitReceptionist();
    }
  }
  //select role 
  submitAdmin() {
    console.log("Admin Login");
    // this.sharedService.sendUserData(true);
    this.router.navigate(['/admin', { outlets: { sub_Menu: 'admin' } }]);
  }
  submitDoctor() {
    console.log("Doctor Login");
    // this.sharedService.sendUserData(true);
    this.router.navigate(['/doctor', { outlets: { doc_Menu: 'admin' } }]);
  }
  submitSuperAdmin() {
    console.log("Super Admin Login");
    // this.sharedService.sendUserData(true);
    this.router.navigate(['/super-admin', { outlets: { super_Menu: 'super-admin' } }]);
  }
  submitReceptionist() {
    console.log("Receptionist Login");
    // this.sharedService.sendUserData(true);
    this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'receptionist' } }]);
  }

}


