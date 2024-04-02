import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LeadComponent } from './lead/lead.component';
import { AddUpdateConsultationComponent } from './consultation/add-update-consultation/add-update-consultation.component';
import { PatientComponent } from './../doctor/patient/patient.component';
import { DoctorSearchPatientComponent } from './patient/doctor-search-patient/doctor-search-patient.component';
import { DoctorViewSearchPatientComponent } from './patient/doctor-search-patient/doctor-view-search-patient/doctor-view-search-patient.component';
import { DoctorSearchLeadComponent } from './lead/doctor-search-lead/doctor-search-lead.component';
import { DoctorViewSearchLeadComponent } from './lead/doctor-search-lead/doctor-view-search-lead/doctor-view-search-lead.component';
import { DoctorFollowUpReportComponent } from './reports/doctor-follow-up-report/doctor-follow-up-report.component';
import { DoctorPatientReportComponent } from './reports/doctor-patient-report/doctor-patient-report.component';
import { DoctorLeadReportComponent } from './reports/doctor-lead-report/doctor-lead-report.component';
import { DoctorPatientVisitReportComponent } from './reports/doctor-patient-visit-report/doctor-patient-visit-report.component';
import { DoctorAppointmentReportComponent } from './reports/doctor-appointment-report/doctor-appointment-report.component';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorSidebarComponent,
    PatientComponent,
    ConsultationComponent,
    AddUpdateConsultationComponent,
    LeadComponent,
    DoctorSearchPatientComponent,
    DoctorViewSearchPatientComponent,
    DoctorSearchLeadComponent,
    DoctorViewSearchLeadComponent,
    DoctorLeadReportComponent,
    DoctorFollowUpReportComponent,
    DoctorPatientReportComponent,
    DoctorPatientVisitReportComponent,
    DoctorAppointmentReportComponent

  ],
  imports: [
    DoctorRoutingModule,
    SharedModule,

  ]
})
export class DoctorModule { }
