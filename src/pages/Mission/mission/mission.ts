import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { MissionDetailPage } from '../mission-detail/mission-detail';

import { ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the MissionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {


  //UserData

  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  update_index: number;

  isGetData: boolean;
  isMatchDone: boolean;

  MissionList = [];
  MissionDone = [];
  MissionDidnot = [];

  DetailBox = [];

  missionType: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private storage: Storage, private changeref: ChangeDetectorRef, private toast: ToastController, private nativeAudio: NativeAudio) {
    this.isGetData = false;
    this.isMatchDone = false;

    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
    }
  }

  ionViewDidLoad() {

    //撈取資料
    this.loadData_part1();

    //實時更新經驗條
    setInterval(() => {

      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
      }
      this.changeref.markForCheck();
    }, 1000);

    this.missionType = "onClear";
  }

  //載入成功後，放音樂
  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
    //   this.nativeAudio.play('track1');
  }

  //Change to detail
  //這個是去看已完成任務的詳細資料
  GotGottonDetail(i) {

    this.DetailBox.pop();
    this.DetailBox.push({
      isGot: true,
      MissionName: this.MissionDone[i].MissionName,
      MissionRewardMedal: this.MissionDone[i].MissionRewardMedal,
      MissionRewardExp: this.MissionDone[i].MissionRewardExp,
      MissionRewardPoint: this.MissionDone[i].MissionRewardPoint,
      MissionDetail: this.MissionDone[i].MissionDetail
    })

    this.navCtrl.push(MissionDetailPage, this.DetailBox[0]);
  }

  //這個是去看未完成任務的詳細資料
  GotOngottonDetail(i) {

    this.DetailBox.pop();
    this.DetailBox.push({
      isGot: false,
      MissionName: this.MissionDidnot[i].MissionName,
      MissionRewardMedal: this.MissionDidnot[i].MissionRewardMedal,
      MissionRewardExp: this.MissionDidnot[i].MissionRewardExp,
      MissionRewardPoint: this.MissionDidnot[i].MissionRewardPoint,
      MissionDetail: this.MissionDidnot[i].MissionDetail
    })

    this.navCtrl.push(MissionDetailPage, this.DetailBox[0]);
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
      this.GetMissionList();
    })
  }


  //Get Mission Data

  GetMissionList() {
    this.fdb.list("/MissionList").subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.MissionList = data;
          resolve(data);
        }
      }).then(resolve => {
        this.UpdateData_firsViewPage();
      })

    });
  }

  //第一次進入頁面判斷
  UpdateData_firsViewPage() {

    let promise = new Promise((resolve) => {
      if (this.WayToLogin.WhichWay == "Email") {
        if (!this.UserList[this.update_index].Mission_011) {
          const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
            Medal_011: true,
            Mission_011: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 50,
            UserExp: this.UserList[this.update_index].UserExp + 25,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：狩獵開始`,
              duration: 3000
            }).present();
          }
        }
        resolve("OK");
      }
      else if (this.WayToLogin.WhichWay == "FB") {
        if (!this.UserList[this.update_index].Mission_011) {
          const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
            Medal_011: true,
            Mission_011: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 50,
            UserExp: this.UserList[this.update_index].UserExp + 25,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：狩獵開始`,
              duration: 3000
            }).present();

          }
        }
        resolve("OK");
      }
    }).then(resolve => {
      this.matchMission();
    })
  }

  //將任務分類為 已完成跟未完成
  matchMission() {
    this.MissionDone = [];
    this.MissionDidnot = [];

    if (this.UserList[this.update_index].Mission_001) {
      this.MissionDone.push(this.MissionList[0]);
    } else {
      this.MissionDidnot.push(this.MissionList[0]);
    }

    if (this.UserList[this.update_index].Mission_002) {
      this.MissionDone.push(this.MissionList[1]);
    } else {
      this.MissionDidnot.push(this.MissionList[1]);
    }

    if (this.UserList[this.update_index].Mission_003) {
      this.MissionDone.push(this.MissionList[2]);
    } else {
      this.MissionDidnot.push(this.MissionList[2]);
    }

    if (this.UserList[this.update_index].Mission_004) {
      this.MissionDone.push(this.MissionList[3]);
    } else {
      this.MissionDidnot.push(this.MissionList[3]);
    }

    if (this.UserList[this.update_index].Mission_005) {
      this.MissionDone.push(this.MissionList[4]);
    } else {
      this.MissionDidnot.push(this.MissionList[4]);
    }

    if (this.UserList[this.update_index].Mission_007) {
      this.MissionDone.push(this.MissionList[6]);
    } else {
      this.MissionDidnot.push(this.MissionList[6]);
    }

    if (this.UserList[this.update_index].Mission_008) {
      this.MissionDone.push(this.MissionList[7]);
    } else {
      this.MissionDidnot.push(this.MissionList[7]);
    }


    if (this.UserList[this.update_index].Mission_009) {
      this.MissionDone.push(this.MissionList[8]);
    } else {
      this.MissionDidnot.push(this.MissionList[8]);
    }

    if (this.UserList[this.update_index].Mission_010) {
      this.MissionDone.push(this.MissionList[9]);
    } else {
      this.MissionDidnot.push(this.MissionList[9]);
    }

    if (this.UserList[this.update_index].Mission_011) {
      this.MissionDone.push(this.MissionList[10]);
    } else {
      this.MissionDidnot.push(this.MissionList[10]);
    }

    if (this.UserList[this.update_index].Mission_013) {
      this.MissionDone.push(this.MissionList[12]);
    } else {
      this.MissionDidnot.push(this.MissionList[12]);
    }


    this.isMatchDone = true;

  }

}

