import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePage1PageRoutingModule } from './welcome-page1-routing.module';

import { WelcomePage1Page } from './welcome-page1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePage1PageRoutingModule
  ],
  declarations: [WelcomePage1Page]
})
export class WelcomePage1PageModule {}
