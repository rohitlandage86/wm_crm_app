import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  password: string = '';
  passwordVisible: boolean = false;
  constructor(
    private router: Router,
    private _sharedService: SharedService,
    private fb: FormBuilder, private _toastrService: ToastrService, private _authSerivce: AuthService) { }

  ngOnInit() {
    this.createForm();
    localStorage.clear();
    console.log("Login Page");
    
  }
  createForm() {
    this.form = this.fb.group({
      email_id: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  login() {
    this.isSubmitted = true;// Set isSubmitted to true when the login process starts.
    let data = this.form.value;
    localStorage.clear();
    // localStorage.setItem('isLogin', 'true');
    // this._sharedService.setIsLogin(true);
    // this.router.navigate(['/admin', { outlets: { sub_Menu: 'admin' } }])


    if (this.form.valid) {
      this._authSerivce.superadminLogin(data).subscribe({
        next: (res: any) => {
          this._toastrService.clear();
          localStorage.setItem('accessToken', res.token);
          localStorage.setItem("customer_id", (res.data.customer_id));
          localStorage.setItem('expiresin', res.expiresIn);
          localStorage.setItem('isLogin', 'true');
          this._sharedService.setIsLogin(true);
          if (res.status == 200 || res.status == 201) {
            // if(!(res.category == 1 || res.category == 2 || res.data.category == 3)){
              if (res.category == 1) {
              this.router.navigate(['/super-admin', { outlets: { super_Menu: 'super-admin' } }]);
              this._toastrService.success(res.message);
            } else if (res.category == 2) {
              this.router.navigate(['/admin', { outlets: { sub_Menu: 'admin' } }]);
              this._toastrService.success(res.message);

            } else if (res.category == 3) {
              // Check for specific roles within category 3
              if (res.data.designation_name.toLowerCase() === 'doctor') {
                this.router.navigate(['/doctor', { outlets: { doc_Menu: 'admin' } }]);
              } else if (res.data.designation_name.toLowerCase() === 'receptionist') {
                this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'receptionist' } }]);
              } else {
                // Handle other cases within category 3 (if needed)
                this.router.navigate(['']); 
                this._toastrService.warning('Unauthorized');
              }
            } else {
              this.router.navigate([''])
              this._toastrService.warning('Unautherization');
            }
            // }   
            // else {
            //   this.router.navigate([''])
            //   this._toastrService.warning('Unautherization');
            //   }
            localStorage.setItem("data", JSON.stringify(res.data));
            
            
            
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (error: any) => {

          if (error.error.status == 422) {
            this._toastrService.warning(error.error.message);
          } else {
            this._toastrService.error(error.error.message);

          }
        },
      })

    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning('Please fill required fields');
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onCategorySelect() {

  }
  submit() {
    let category = this.control['category'].value;
    if (category == 1) {
      this.submitSuperAdmin();
    } else if (category == 2) {
      this.submitAdmin();
    } else if (category == 3) {
      this.submitDoctor();
    } else if (category == 4) {
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
    this.router.navigate(['/doctor', { outlets: { doc_Menu: 'doctor' } }]);
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


