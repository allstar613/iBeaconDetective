import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

/**
 * Generated class for the MedalsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medals-detail',
  templateUrl: 'medals-detail.html',
})
export class MedalsDetailPage {

  medalBox = [];

  update_index: number;

  isGetData: boolean;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController) {
    this.medalBox = this.navParams.data;

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
    }).then(resolve => {
      this.UpdateData_firsViewPage();
    })
  }

  //第一次進入頁面判斷
  UpdateData_firsViewPage() {

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_009) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_009: true,
          Mission_009: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：榮耀`,
            duration: 3000
          }).present();
        }
      }

    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_009) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_009: true,
          Mission_009: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：榮耀`,
            duration: 3000
          }).present();
        }
      }

    }

  }
}
