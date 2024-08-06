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
import { ReceptionistPatientReportComponent } from './reports/receptionist-patient-report/receptionist-patient-report.component';
import { ReceptionistLeadReportComponent } from './reports/receptionist-lead-report/receptionist-lead-report.component';
import { ReceptionistPatientVisitReportComponent } from './reports/receptionist-patient-visit-report/receptionist-patient-visit-report.component'
import { ReceptionistFollowUpReportComponent } from './reports/receptionist-follow-up-report/receptionist-follow-up-report.component';
import { FollowUpComponent } from './leads/follow-up/follow-up.component';
import { BillComponent } from './bill/bill.component';
import { AddUpdateBillComponent } from './bill/add-update-bill/add-update-bill.component';
import { SearchBillComponent } from './bill/search-bill/search-bill.component';
import { ViewSearchBillComponent } from './bill/search-bill/view-search-bill/view-search-bill.component';
import { ReceptionistBillReportComponent } from './reports/receptionist-bill-report/receptionist-bill-report.component';
import { SearchPatientRevisitComponent } from './patient/search-patient-revisit/search-patient-revisit.component';
import { PendingFollowupComponent } from './leads/follow-up/pending-followup/pending-followup.component';
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
    ViewSearchLeadsComponent,
    ReceptionistPatientReportComponent,
    ReceptionistLeadReportComponent,
    ReceptionistPatientVisitReportComponent,
    ReceptionistFollowUpReportComponent,
    ReceptionistBillReportComponent,
    FollowUpComponent,
    BillComponent,
    AddUpdateBillComponent,
    SearchBillComponent,
    ViewSearchBillComponent,
    SearchPatientRevisitComponent,
    PendingFollowupComponent
    
  ],
  imports: [
    ReceptionistRoutingModule,
    SharedModule,
  ]
})
export class ReceptionistModule { }
