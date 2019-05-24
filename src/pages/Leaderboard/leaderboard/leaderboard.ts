import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Platform } from 'ionic-angular';

import { WayToLoginModel } from "../../../models/WayToLogin-models";
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';

import { ChangeDetectorRef } from '@angular/core';
import { Promise } from 'firebase';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the LeaderboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  Me: string;

  //UserData

  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList_FromFB = [];

  UserList = [];

  LeaderList = [];

  update_index: number;

  isMix: boolean;

  isGetData: boolean;

  viewMode: string;


  constructor(public navCtrl: NavController, public playerdata: ModalController, private fdb: AngularFireDatabase, private storage: Storage, private changeref: ChangeDetectorRef, private toast: ToastController, public platform: Platform, private nativeAudio: NativeAudio) {

    this.isGetData = false;
    this.isMix = false;

    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
    }
  }

  //撈取資料
  ionViewDidLoad() {

    this.loadData_part1();

    setInterval(() => {

      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
      }

      //  this.navCtrl.setRoot(LeaderboardPage);

      this.changeref.markForCheck();
    }, 1000);

    this.viewMode = "Player_all";
  }

  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
    //   this.nativeAudio.play('track1');
  }

  //GetUserData
  //從本機記憶體抓取登入方式
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
  //把用Email登入的玩家資料抓出來
  loadData_part2() {

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
  //把用FB登入的玩家資料抓出來
  loadData_part3() {
    this.fdb.list("/Accounts_FB").subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.UserList_FromFB = data;
          resolve(data);
        }
      }).then(resolve => {
        this.loadData_part4();
      })
    });
  }
  //將兩個登入方式的玩家資料混在一起
  loadData_part4() {

    let promise = new Promise((resolve) => {

      for (var i = 0; i < this.UserList_FromFB.length; i++) {
        this.UserList.push(this.UserList_FromFB[i]);
      }
      resolve("GET")

    }).then(resolve => {
      //    alert(JSON.stringify(this.LeaderList));
      //   this.LeaderList = this.UserList;

      this.RankThePlayer(this.UserList);


      //    setTimeout(() => {
      this.loadData_part5();
      //  }, 750);



    })
  }


  //依照積分去排列
  RankThePlayer(box = []) {
    let promise = new Promise((resolve) => {
      box.sort(function (a, b) { return b.UserPoint - a.UserPoint });
      return box;

    })
  }


  //從全部玩家資料裡面找出自己
  loadData_part5() {

    let promise = new Promise((resolve) => {

      for (var i = 0; i < this.UserList.length; i++) {

        if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {

          this.update_index = i;
          this.isGetData = true;
          this.Me = this.UserList[i].UserUid;
        }
      }

      if (this.isGetData) {
        resolve("GET")
      }
    }).then(resolve => {
      this.UpdateData_firstLogin();
      //    this.LeaderList = this.RankThePlayer(this.LeaderList);
    })
  }
  /*
    //依照積分去排列
    RankThePlayer(box = []) {
  
      box.sort(function (a, b) { return b.UserPoint - a.UserPoint });
      return box;
    }
  */


  //第一次登入任務判斷
  UpdateData_firstLogin() {
    let promise = new Promise((resolve) => {
      if (this.WayToLogin.WhichWay == "Email") {

        if (!this.UserList[this.update_index].Mission_005) {
          const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
            Medal_005: true,
            Mission_005: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 30,
            UserExp: this.UserList[this.update_index].UserExp + 25,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：同業競爭`,
              duration: 3000
            }).present();
            resolve("OK");
          }
        }
      }
      else if (this.WayToLogin.WhichWay == "FB") {

        if (!this.UserList[this.update_index].Mission_005) {
          const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
            Medal_005: true,
            Mission_005: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 30,
            UserExp: this.UserList[this.update_index].UserExp + 25,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：同業競爭`,
              duration: 3000
            }).present();
            resolve("OK");
          }
        }
      }
    })
  }
}
