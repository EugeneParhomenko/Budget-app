import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Bill } from './bill.model';

@Injectable()
export class BudgetService {

    private serverUrl = 'http://localhost:3200/';

    constructor(public http: HttpClient) {
    }

    
    getList(){
        return this.http.get(this.serverUrl + 'bill');
    }

    add(bill: Bill):Observable<any> {
        return this.http.post(this.serverUrl + `bill`, bill)
    }

    update(bill: Bill):Observable<any> {
        return this.http.put(this.serverUrl + `bill/${bill.id}`, bill)
    }

    getItem(id:string){
        return this.http.get(this.serverUrl + `bill/${id}`);
    }

    delete(url: string = ''): Observable<any> {
        return this.http.delete(this.serverUrl + url);
    }

}