import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
// The updated login function
login() {
  this.isSubmitted = true; // Set isSubmitted to true when the login process starts.
  let data = this.form.value;
  localStorage.clear();

  if (this.form.valid) {
    this._authSerivce.superadminLogin(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('accessToken', res.token);
        localStorage.setItem("customer_id", res.data.customer_id);
        localStorage.setItem('expiresin', res.expiresIn);
        localStorage.setItem('isLogin', 'true');
        this._sharedService.setIsLogin(true);

        if (res.status == 200 || res.status == 201) {
          localStorage.setItem("data", JSON.stringify(res.data));

          let greeting = this.getGreeting();
          let userName = res.data.name || 'User'; // Assuming res.data.user_name holds the user's name


          // Navigate based on user category
          if (res.category == 1) {
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'super-admin' } }]);
            this.showToast(greeting, userName);
          } else if (res.category == 2) {
            this.router.navigate(['/admin', { outlets: { sub_Menu: 'admin' } }]);
            this.showToast(greeting, userName);
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
            this.showToast(greeting, userName);
          } else {
            this.router.navigate(['']);
            this._toastrService.warning('Unauthorized');
          }
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
    });
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
// Function to display a toast notification with animation and smiley emoji
showToast(greeting: string, userName: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    // Adding animation options
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });

  // Creating the smiley emoji element
  const smiley = document.createElement('span');
  smiley.innerHTML = '😊';
  smiley.style.fontSize = '24px'; // Adjust font size if needed

  // Adding the animated class to the smiley emoji
  smiley.classList.add('animated-smiley');

  // Creating the title element
  const title = document.createElement('div');
  title.innerHTML = `${greeting}, ${userName}! `;
  title.appendChild(smiley);

  // Firing the toast notification
  Toast.fire({
    icon: 'success',
    title: title
  });
}



// Helper function to determine the greeting message based on the current time
getGreeting(): string {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}
}
