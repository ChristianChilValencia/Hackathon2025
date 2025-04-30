import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileOrganizationPageRoutingModule } from './profile-organization-routing.module';

import { ProfileOrganizationPage } from './profile-organization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileOrganizationPageRoutingModule
  ],
  declarations: [ProfileOrganizationPage]
})
export class ProfileOrganizationPageModule {}
