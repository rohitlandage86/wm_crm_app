import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { LeadComponent } from './lead/lead.component';
import { PatientComponent } from './patient/patient.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { AddUpdateConsultationComponent } from './consultation/add-update-consultation/add-update-consultation.component';


const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", component: DoctorDashboardComponent },
  {
    path: "admin",
    component: DoctorDashboardComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "patient",
    component: PatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "consultation",
    component: ConsultationComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "add-consultation/:id",
    component: AddUpdateConsultationComponent,
    pathMatch: "full",
    outlet: "doc_Menu",

  }, 
  {
    path: "edit-consultation/:id",
    component: AddUpdateConsultationComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "lead",
    component: LeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
