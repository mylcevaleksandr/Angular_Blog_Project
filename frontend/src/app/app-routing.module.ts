import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {authForwardGuard} from "./core/auth/auth-forward.guard";
import {AgreeComponent} from "./views/agree/agree.component";
import {ArticleComponent} from "./views/article/article.component";
import {BlogComponent} from "./views/blog/blog.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then((m) => m.UserModule),
        canActivate: [authForwardGuard],
      },
      {
        path: 'agree',
        component: AgreeComponent
      },
      {
        path: 'article',
        component: ArticleComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
