import {Component, OnInit} from '@angular/core';
import {ArticleResponseType} from "../../../types/article-response.type";
import {ArticleService} from "../../shared/services/article.service";
import {BlogResponseType} from "../../../types/blog-response.type";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoriesResponseType} from "../../../types/categories-response.type";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blogArticles: ArticleResponseType[] = [];
  public open: boolean = true;
  public categories: CategoriesResponseType[] = [];
  public activeCategories: CategoriesResponseType[] = [];
  private queryParams: Params = {};

  constructor(private articleService: ArticleService, private categoriesService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.categoriesService.getCategories().subscribe((data: CategoriesResponseType[]) => {
        this.updateActiveCategories(data);
      });
      // console.log(this.queryParams['categories']);
    });

    this.articleService.getArticles().subscribe((data: BlogResponseType) => {
      {
        this.blogArticles = data.items;
      }
    });
  }

  private updateActiveCategories(data: CategoriesResponseType[]): void {
    if (this.queryParams['categories']) {
      this.categories = data.map((item: CategoriesResponseType): CategoriesResponseType => {
        for (let i = 0; i < this.queryParams['categories'].length; i++) {
          let category = this.queryParams['categories'][i];
          if (item.url === category) {
            item.selected = true;
            return item;
          } else {
            item.selected = false;
            return item;
          }
        }
        return item;
      });
    } else {
      this.categories = data;
    }
    this.activeCategories = this.categories.filter((item: CategoriesResponseType): boolean => item.selected === true);
  }

  public applyFilter(categoryUrl: string): void {
    let params = this.queryParams['categories'];
    let categories: string[] = [];
    let cat: string[] = [];
    if (params) {
      categories = Array.isArray(params) ? params : [params];
      categories.push(categoryUrl);
      console.log(categories);

      // Вот здесь проблемный код
      cat = categories;
      this.router.navigate([], {
        queryParams: {categories: cat},
      });
    } else {
      cat = [categoryUrl];
    }
    this.router.navigate([], {
      queryParams: {categories: cat},
    });

    this.articleService.getArticlesWithFilter().subscribe((data: BlogResponseType) => {
      // console.log(data);
    });
  }

  public toggle(): void {
    this.open = !this.open;
  }
}
