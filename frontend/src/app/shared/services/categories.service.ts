import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoriesResponseType} from "../../../types/categories-response.type";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<CategoriesResponseType[]> {
    return this.http.get<CategoriesResponseType[]>(`${environment.apiUrl}categories`);
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
