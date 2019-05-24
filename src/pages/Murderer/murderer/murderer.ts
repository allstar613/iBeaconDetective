import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio';

import { MurdererDetailPage } from '../murderer-detail/murderer-detail';
/**
 * Generated class for the MurdererPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-murderer',
  templateUrl: 'murderer.html',
})
export class MurdererPage {

  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  isGetData: boolean;

  update_index: number;

  DetailBox = [];

  MurdererList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private storage: Storage, public platform: Platform, private nativeAudio: NativeAudio, private changeref: ChangeDetectorRef, ) {

    this.isGetData = false;
    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
    }
  }

  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
    //   this.nativeAudio.play('track1');
  }

  ionViewDidLoad() {

    this.loadData_part1();

    setInterval(() => {

      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
      }
      this.changeref.markForCheck();
    }, 1000);
  }

  //Change to detail
  GotoDetail(i) {

    this.DetailBox.pop();
    this.DetailBox.push({
      Name: this.MurdererList[i].Name,
      Answer: this.MurdererList[i].Answer,
      Confession: this.MurdererList[i].Confession,
      Department: this.MurdererList[i].Department,
      Pic: this.MurdererList[i].Pic,
      Talk: this.MurdererList[i].Talk,
    })

    this.navCtrl.push(MurdererDetailPage, this.DetailBox[0]);
  }

  //GetUserData
  loadData_part1() {

    this.storage.get('Way').then((val) => {
      return new Promise((resolve) => {
        if (val) {
          this.WayToLogin = val;
          resolve(val);
        }
      }).then(resolve => {
        this.loadData_part2();
      })
    });
  }

  loadData_part2() {

    if (this.WayToLogin.WhichWay == "Email") {
      this.fdb.list("/Accounts_Email").subscribe(data => {
        return new Promise((resolve) => {
          if (data) {
            this.UserList = data;
            resolve(data);
          }
        }).then(resolve => {
          this.loadData_part3();
        })
      });
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      this.fdb.list("/Accounts_FB").subscribe(data => {
        return new Promise((resolve) => {
          if (data) {
            this.UserList = data;
            resolve(data);
          }
        }).then(resolve => {
          this.loadData_part3();
        })
      });
    }
  }

  loadData_part3() {

    let promise = new Promise((resolve) => {
      for (var i = 0; i < this.UserList.length; i++) {

        if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {

          this.update_index = i;
          this.isGetData = true;
        }
      }

      if (this.isGetData) {
        resolve("GET")
      }
    }).then(resolve => {
      this.GetMurdererList();
    })
  }

  GetMurdererList() {
    this.fdb.list("/MurdererList").subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.MurdererList = data;
          resolve(data);
        }
      })
    });
  }

  AddMedal() {
    this.fdb.list("/MurdererList").push({
      Name: "張樂哲",
      Confession: "哈~?，我確實在那天晚上快10點的時候有走地下道，我只是每晚都會走到校園內散散步，怎麼，散步也犯法了嗎?",
      Department: "機電工程學系",
      Answer: false,
      Pic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/murderer%2F%E5%BC%B5%E6%A8%82%E5%93%B2.png?alt=media&token=31b04400-fb51-4c09-8705-bfdebf79fec0"

    })

  }


}
