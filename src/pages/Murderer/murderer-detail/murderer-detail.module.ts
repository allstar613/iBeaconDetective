import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MurdererDetailPage } from './murderer-detail';

@NgModule({
  declarations: [
    MurdererDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MurdererDetailPage),
  ],
})
export class MurdererDetailPageModule {}
