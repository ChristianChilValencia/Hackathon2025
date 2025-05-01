import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageOrgPage } from './login-page-org.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPageOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageOrgPageRoutingModule {}
