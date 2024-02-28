import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'auth' ,
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("../app/components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "super-admin",
    loadChildren: () =>
      import("../app/components/super-admin/super-admin.module").then((m) => m.SuperAdminModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../app/components/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "doctor",
    loadChildren: () =>
      import("../app/components/doctor/doctor.module").then((m) => m.DoctorModule),
  },
  {
    path:"receptionist",
    loadChildren: ()=>
      import("../app/components/receptionist/receptionist.module").then((m) => m.ReceptionistModule )
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
