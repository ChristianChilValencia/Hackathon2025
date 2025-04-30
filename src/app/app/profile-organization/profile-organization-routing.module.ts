import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileOrganizationPage } from './profile-organization.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileOrganizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileOrganizationPageRoutingModule {}
