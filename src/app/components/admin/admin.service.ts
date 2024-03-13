import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }
    //masters..........................
    // get all Entities............................................................
    getAllEntitiesList(page: any, perPage: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/entity', { params: params });
    }
    //get All Entities list wma...
    getAllEntitiesListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/entity/wma');
    }
    //add new Entity...
    addEntity(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/entity', data);
    }
    //update entity...
    editEntity(data: any, id: number): Observable<any> {
        return this.http.put(this.baseUrl + 'api/entity/' + id, data);
    }
    //on entity status change...
    onEntityStatusChange(status: any, id: number): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/entity/' + id, body, {
            params: params
        });
    }
    //get all service type list...............................................................
    getAllServiceTypeList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/service_type', {
            params: params
        });
    }
    //add new service type...
    addServiceType(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/service_type', data);
    }
    //Edit service type...
    editServiceType(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/service_type/' + id, data);
    }
    // service type status change...
    onServiceTypeStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/service_type/' + id, body, { params: params });
    }
    //get All Services type wma...
    getAllServiceTypeListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/service_type/wma');
    }

    // get all services...............................................................................
    getAllServicesList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page']
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/services', { params: params });
    }
    // add new service...
    addService(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/services', data);
    }
    //edit service...
    editService(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/services/' + id, data);
    }
    // service status change...
    onServiceStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/services/' + id, body, {
            params: params
        });
    }

    //get all treatment list...............................................................
    getAllTreatmentList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/treatment', {
            params: params
        });
    }
    // add new treatment...
    addTreatment(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/treatment', data);
    }
    //edit treatment...
    editTreatment(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/treatment/' + id, data);
    }
    // treatment status change...
    onTreatmentStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/treatment/' + id, body, {
            params: params
        });
    }

    //get all diagnosis list...............................................................
    getAllDiagnosisList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/diagnosis', {
            params: params
        });
    }
    // add new diagnosis...
    addDiagnosis(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/diagnosis', data);
    }
    //edit diagnosis...
    editDiagnosis(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/diagnosis/' + id, data);
    }
    // diagnosis status change...
    onDiagnosisStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/diagnosis/' + id, body, {
            params: params
        });
    }

    //get all category list...............................................................
    getAllCategoryList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/category', {
            params: params
        });
    }
    // add new category...
    addCategory(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/category', data);
    }
    //edit category...
    editCategory(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/category/' + id, data);
    }
    // category status change...
    onCategoryStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/category/' + id, body, {
            params: params
        });
    }
      //get All Category wma...
      getAllCategoryListWma(): Observable<any> {
        let customes_id :any = localStorage.getItem("customer_id");
        const params = new HttpParams().set("customer_id", customes_id)
        return this.http.get(this.baseUrl + 'api/category/wma',{
            params:params
        });
    }

    // Clinical Masters.........................
    //get all medicines  list...............................................................
    getAllMedicinesList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/medicines', {
            params: params
        });
    }
    // add new medicines...
    addMedicines(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/medicines', data);
    }
    //edit medicines...
    editMedicines(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/medicines/' + id, data);
    }
    // medicines status change...
    onMedicinesStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/medicines/' + id, body, {
            params: params
        });
    }

    //get all dosages  list...............................................................

    getAllDosagesList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/dosages', {
            params: params
        });
    }
    // add new dosages...
    addDosages(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/dosages', data);
    }
    //edit dosages...
    editDosages(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/dosages/' + id, data);
    }
    // dosages status change...
    onDosagesStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/dosages/' + id, body, {
            params: params
        });
    }

    //get all instructions  list...............................................................
    getAllInstructionsList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/instructions', {
            params: params
        });
    }
    // add new instructions...
    addInstructions(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/instructions', data);
    }
    //edit instructions...
    editInstructions(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/instructions/' + id, data);
    }
    // instructions status change...
    onInstructionsStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/instructions/' + id, body, {
            params: params
        });
    }

    //get all chief_complaints  list...............................................................
    getAllChiefComplaintsList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/chief_complaints', {
            params: params
        });
    }
    // add new chief_complaints...
    addChiefComplaints(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/chief_complaints', data);
    }
    //edit chief_complaints...
    editChiefComplaints(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/chief_complaints/' + id, data);
    }
    // chief_complaints status change...
    onChiefComplaintsStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status)
        return this.http.patch(this.baseUrl + 'api/chief_complaints/' + id, body, {
            params: params
        });
    }

    //Miscellaneous.............................
    //get all title list...............................................................
    getAllTitleList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/title', {
            params: params
        });
    }
    //add new title...
    addTitle(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/title', data);
    }
    //Edit title...
    editTitle(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/title/' + id, data);
    }
    // title status change...
    onTitleStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/title/' + id, body, { params: params });
    }

    //get all source_of_patient list...............................................................
    getAllSourceOfPatientList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/source_of_patient', {
            params: params
        });
    }
    //add new source_of_patient...
    addSourceOfPatient(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/source_of_patient', data);
    }
    //Edit source_of_patient...
    editSourceOfPatient(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/source_of_patient/' + id, data);
    }
    // source_of_patient status change...
    onSourceOfPatientStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/source_of_patient/' + id, body, { params: params });
    }
    //get all refered_by list...............................................................
    getAllReferedByList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/refered_by', {
            params: params
        });
    }
    //add new refered_by...
    addReferedBy(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/refered_by', data);
    }
    //Edit refered_by...
    editReferedBy(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/refered_by/' + id, data);
    }
    // refered_by status change...
    onReferedByStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/refered_by/' + id, body, { params: params });
    }

    //employeee......................
    //get all designation list...............................................................
    getAllDesignationList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/designation', {
            params: params
        });
    }
    //add new designation...
    addDesignation(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/designation', data);
    }
    //Edit designation...
    editDesignation(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/designation/' + id, data);
    }
    // designation status change...
    onDesignationStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/designation/' + id, body, { params: params });
    }
      //get All designation wma...
      getAllDesignationListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/designation/wma');
    }

    //get all employee list...............................................................
    getAllEmployeeList(page: any, perPage: any): Observable<any> {
        let params = {
            page: page,
            perPage: perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/employee', {
            params: params
        });
    }
    //add new employee...
    addEmployee(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/employee', data);
    }
    //Edit employee...
    editEmployee(data: any, id: any) {
        return this.http.put(this.baseUrl + 'api/employee/' + id, data);
    }
    // employee status change...
    onEmployeeStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/employee/' + id, body, { params: params });
    }

}
