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


}
