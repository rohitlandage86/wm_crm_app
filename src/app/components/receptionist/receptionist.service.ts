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
    getAllLeadsList(page: any, perPage: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
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
    getAllPatientList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/patient_registration', {
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
    getAllLeadFollowUpList(page: any, perPage: any, lead_date: any): Observable<any> {
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
        return this.http.get(this.baseUrl + 'api/patient_registration/search-patient-registration', {
            params: params
        });
    }



}
