import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsBPageRoutingModule } from './tabs-b-routing.module';

import { TabsBPage } from './tabs-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsBPageRoutingModule
  ],
  declarations: [TabsBPage]
})
export class TabsBPageModule {}
