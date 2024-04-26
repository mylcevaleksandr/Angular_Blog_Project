import {Component, Input} from '@angular/core';
import {ArticleResponseType} from "../../../../types/article-response.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: ArticleResponseType;

  constructor(private router: Router) {
  }

  public readMore(url: string): void {
    console.log(url);
    this.router.navigate(
      ['/article'],
      {
        queryParams: {url}
      }
    );
  }
}
