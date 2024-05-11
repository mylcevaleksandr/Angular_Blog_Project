import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {CommentActionResponseType} from "../../../types/comment-action-response.type";
import {QueryParamsType} from "../../../types/queryParams.type";
import {MoreCommentsType} from "../../../types/more-comments.type";
import {PostCommentType} from "../../../types/post-comment.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  public applyAction(commentId: string, actionType: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.apiUrl}comments/${commentId}/apply-action`, {
      action: actionType
    });
  }

  public postComment(body: PostCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(`${environment.apiUrl}comments`, body);
  }

  public getArticleCommentActions(params: QueryParamsType): Observable<CommentActionResponseType[]> {
    return this.http.get<CommentActionResponseType[]>(`${environment.apiUrl}comments/article-comment-actions`, {params});
  }

  public getActionsForComment(commentId: string): Observable<CommentActionResponseType[]> {
    return this.http.get<CommentActionResponseType[]>(`${environment.apiUrl}comments/${commentId}/actions`);
  }

  public getComments(params: QueryParamsType): Observable<MoreCommentsType> {
    return this.http.get<MoreCommentsType>(`${environment.apiUrl}comments`, {params});
  }
}
