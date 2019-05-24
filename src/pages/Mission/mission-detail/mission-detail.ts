import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MissionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mission-detail',
  templateUrl: 'mission-detail.html',
})
export class MissionDetailPage {

  missionBox = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //抓取傳入的資料
    this.missionBox = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionDetailPage');
  }

}
