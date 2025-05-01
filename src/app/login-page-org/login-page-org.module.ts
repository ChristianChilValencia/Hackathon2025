import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageOrgPageRoutingModule } from './login-page-org-routing.module';

import { LoginPageOrgPage } from './login-page-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageOrgPageRoutingModule
  ],
  declarations: [LoginPageOrgPage]
})
export class LoginPageOrgPageModule {}
