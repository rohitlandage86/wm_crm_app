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
  //get all consultation List...............................................................
  getAllSearchConsultationList(page: any, perPage: any, key: any): Observable<any> {
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
    return this.http.get(this.baseUrl + 'api/consultation', {
        params: params
    });
}
   // consultation get history ...
 getConsultationHistory(id: any) {
    return this.http.get(this.baseUrl + 'api/consultation/patient-consultation-by-mrno/' + id)
}

    //get all current day appointment list...............................................................
    getAllAppointmentList(page: any, perPage: any, appointment_date: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
        };

        if (appointment_date) {
            params.appointment_date = appointment_date;
        }

        if (page == '' || perPage == '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/consultation/appointment', {
            params: params
        });
    }
}
