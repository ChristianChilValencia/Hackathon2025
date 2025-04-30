import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePage2PageRoutingModule } from './welcome-page2-routing.module';

import { WelcomePage2Page } from './welcome-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePage2PageRoutingModule
  ],
  declarations: [WelcomePage2Page]
})
export class WelcomePage2PageModule {}
