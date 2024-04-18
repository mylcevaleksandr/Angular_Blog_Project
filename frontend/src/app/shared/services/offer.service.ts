import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RequestServiceResponseType} from "../../../types/request-service-response.type";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {
  }

  public getServices(): Observable<RequestServiceResponseType[]> {
    return this.http.get<RequestServiceResponseType[]>(`${environment.apiUrl}categories`);
  }

  public requestService(name: string, phone: string, service: string, type: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.apiUrl}requests`, {
      name: name,
      phone: phone,
      service: service,
      type: type
    });
  }
}
