import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { async } from '@angular/core/testing';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = environment.api
  constructor( 
    private http: HttpClient) { }
    
    POST =async (sub, obj) => await this.http.post<any>(this.api + sub , obj).toPromise();
    GET = async (sub) => await this.http.get<any>(this.api + sub).toPromise();
    PUT = async (sub,obj) => await this.http.put<any>(this.api + sub, obj).toPromise();
    DELETE = async(sub) => await this.http.delete<any>(this.api + sub).toPromise();
}
