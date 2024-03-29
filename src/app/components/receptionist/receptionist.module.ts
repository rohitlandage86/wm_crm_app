import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistDashboardComponent } from './receptionist-dashboard/receptionist-dashboard.component';
import { AddUpdateReceptionistDashboardComponent } from './receptionist-dashboard/add-update-receptionist-dashboard/add-update-receptionist-dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { AddUpdatePatientComponent } from './patient/add-update-patient/add-update-patient.component';
import { LeadsComponent } from './leads/leads.component';
import { AddUpdateLeadsComponent } from './leads/add-update-leads/add-update-leads.component';
import { SearchLeadsComponent } from './leads/search-leads/search-leads.component';
import { SearchPatientComponent } from './patient/search-patient/search-patient.component';
import { ViewSearchPatientComponent } from './patient/search-patient/view-search-patient/view-search-patient.component';
import { ViewSearchLeadsComponent } from './leads/search-leads/view-search-leads/view-search-leads.component';



@NgModule({
  declarations: [
    ReceptionistDashboardComponent,
    AddUpdateReceptionistDashboardComponent,
    PatientComponent,
    AddUpdatePatientComponent,
    LeadsComponent,
    AddUpdateLeadsComponent,
    SearchLeadsComponent,
    SearchPatientComponent,
    ViewSearchPatientComponent,
    ViewSearchLeadsComponent
  ],
  imports: [
    ReceptionistRoutingModule,
    SharedModule
  ]
})
export class ReceptionistModule { }
