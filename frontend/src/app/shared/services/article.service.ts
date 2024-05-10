import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleResponseType} from "../../../types/article-response.type";
import {environment} from "../../../environments/environment";
import {BlogResponseType} from "../../../types/blog-response.type";
import {QueryParamsType} from "../../../types/queryParams.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getPopular(): Observable<ArticleResponseType[]> {
    return this.http.get<ArticleResponseType[]>(`${environment.apiUrl}articles/top`);
  }

  public getArticles(): Observable<BlogResponseType> {
    return this.http.get<BlogResponseType>(`${environment.apiUrl}articles`);
  }

  public getArticlesWithFilter(params: QueryParamsType): Observable<BlogResponseType> {
    return this.http.get<BlogResponseType>(`${environment.apiUrl}articles`, {params});
  }

  public getArticle(url: string): Observable<ArticleResponseType> {
    return this.http.get<ArticleResponseType>(`${environment.apiUrl}articles/${url}`);
  }

  public getRelatedArticles(url: string): Observable<ArticleResponseType[]> {
    return this.http.get<ArticleResponseType[]>(`${environment.apiUrl}articles/related/${url}`);
  }
}
