import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage2Page } from './welcome-page2.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePage2PageRoutingModule {}
