import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { LeadComponent } from './lead/lead.component';
import { PatientComponent } from './patient/patient.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { AddUpdateConsultationComponent } from './consultation/add-update-consultation/add-update-consultation.component';
import { DoctorSearchPatientComponent } from './patient/doctor-search-patient/doctor-search-patient.component';
import { DoctorViewSearchPatientComponent } from './patient/doctor-search-patient/doctor-view-search-patient/doctor-view-search-patient.component';
import { DoctorSearchLeadComponent } from './lead/doctor-search-lead/doctor-search-lead.component';
import { DoctorViewSearchLeadComponent } from './lead/doctor-search-lead/doctor-view-search-lead/doctor-view-search-lead.component';
import { DoctorLeadReportComponent } from './reports/doctor-lead-report/doctor-lead-report.component';
import { DoctorFollowUpReportComponent } from './reports/doctor-follow-up-report/doctor-follow-up-report.component';
import { DoctorPatientReportComponent } from './reports/doctor-patient-report/doctor-patient-report.component';
import { DoctorPatientVisitReportComponent } from './reports/doctor-patient-visit-report/doctor-patient-visit-report.component';
import { DoctorAppointmentReportComponent } from './reports/doctor-appointment-report/doctor-appointment-report.component';


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
  {
    path: "doctor-search-lead",
    component: DoctorSearchLeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "doctor-view-search-lead/:id",
    component: DoctorViewSearchLeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "doctor-search-patient",
    component: DoctorSearchPatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "doctor-view-search-patient/:id",
    component: DoctorViewSearchPatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "lead-reports",  
    component:  DoctorLeadReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "lead-follow-up-reports",  
    component:  DoctorFollowUpReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "patient-reports",  
    component: DoctorPatientReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "patient-visit-reports",  
    component: DoctorPatientVisitReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "appointments",  
    component: DoctorAppointmentReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
