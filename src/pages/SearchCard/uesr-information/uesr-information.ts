import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

import { ChangeDetectorRef } from '@angular/core';

import { NativeAudio } from '@ionic-native/native-audio';
import { Promise } from 'firebase/app';

import { MedalsDetailPage } from '../medals-detail/medals-detail';
import { MedalsPage } from '../medals/medals';

@IonicPage()
@Component({
  selector: 'page-uesr-information',
  templateUrl: 'uesr-information.html',
})
export class UesrInformationPage {

  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  update_index: number;

  isGetData: boolean;

  Exp_sum: number;

  //獎章用
  MedalList = [];
  MedalDone = [];
  isMatchDone: boolean;

  DetailBox = [];

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
        this.Exp_sum = (this.UserList[this.update_index].UserLv * 200);
        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / this.Exp_sum * 100) * 100) / 100;

      }
      this.changeref.markForCheck();
    }, 1000);


  }

  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
    //   this.nativeAudio.play('track1');
  }

  //Change to detail
  GotGottonDetail(i) {

    this.DetailBox.pop();
    this.DetailBox.push({
      isGot: true,
      MedalName: this.MedalDone[i].MedalName,
      MedalNo: this.MedalDone[i].MedalNo,
      MedalURL: this.MedalDone[i].MedalURL,
      GetWays: this.MedalDone[i].GetWays,
      Description: this.MedalDone[i].Description
    })

    this.navCtrl.push(MedalsDetailPage, this.DetailBox[0]);
  }

  //以下為撈取資料的一連串事件
  //使用非同步的方式進行
  //也就是 A 做完 換 B ， B 做完 換C 
  //閱讀方法為
  /*

    this.storage.get('Way').then((val) => {
      return new Promise((resolve) => {
        if (val) {
          //  alert(JSON.stringify(val));
          this.WayToLogin = val;
          resolve(val);
        }
      }).then(resolve => {
        this.loadData_part2();
      })
    });

  1. this.storage.get('Way')
     這是一個可能會需要等待的涵式
     所以我們使用.then()，並要求給予他回傳一個 val值
  2. 並且在之後設定一個 Promise

      return new Promise((resolve) => {
        if (val) {
          //  alert(JSON.stringify(val));
          this.WayToLogin = val;
          resolve(val);
        }
      }).then(resolve => {
        this.loadData_part2();
      })   
      
      原理是他會等待上面事件完成
      拿上面的來說明
      1. 當Promise偵測到第1點的值已經回傳時
      2. 進入裡面凾式，此時你可以做你想做的設定
      3. 並且透過  resolve(val); 回傳說他已經收到值了
      4. 而當後面的.then(124行)得知他收到值的時候，進行下一個涵是
      5. 後面依此類推


  */
  loadData_part1() {
    this.storage.get('Way').then((val) => {
      return new Promise((resolve) => {
        if (val) {
          //  alert(JSON.stringify(val));
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

        //    alert(JSON.stringify(this.UserList[i].UserUid));
        if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {

          this.update_index = i;
          this.isGetData = true;
        }
      }

      if (this.isGetData) {
        resolve("GET")
      }
    }).then(resolve => {
      // this.UpdateData_firstLogin();
      this.GetMedalList();
    })
  }

  GetMedalList() {
    this.fdb.list("/MedalList").subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.MedalList = data;
          resolve(data);
        }
      }).then(resolve => {
        this.UpdateData_firstLogin();
        this.matchMedal();
      })

    });
  }

  //第一次登入任務判斷
  UpdateData_firstLogin() {
    let promise = new Promise((resolve) => {
      if (this.WayToLogin.WhichWay == "Email") {

        if (!this.UserList[this.update_index].Mission_001) {
          const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
            Medal_001: true,
            Mission_001: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 20,
            UserExp: this.UserList[this.update_index].UserExp + 100,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 100) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：初次踏入`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }
      }
      else if (this.WayToLogin.WhichWay == "FB") {

        if (!this.UserList[this.update_index].Mission_001) {
          const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
            Medal_001: true,
            Mission_001: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 20,
            UserExp: this.UserList[this.update_index].UserExp + 100,
            UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 100) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：初次踏入`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }
      }
    }).then(resolve => {
      this.UpdateData_firstViveIM();
    })
  }

  //第一次觀看個人頁面任務判斷
  UpdateData_firstViveIM() {

    let promise = new Promise((resolve) => {

      if (this.WayToLogin.WhichWay == "Email") {
        if (!this.UserList[this.update_index].Mission_002) {
          const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
            Medal_002: true,
            Mission_002: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 20,
            UserExp: this.UserList[this.update_index].UserExp + 20,
            UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 200)),
          });
          if (result) {

            this.toast.create({
              message: `完成任務：查看搜查證`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }

      }
      else if (this.WayToLogin.WhichWay == "FB") {
        if (!this.UserList[this.update_index].Mission_002) {
          const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
            Medal_002: true,
            Mission_002: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 20,
            UserExp: this.UserList[this.update_index].UserExp + 20,
            UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 200)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：查看搜查證`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }
      }
    })
  }

  //將已完成的獎章撈取出來
  matchMedal() {
    //  alert("matchMedal");
    this.MedalDone = [];

    if (this.UserList[this.update_index].Medal_001) {
      this.MedalDone.push(this.MedalList[0]);
    }

    if (this.UserList[this.update_index].Medal_002) {
      this.MedalDone.push(this.MedalList[1]);
    }

    if (this.UserList[this.update_index].Medal_003) {
      this.MedalDone.push(this.MedalList[2]);
    }
    if (this.UserList[this.update_index].Medal_004) {
      this.MedalDone.push(this.MedalList[3]);
    }

    if (this.UserList[this.update_index].Medal_005) {
      this.MedalDone.push(this.MedalList[4]);
    }

    if (this.UserList[this.update_index].Medal_006) {
      this.MedalDone.push(this.MedalList[5]);
    }

    if (this.UserList[this.update_index].Medal_007) {
      this.MedalDone.push(this.MedalList[6]);
    }

    if (this.UserList[this.update_index].Medal_008) {
      this.MedalDone.push(this.MedalList[7]);
    }

    if (this.UserList[this.update_index].Medal_009) {
      this.MedalDone.push(this.MedalList[8]);
    }
    if (this.UserList[this.update_index].Medal_010) {
      this.MedalDone.push(this.MedalList[9]);
    }

    if (this.UserList[this.update_index].Medal_011) {
      this.MedalDone.push(this.MedalList[10]);
    }

    if (this.UserList[this.update_index].Medal_012) {
      this.MedalDone.push(this.MedalList[11]);
    }

    if (this.UserList[this.update_index].Medal_013) {
      this.MedalDone.push(this.MedalList[12]);
    }

    this.isMatchDone = true;

  }
}