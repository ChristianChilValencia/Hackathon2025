import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'welcome-page1',
    loadChildren: () => import('./welcome-page1/welcome-page1.module').then( m => m.WelcomePage1PageModule)
  },
  {
    path: 'welcome-page2',
    loadChildren: () => import('./welcome-page2/welcome-page2.module').then( m => m.WelcomePage2PageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'profile-consumer',
    loadChildren: () => import('./profile-consumer/profile-consumer.module').then( m => m.ProfileConsumerPageModule)
  },
  {
    path: 'profile-organization',
    loadChildren: () => import('./profile-organization/profile-organization.module').then( m => m.ProfileOrganizationPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tabs-b',
    loadChildren: () => import('./tabs-b/tabs-b.module').then( m => m.TabsBPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
