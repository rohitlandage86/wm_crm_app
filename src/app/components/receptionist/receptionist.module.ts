import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistDashboardComponent } from './receptionist-dashboard/receptionist-dashboard.component';
import { AddUpdateReceptionistDashboardComponent } from './receptionist-dashboard/add-update-receptionist-dashboard/add-update-receptionist-dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { AddUpdatePatientComponent } from './patient/add-update-patient/add-update-patient.component';
import { LeadsComponent } from './leads/leads.component';
import { AddUpdateLeadsComponent } from './leads/add-update-leads/add-update-leads.component';



@NgModule({
  declarations: [
    ReceptionistDashboardComponent,
    AddUpdateReceptionistDashboardComponent,
    PatientComponent,
    AddUpdatePatientComponent,
    LeadsComponent,
    AddUpdateLeadsComponent
  ],
  imports: [
    CommonModule,
    ReceptionistRoutingModule,
    SharedModule
  ]
})
export class ReceptionistModule { }
