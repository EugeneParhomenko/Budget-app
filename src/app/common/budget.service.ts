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

    add(note: Bill):Observable<any> {
        return this.http.post(this.serverUrl + `bill`, note)
    }

    update(note: Bill):Observable<any> {
        return this.http.put(this.serverUrl + `bill/${note.id}`, note)
    }

    getItem(noteID:string){
        return this.http.get(this.serverUrl + `bill/${noteID}`);
    }

    delete(url: string = ''): Observable<any> {
        return this.http.delete(this.serverUrl + url);
    }

}