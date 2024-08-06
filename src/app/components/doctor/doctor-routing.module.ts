import { EditConsultationComponent } from './consultation/edit-consultation/edit-consultation.component';
import { DoctorFollowUpListComponent } from './lead/doctor-follow-up-list/doctor-follow-up-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { LeadComponent } from './lead/lead.component';
import { PatientComponent } from './patient/patient.component';
import { AddUpdateConsultationComponent } from './consultation/add-update-consultation/add-update-consultation.component';
import { DoctorSearchPatientComponent } from './patient/doctor-search-patient/doctor-search-patient.component';
import { DoctorViewSearchPatientComponent } from './patient/doctor-search-patient/doctor-view-search-patient/doctor-view-search-patient.component';
import { DoctorSearchLeadComponent } from './lead/doctor-search-lead/doctor-search-lead.component';
import { DoctorViewSearchLeadComponent } from './lead/doctor-search-lead/doctor-view-search-lead/doctor-view-search-lead.component';
import { DoctorLeadReportComponent } from './reports/doctor-lead-report/doctor-lead-report.component';
import { DoctorFollowUpReportComponent } from './reports/doctor-follow-up-report/doctor-follow-up-report.component';
import { DoctorPatientReportComponent } from './reports/doctor-patient-report/doctor-patient-report.component';
import { DoctorPatientVisitReportComponent } from './reports/doctor-patient-visit-report/doctor-patient-visit-report.component';
import { DoctorDiagnosisReportComponent } from './reports/doctor-diagnosis-report/doctor-diagnosis-report.component';
import { DoctorTreatmentReportComponent } from './reports/doctor-treatment-report/doctor-treatment-report.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';
import { CallingListReportComponent } from './reports/calling-list-report/calling-list-report.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { DoctorSearchBillComponent } from './bill-list/doctor-search-bill/doctor-search-bill.component';
import { DoctorViewBillComponent } from './bill-list/doctor-search-bill/doctor-view-bill/doctor-view-bill.component';
import { DoctorBillReportComponent } from './reports/doctor-bill-report/doctor-bill-report.component';
import { DoctorPaymentHistoryReportComponent } from './reports/doctor-payment-history-report/doctor-payment-history-report.component';
import { VeiwPatientDetailsComponent } from './reports/doctor-patient-report/veiw-patient-details/veiw-patient-details.component';

import { AddUpdateBillDoctorComponent } from './bill-list/add-update-bill-doctor/add-update-bill-doctor.component';
import { PendingConsultationListComponent } from './consultation/pending-consultation-list/pending-consultation-list.component';



const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", 
    component: DoctorDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "admin",
    component: DoctorDashboardComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "patient",
    component: PatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  // {
  //   path: "consultation",
  //   component: ConsultationComponent,
  //   pathMatch: "full",
  //   outlet: "doc_Menu",
  //   canActivate:[AuthGuard]
  // },
  {
    path: "add-consultation/:id",
    component: AddUpdateConsultationComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]

  }, 
  {
    path: "edit-consultation/:id",
    component: EditConsultationComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "pending-consultation",
    component:PendingConsultationListComponent ,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "lead",
    component: LeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-search-lead",
    component: DoctorSearchLeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-view-search-lead/:id",
    component: DoctorViewSearchLeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-search-patient",
    component: DoctorSearchPatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "view-patient/:id",  
    component: VeiwPatientDetailsComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-view-search-patient/:id",
    component: DoctorViewSearchPatientComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "lead-reports",  
    component:  DoctorLeadReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "lead-follow-up-reports",  
    component:  DoctorFollowUpReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "follow-up",  
    component: DoctorFollowUpListComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "patient-reports",  
    component: DoctorPatientReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "patient-visit-reports",  
    component: DoctorPatientVisitReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "diagnosis-reports",  
    component: DoctorDiagnosisReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "treatment-reports",  
    component: DoctorTreatmentReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "todays-call",  
    component: CallingListReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "bills",  
    component: BillListComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-add-bill",
    component: AddUpdateBillDoctorComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]

  }, 
  {
    path: "doctor-search-bill",
    component: DoctorSearchBillComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-view-bill/:id",
    component: DoctorViewBillComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-bill-reports",  
    component: DoctorBillReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "doctor-payment-history-reports",  
    component: DoctorPaymentHistoryReportComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
