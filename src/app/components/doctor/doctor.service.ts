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
    
        // Remove page and perPage parameters if they are empty
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }
    
        return this.http.get(this.baseUrl + 'api/patient_registration/patient-visit-list/', {
            params: params
        });
    }
     //get all patient_visit_Checked-lists...............................................................
     getAllPatientVisitCheckedLists(page: any, perPage: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
           
        };
    
        // Remove page and perPage parameters if they are empty
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }
    
        return this.http.get(this.baseUrl + 'api/patient_registration/patient-visit-checked-list/', {
            params: params
        });
    }

    //add new consultation...
    addConsultation(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/consultation', data);
    }
 // consultation get by id ...
 getConsultationById(id: any) {
    return this.http.get(this.baseUrl + 'api/consultation/' + id)
}
  

}
