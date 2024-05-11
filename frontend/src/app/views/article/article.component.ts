import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleResponseType} from "../../../types/article-response.type";
import {AuthService} from "../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentType} from "../../../types/comment.type";
import {CommentService} from "../../shared/services/comment.service";
import {QueryParamsType} from "../../../types/queryParams.type";
import {CommentActionResponseType} from "../../../types/comment-action-response.type";
import {PostCommentType} from "../../../types/post-comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {MoreCommentsType} from "../../../types/more-comments.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: ArticleResponseType | null = null;
  public relatedArticles: ArticleResponseType[] = [];
  public isLogged: boolean = false;
  public comments: CommentType[] = [];
  public commentCount: number = 0;
  private offset: number = 0;
  public more: boolean = false;
  public commentData: PostCommentType = {
    text: '',
    article: ''
  };
  private queryParams: QueryParamsType = {};

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private commentService: CommentService,
    private categoriesService: CategoriesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      const articleUrl = params['url'];
      if (articleUrl && articleUrl.length > 0) {
        this.queryParams.url = articleUrl;
        this.getArticle(articleUrl);
      }
    });
  }

  private getArticle(url: string): void {
    this.articleService.getArticle(url).subscribe((data: ArticleResponseType): void => {
      this.article = data;
      this.comments = data.comments;
      this.commentData.article = data.id;
      if (data.commentsCount) {
        this.commentCount = data.commentsCount;
        this.more = this.comments.length < this.commentCount;
      }
      this.handleComment();
    });
    this.articleService.getRelatedArticles(url).subscribe((data: ArticleResponseType[]): void => {
      this.relatedArticles = data;
    });
  }

  public postComment(): void {
    this.commentService.postComment(this.commentData).subscribe({
      next: (data: DefaultResponseType): void => {
        if (!data.error) {
          this.commentData.text = '';
          if (this.queryParams.url) {
            this.getArticle(this.queryParams.url);
          }
        }
      },
      error: (err: HttpErrorResponse): void => {
        if (err.status === 400) {
          this._snackBar.open(err.error.message);
        }
      }
    });
  }

  public handleComment(event?: string): void {
    if (this.isLogged) {
      let userComments: CommentActionResponseType[] = [];
      this.commentService.getArticleCommentActions({articleId: this.article?.id}).subscribe((data: CommentActionResponseType[]): void => {
        userComments = data;
        this.comments = this.comments.map((comment: CommentType) => {
          userComments.forEach((item: CommentActionResponseType): CommentType => {
            if (item.comment === comment.id) {
              comment.action = item.action;
              return comment;
            }
            return comment;
          });
          return comment;
        });
      });
    } else {
      console.log(event);
    }
  }

  public getMoreComments(): void {
    const params: QueryParamsType = {
      offset: this.offset,
      article: this.article?.id
    };
    this.commentService.getComments(params).subscribe((data: MoreCommentsType): void => {
      if (this.commentCount >= 4 && this.comments.length < 10) {
        this.comments = data.comments;
        this.more = this.comments.length < this.commentCount;
        this.offset += 10;
      } else {
        data.comments.forEach((comment: CommentType): void => {
          this.comments.push(comment);
        });
        this.more = this.comments.length < this.commentCount;
        this.offset += 10;
      }
      this.handleComment();
    });
  }
}
