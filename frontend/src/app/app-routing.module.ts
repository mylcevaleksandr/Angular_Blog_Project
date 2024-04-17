import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {authForwardGuard} from "./core/auth/auth-forward.guard";
import {AgreeComponent} from "./views/agree/agree.component";

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
