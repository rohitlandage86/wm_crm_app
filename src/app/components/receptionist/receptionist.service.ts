import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReceptionistService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }
    //Receptionist..........................
    // get all leads............................................................
    getAllLeadsList(page: any, perPage: any, fromDate: any, toDate: any, category_id: any, key: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage,
            'fromDate': fromDate,
            'toDate': toDate,
            'category_id': category_id,
            'key': key  
        };
    
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (category_id == '' || category_id == 'null') {
            delete params['category_id'];
        }
    
        return this.http.get(this.baseUrl + 'api/lead_header/', { params: params });
    }
    
    //get all search-lead-header list...............................................................
    getAllSearchLeadHeaderList(page: any, perPage: any, key: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
            key: key  // Include the key parameter in the params object
        };

        // Check if page or perPage is empty and remove them from params if so
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }

        // Make the HTTP GET request
        return this.http.get(this.baseUrl + 'api/lead_header/search-lead-header', {
            params: params
        });
    }
    //get All leads list wma...
    getAllLeadsListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/lead_header/wma');
    }
    //add new leads...
    addLead(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/lead_header', data);
    }
    //update lead...
    editLead(data: any, id: number): Observable<any> {
        return this.http.put(this.baseUrl + 'api/lead_header/' + id, data);
    }
    // lead get by id ...
    getLeadById(id: any) {
        return this.http.get(this.baseUrl + 'api/lead_header/' + id)
    }
    //on lead status change...
    onLeadStatusChange(status: any, id: number): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/lead_header/' + id, body, {
            params: params
        });
    }
    //get all Patient list............................................................... 
    getAllPatientList(page: any, perPage: any, fromDate: any, toDate: any, gender: any, entity_id: any, source_of_patient_id: any, refered_by_id: any, employee_id: any,key:any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage,
            fromDate: fromDate,
            toDate: toDate,
            gender: gender,
            entity_id: entity_id,
            source_of_patient_id: source_of_patient_id,
            employee_id: employee_id,
            refered_by_id: refered_by_id,
            key:key
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (entity_id == '' || entity_id == 'null') {
            delete params['entity_id'];
        }
        if (gender == '' || gender == 'null') {
            delete params['gender'];
        }
        if (source_of_patient_id == '' || source_of_patient_id == 'null') {
            delete params['source_of_patient_id'];
        }
        if (employee_id == '' || employee_id == 'null') {
            delete params['employee_id'];
        }
        if (refered_by_id == '' || refered_by_id == 'null') {
            delete params['refered_by_id'];
        }
        return this.http.get(this.baseUrl + 'api/patient_registration', {
            params: params
        });
    }
    //get all patient visit list
    getAllPatientVisitList(page: any, perPage: any, fromDate: any, toDate: any, visit_type: any,key:any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage,
            'fromDate': fromDate,
            'toDate': toDate,
            'visit_type': visit_type,
            'key':key
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (visit_type == '' || visit_type == 'null') {
            delete params['visit_type'];
        }
        return this.http.get(this.baseUrl + 'api/patient_registration/get-all-patient-visit-list', { params: params });
    }
    //get patient view list by mrno
    getAllVisitPatientListByMrno(page: any, perPage: any,mrno:any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage,
            mrno:mrno
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/patient_registration/get-all-patient-visit-list/by-mrno', {
            params: params
        });
    }
  
    //add new Patient...
    addPatient(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/patient_registration', data);
    }
    //Edit Patient...
    editPatient(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/patient_registration/' + id, data);
    }
    // Patient get by id ...
    getPatientById(id: any) {
        return this.http.get(this.baseUrl + 'api/patient_registration/' + id)
    }
    // Patient status change...
    onPatientStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/patient_registration/' + id, body, { params: params });
    }
    //get All Patient wma...
    getAllPatientListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/patient_registration/wma');
    }
    //get all lead-follow-up list...............................................................
    getAllLeadFollowUpList(page: any, perPage: any, follow_up_date: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };

        if (follow_up_date) {
            params.follow_up_date = follow_up_date;
        }

        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/lead_header/lead-follow-up', {
            params: params
        });
    }
    //get all pending lead-follow-up list...............................................................
    getAllPendingLeadFollowUpList(page: any, perPage: any, current_date: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };

        if (current_date) {
            params.current_date = current_date;
        }

        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/lead_header/pending-lead-follow-up', {
            params: params
        });
    }
    //get all lead-Date list...............................................................
    getAllLeadDateList(page: any, perPage: any, lead_date: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };

        if (lead_date) {
            params.lead_date = lead_date;
        }

        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/lead_header/lead-follow-up', {
            params: params
        });
    }

    //Edit lead-follow-up...
    editLeadFollowUp(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/lead_header/lead-follow-up/' + id, data);
    }

    //get All receptionist-dashboard ..
    getAllReceptionistDashboard(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/receptionist-dashboard');
    }
    //get all Patient Registration List...............................................................
    getAllSearchPatientRegistrationList(page: any, perPage: any, key: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
            key: key  // Include the key parameter in the params object
        };

        // Check if page or perPage is empty and remove them from params if so
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }

        // Make the HTTP GET request
        return this.http.get(this.baseUrl + 'api/patient_registration/search-patient-for-revisit/', {
            params: params
        });
    }
    // patient revist ...
    editPatientRevist(id: any, data: any) {
        return this.http.put(this.baseUrl + 'api/patient_registration/patient-revisit/' + id, data);
    }
   // patient renew ...
   PatientRenew(id: any, data: any) {
    return this.http.put(this.baseUrl + 'api/patient_registration/patient-renewly/' + id, data);
}
    //report lead follow up list
    getAllLeadFollowUpReportList(page: any, perPage: any, fromDate: any, toDate: any, lead_status_id: any,key:any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage,
            lead_status_id: lead_status_id,
            fromDate: fromDate,
            toDate: toDate,
            key:key
        }
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (lead_status_id == '' || lead_status_id == 'null') {
            delete params['lead_status_id'];
        }
        return this.http.get(this.baseUrl + 'api/lead_header/lead-follow-up-report', {
            params: params
        });
    }
    //report consultation appointment  list
    getAllConsultationAppointmentReportList(page: any, perPage: any, fromDate: any, toDate: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage,
            fromDate: fromDate,
            toDate: toDate
        }
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }

        return this.http.get(this.baseUrl + 'api/consultation/appointment', {
            params: params
        });
    } //  get  receptionist-dashboard count ...
    getReceptionistDashboardCount() {
        return this.http.get(this.baseUrl + 'api/receptionist-dashboard')
    }
    //get all diagnosis report list ..............................................................................
    getAllDiagnosisReportList(page: any, perPage: any, fromDate: any, toDate: any, diagnosis_id: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage,
            'fromDate': fromDate,
            'toDate': toDate,
            'diagnosis_id': diagnosis_id
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (diagnosis_id == '' || diagnosis_id == 'null') {
            delete params['diagnosis_id'];
        }
        return this.http.get(this.baseUrl + 'api/consultation/consultation_diagnosis', { params: params });
    }

    //get all Treatment report list ..............................................................................
    getAllTreatmentReportList(page: any, perPage: any, fromDate: any, toDate: any, treatment_id: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage,
            'fromDate': fromDate,
            'toDate': toDate,
            'treatment_id': treatment_id
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (treatment_id == '' || treatment_id == 'null') {
            delete params['treatment_id'];
        }
        return this.http.get(this.baseUrl + 'api/consultation/consultation_treatment', { params: params });
    }

      //add new Bill...
      addBill(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/bill', data);
    }
        // Bill get by id ...
        getBillById(id: any) {
            return this.http.get(this.baseUrl + 'api/bill/' + id)
        }
      //get all Bill-Date list...............................................................
      getBillDateList(page: any, perPage: any, Bill_date: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };

        if (Bill_date) {
            params.Bill_date = Bill_date;
        }

        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/bill', {
            params: params
        });
    }
       //get bill search List...............................................................
       getAllSearchBillList(page: any, perPage: any, key: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
            key: key  // Include the key parameter in the params object
        };

        // Check if page or perPage is empty and remove them from params if so
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }

        // Make the HTTP GET request
        return this.http.get(this.baseUrl + 'api/bill', {
            params: params
        });
    }
     //get all bill report list............................................................... 
     getAllBillList(page: any, perPage: any, fromDate: any, toDate: any,entity_id:any,  service_id: any, service_type_id: any,key:any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage,
            fromDate: fromDate,
            toDate: toDate,
            entity_id:entity_id,
            service_id: service_id,
            service_type_id: service_type_id,
            key:key

         
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        if (fromDate == '' || toDate == '') {
            delete params['fromDate'];
            delete params['toDate'];
        }
        if (entity_id == '' || entity_id == 'null') {
            delete params['entity_id'];
        }
        if (service_id == '' || service_id == 'null') {
            delete params['service_id'];
        }
      
        if (service_type_id == '' || service_type_id == 'null') {
            delete params['service_type_id'];
        }
      
        return this.http.get(this.baseUrl + 'api/bill', {
            params: params
        });
    }
}
