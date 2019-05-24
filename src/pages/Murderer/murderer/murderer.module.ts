import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MurdererPage } from './murderer';

@NgModule({
  declarations: [
    MurdererPage,
  ],
  imports: [
    IonicPageModule.forChild(MurdererPage),
  ],
})
export class MurdererPageModule {}
