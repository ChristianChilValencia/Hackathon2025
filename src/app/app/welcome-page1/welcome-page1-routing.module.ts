import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage1Page } from './welcome-page1.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePage1PageRoutingModule {}
