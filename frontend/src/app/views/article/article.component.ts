import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../shared/services/article.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArticleResponseType} from "../../../types/article-response.type";
import {AuthService} from "../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: ArticleResponseType | null = null;
  public relatedArticles: ArticleResponseType[] = [];
  public isLogged = false;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
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
        console.log(this.article.text);
      });
      this.articleService.getRelatedArticles(params['url']).subscribe((data: ArticleResponseType[]) => {
        this.relatedArticles = data;
      });
    });
  }

}
