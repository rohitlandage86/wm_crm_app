import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }
    //Doctor..........................
    //get all patient_visit_lists...............................................................
    getAllPatientVisitLists(page: any, perPage: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };
        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/patient_registration/patient-visit-list/', {
            params: params
        });
    }

    //add new consultation...
    addConsultation(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/consultation', data);
    }
    // //Edit Patient...
    // editPatient(data: any, id: any) {
    //     return this.http.put(this.baseUrl + 'api/patient_registration/' + id, data);
    // }
    // // Patient get by id ...
    // getPatientById(id: any) {
    //     return this.http.get(this.baseUrl + 'api/patient_registration/' + id)
    // }
    // // Patient status change...
    // onPatientStatusChange(status: any, id: any): Observable<any> {
    //     const body = { status: status };
    //     let params = new HttpParams().set('status', status);
    //     return this.http.patch(this.baseUrl + 'api/patient_registration/' + id, body, { params: params });
    // }
    // //get All Patient wma...
    // getAllPatientListWma(): Observable<any> {
    //     return this.http.get(this.baseUrl + 'api/patient_registration/wma');
    // }

}
