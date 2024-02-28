import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { LoginComponent } from 'src/app/views/pages/login/login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "",
    // redirectTo: "",
    component: LoginComponent,
    pathMatch: "full",
  },  
  // {
  //   path: "sign-up",
  //   component: SignUpComponent,
  //   pathMatch: "full",
  // },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
