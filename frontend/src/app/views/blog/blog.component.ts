import {Component, OnInit} from '@angular/core';
import {ArticleResponseType} from "../../../types/article-response.type";
import {ArticleService} from "../../shared/services/article.service";
import {BlogResponseType} from "../../../types/blog-response.type";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoriesResponseType} from "../../../types/categories-response.type";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QueryParamsType} from "../../../types/queryParams.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blogArticles: ArticleResponseType[] = [];
  public open: boolean = false;
  public categories: CategoriesResponseType[] = [];
  public activeCategories: CategoriesResponseType[] = [];
  public activeParams: QueryParamsType = {};
  public pages: number[] = [];

  constructor(private articleService: ArticleService,
              private categoriesService: CategoriesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.findActiveParams(params);
      this.categoriesService.getCategories().subscribe((data: CategoriesResponseType[]) => {
        this.updateActiveCategories(data);
      });
      this.updateBlogArticles();
    });
  }

  private findActiveParams(params: Params) {
    let categories: string[] = [];
    this.activeParams.categories = [];
    if (params['categories']) {
      categories = Array.isArray(params['categories']) ? [...params['categories']] : [params['categories']];
      this.activeParams.categories = categories;
    }
    if (params['page']) {
      this.activeParams.page = +params['page'];
    } else {
      this.activeParams.page = 1;
    }
  }

  private updateBlogArticles(): void {
    this.pages = [];
    if (this.activeParams.categories && this.activeParams.categories.length > 0 || this.activeParams.page) {
      this.articleService.getArticlesWithFilter(this.activeParams).subscribe((data: BlogResponseType) => {
        for (let i = 1; i <= data.pages; i++) {
          this.pages.push(i);
        }
        this.blogArticles = data.items;
      });
    } else {
      this.articleService.getArticles().subscribe((data: BlogResponseType) => {
        {
          for (let i = 1; i <= data.pages; i++) {
            this.pages.push(i);
          }
          this.blogArticles = data.items;
        }
      });
    }
  }

  private updateActiveCategories(data: CategoriesResponseType[]): void {
    let cat: string[];
    if (this.activeParams.categories) {
      cat = this.activeParams.categories;
    }
    this.categories = data.map((item: CategoriesResponseType): CategoriesResponseType => {
      if (cat.length > 0) {
        for (let i: number = 0; i < cat.length; i++) {
          let category: string = cat[i];
          if (item.url === category) {
            item.selected = true;
            return item;
          }
        }
      }
      item.selected = false;
      return item;
    });
    this.activeCategories = this.categories.filter((item: CategoriesResponseType): boolean => item.selected === true);
  }

  public applyFilter(categoryUrl: string): void {
    let cat: string[];
    if (this.activeParams.categories && this.activeParams.categories.length > 0) {
      cat = this.activeParams.categories;
      if (cat.some(item => item === categoryUrl)) {
        cat = cat.filter(item => item !== categoryUrl);
      } else {
        cat.push(categoryUrl);
      }
    } else {
      cat = [categoryUrl];
    }
    this.activeParams.categories = cat;
    this.activeParams.page = 1;
    this.navigate();

  }

  public toggle(): void {
    setTimeout(() => {
      this.open = !this.open;
    }, 300);
  }

  public navigate() {
    let queryParams: QueryParamsType = this.activeParams;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  public openPage(page: number): void {
    this.activeParams.page = page;
    this.navigate();
  }

  public openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.navigate();
    }
  }

  public openNextPage(): void {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.navigate();
    }
  }
}
