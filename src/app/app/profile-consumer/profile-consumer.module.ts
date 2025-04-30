import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileConsumerPageRoutingModule } from './profile-consumer-routing.module';

import { ProfileConsumerPage } from './profile-consumer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileConsumerPageRoutingModule
  ],
  declarations: [ProfileConsumerPage]
})
export class ProfileConsumerPageModule {}
