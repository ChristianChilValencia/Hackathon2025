import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileConsumerPage } from './profile-consumer.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileConsumerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileConsumerPageRoutingModule {}
