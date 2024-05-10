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

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: ArticleResponseType | null = null;
  public relatedArticles: ArticleResponseType[] = [];
  public isLogged = false;
  public comments: CommentType[] = [];

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
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.articleService.getArticle(params['url']).subscribe((data: ArticleResponseType) => {
        this.article = data;
        this.comments = data.comments;
        this.handleChange();
      });
      this.articleService.getRelatedArticles(params['url']).subscribe((data: ArticleResponseType[]) => {
        this.relatedArticles = data;
      });
    });
  }

  public handleChange(event?:string) {
    let userComments: CommentActionResponseType[] = [];
    this.commentService.getArticleCommentActions({articleId: this.article?.id}).subscribe((data: CommentActionResponseType[]) => {
      userComments = data;
      this.comments = this.comments.map((comment: CommentType) => {
        userComments.forEach((item: CommentActionResponseType) => {
          if (item.comment === comment.id) {

            comment.action = item.action;
            return comment;
          }
          return comment;
        });
        return comment;
      });
    });
  }

  public getMoreComments(): void {
    const params: QueryParamsType = {
      offset: 0,
      article: this.article?.id
    };
  }
}
