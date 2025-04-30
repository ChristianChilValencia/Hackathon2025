import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsBPage } from './tabs-b.page';

const routes: Routes = [
  {
    path: '',
    component: TabsBPage,
    children: [
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'tab6',
        loadChildren: () => import('../tab6/tab6.module').then(m => m.Tab6PageModule)
      },
      {
        path: 'tab7',
        loadChildren: () => import('../tab7/tab7.module').then(m => m.Tab7PageModule)
      },
      {
        path: 'tab8',
        loadChildren: () => import('../tab8/tab8.module').then(m => m.Tab8PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs-b/tab5',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-b/tab5',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsBPageRoutingModule {}
