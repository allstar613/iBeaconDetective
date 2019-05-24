import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";
import { MurdererModel } from "../../../models/murderer-models";

import { Storage } from '@ionic/storage';

/**
 * Generated class for the MurdererDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-murderer-detail',
  templateUrl: 'murderer-detail.html',
})
export class MurdererDetailPage {

  murdererBox = {} as MurdererModel;

  update_index: number;

  isGetData: boolean;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController) {
    this.murdererBox = this.navParams.data;

    this.isGetData = false;
  }

  ionViewDidLoad() {
    this.loadData_part1();
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
    })
  }


  identify() {
    if (this.UserList[this.update_index].Quiz_I && this.UserList[this.update_index].Quiz_T && this.UserList[this.update_index].Quiz_M && this.murdererBox.Answer) {
      alert("呿，哈哈哈哈阿，結果還是被抓到了");
      alert("事件已經破案，將獲得經驗值、積分。");
      this.Over();
    } else {
      alert(this.murdererBox.Talk);

    }

  }


  Over() {

    let promise = new Promise((resolve) => {

      if (this.WayToLogin.WhichWay == "Email") {
        if (!this.UserList[this.update_index].Mission_013) {
          const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
            Medal_013: true,
            Mission_013: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 300,
            UserExp: this.UserList[this.update_index].UserExp + 500,
            UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 500)),
          });
          if (result) {

            this.toast.create({
              message: `完成任務：懲凶緝惡`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }

      }
      else if (this.WayToLogin.WhichWay == "FB") {
        if (!this.UserList[this.update_index].Mission_013) {
          const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
            Medal_013: true,
            Mission_013: true,
            UserPoint: this.UserList[this.update_index].UserPoint + 300,
            UserExp: this.UserList[this.update_index].UserExp + 500,
            UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 500)),
          });
          if (result) {
            this.toast.create({
              message: `完成任務：懲凶緝惡`,
              duration: 3000
            }).present();
          }
          resolve("OK");
        }
      }
    })
  }

}
