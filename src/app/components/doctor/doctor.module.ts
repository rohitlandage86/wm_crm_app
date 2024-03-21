import { PatientComponent } from './../doctor/patient/patient.component';
import { NgModule } from '@angular/core';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LeadComponent } from './lead/lead.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUpdateConsultationComponent } from './consultation/add-update-consultation/add-update-consultation.component';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorSidebarComponent,
    PatientComponent,
    ConsultationComponent,
    AddUpdateConsultationComponent,
    LeadComponent

  ],
  imports: [
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
