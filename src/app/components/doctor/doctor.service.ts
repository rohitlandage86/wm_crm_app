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
    getAllPatientVisitLists(page: any, perPage: any, visit_date:any,key:any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,
            key:key
    

        };
        if (visit_date) {
            params.visit_date = visit_date;
        }
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
    getAllPatientVisitCheckedLists(page: any, perPage: any, current_day: any): Observable<any> {
        let params: any = {
            page: page,
            perPage: perPage,

        };
        if (current_day) {
            params.current_day = current_day;
        }
        // Remove page and perPage parameters if they are empty
        if (page === '' || perPage === '') {
            delete params.page;
            delete params.perPage;
        }

        return this.http.get(this.baseUrl + 'api/consultation', {
            params: params
        });
    }

    //add new consultation...
    addConsultation(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/consultation', data);
    }
    //Edit consultation...
    editConsultation(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/consultation/' + id, data);
    }
    // consultation get by id ...
    getConsultationById(id: any) {
        return this.http.get(this.baseUrl + 'api/consultation/' + id)
    }
      //delete consultation  Chief Complaints  ...
      deleteConsultationChiefComplaints(id: any, consultation_id: any): Observable<any> {
        let params: any = {
            consultation_id: consultation_id
        };
        return this.http.delete(this.baseUrl + 'api/consultation/chief_complaints/' + id, {
            params: params
        })
    }
    //delete consultation  diagnosis  ...
    deleteConsultationDiagnosis(id: any, consultation_id: any): Observable<any> {
        let params: any = {
            consultation_id: consultation_id
        };
        return this.http.delete(this.baseUrl + 'api/consultation/diagnosis/' + id, {
            params: params
        })
    }
    //delete consultation  treatment  ...
    deleteConsultationTreatment(id: any, consultation_id: any): Observable<any> {
        let params: any = {
            consultation_id: consultation_id
        };
        return this.http.delete(this.baseUrl + 'api/consultation/treatment/' + id, {
            params: params
        })
    }
    //delete consultation  medicine  ...
    deleteConsultationMedicine(id: any, consultation_id: any): Observable<any> {
        let params: any = {
            consultation_id: consultation_id
        };
        return this.http.delete(this.baseUrl + 'api/consultation/medicine/' + id, {
            params: params
        })
    }    //delete consultation  FileUpload  ...
    deleteConsultationFileUpload(id: any, consultation_id: any): Observable<any> {
        let params: any = {
            consultation_id: consultation_id
        };
        return this.http.delete(this.baseUrl + 'api/consultation/fileUpload/' + id, {
            params: params
        })
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
        //report to get call logs  list
        getCallLogsList(page: any, perPage: any, today_date: any): Observable<any> {
            let params = {
                page: page,
                perPage: perPage,
                today_date: today_date,
            }
            if (page == '' || perPage == '') {
                delete params['page'];
                delete params['perPage'];
            }
            if (today_date == '') {
                delete params['today_date'];
            }
          
            return this.http.get(this.baseUrl + 'api/lead_header/today-calls-lead-list', {
                params: params
            });
        }

        //get all payment history report list............................................................... 
        getAllPaymentHistoryList(page: any, perPage: any, fromDate: any, toDate: any, key:any): Observable<any> {
            let params = {
                page: page,
                perPage: perPage,
                fromDate: fromDate,
                toDate: toDate,
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
           
          
            return this.http.get(this.baseUrl + 'api/bill/payment-history', {
                params: params
            });
        }

}
