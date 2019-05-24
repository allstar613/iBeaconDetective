import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { TipDetailPage } from '../tip-detail/tip-detail';
import { ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the TipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tip',
  templateUrl: 'tip.html',
})
export class TipPage {

  //UserData
  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  update_index: number;

  isGetData: boolean;

  viewMode: string;

  //Tip
  Tips = [];

  DetailBox = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private changeref: ChangeDetectorRef, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController, public platform: Platform, private nativeAudio: NativeAudio) {

    this.isGetData = false;

    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
    }
  }

  ionViewDidLoad() {

    this.GetTipsList();

    this.loadData_part1();

    setInterval(() => {


      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;

      }

      this.changeref.markForCheck();
    }, 1000);

  }

  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
    //   this.nativeAudio.play('track1');
  }

  GetTipsList() {

    this.fdb.list("/TipList").subscribe(data => {
      this.Tips = data;
      //  alert(JSON.stringify(this.Tips));
    });
  }

  GotoTipDetail(i) {
    this.DetailBox.pop();
    this.DetailBox.push({
      TipTitle: this.Tips[i].TipTitle,
      TipPic: this.Tips[i].TipPic,
      TipContent: this.Tips[i].TipContent,
    })

    this.navCtrl.push(TipDetailPage, this.DetailBox[0]);
  }

  //Get UserData
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
      this.UpdateData_firstVivePage();
    })


  }



  //第一次進入頁面
  UpdateData_firstVivePage() {
    //   alert(JSON.stringify("UpdateData"));

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_010) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_010: true,
          Mission_010: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：指引!?`,
            duration: 3000
          }).present();
        }
      }
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_010) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_010: true,
          Mission_010: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：指引!?`,
            duration: 3000
          }).present();
        }
      }

    }
  }


  add() {
    this.fdb.list("/TipList").push({
      TipTitle: "彰化師範大學寶山校區",
      TipNo: "001",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%9C%B0%E5%9C%96.jpg?alt=media&token=54c3fc16-7db7-4980-84f5-ec10839de0bb",
      TipContent: "寶山校區的警衛室位於師大路及寶山路的交接處，朝著警衛室西邊的寶山路前進，沿途會經過創新育成中心、甲區變電站，通過地下道後，緊接而來的是第九宿舍與在它後方的疊球場，在往前約五百公尺的路程，則到抵達黑松林，以及校區最西方的排球場。另一方，若從警衛室東北方道路前進，穿越了汽車停車場順著道路直行，在右手邊依序經過了總變電站、淨水場與經世館，走到深水井時往左轉，再稍走一段路程，在道路的左方將會經過力行館及相隔約五十公尺的人工湖，繞過校區最北的污水處理場後，約莫五百公尺的路程，將會抵達落在寶山校區的網球場，再往前直行，依序會看見教學二館、教學一館與教學大樓。",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "機械大樓(力行館)",
      TipNo: "002",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%8A%9B%E8%A1%8C%E9%A4%A8.JPG?alt=media&token=d6db5714-5b6c-4afb-aca9-9eea8d161fcd",
      TipContent: "地上6樓、地下1樓的建築物，寶山校區衛生保健組（健康中心）設於地下1樓，工業教育與技術學系、人力資源管理研究所。",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "管理學院大樓(經世館)",
      TipNo: "003",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E7%AE%A1%E7%90%86%E5%AD%B8%E9%99%A2.jpg?alt=media&token=239abde0-c8fa-428a-be95-53c2033da884",
      TipContent: "本院設有企業管理學系（所）、行銷與流通管理研究所、會計學系（所）、資訊管理學系（所）、數位內容科技與管理研究所。在推廣教育方面，現有國際企業經營管理碩士學位(IMBA)班、企業高階管理碩士學位(EMBA)班、創新與管理碩士學位(IMMBA)班。",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "工學院",
      TipNo: "004",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%B7%A5%E5%AD%B8%E9%99%A2.jpg?alt=media&token=3cabc181-2266-429b-ac76-65cf8e1838ec",
      TipContent: "工學院於民國91年8月成立，目前設有資訊工程學系(大學部、資訊工程學系碩士班、資訊工程學系積體電路設計碩士班)、電子工程學系(大學部、碩士班)、電機工程學系(大學部、碩士班、博士班)、機電工程學系(大學部、碩士班、博士班)及電信工程研究所(碩士班)等4系1所。",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "寶山教學ㄧ館",
      TipNo: "005",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E6%95%99%E5%AD%B8%E4%B8%80%E9%A4%A8.JPG?alt=media&token=d8a8a376-a66a-423a-857c-43d382d740fe",
      TipContent: "地上4樓、地下3樓的建築物，寶山文書收發組（學生領取信件處）設於1樓，1樓教室為教一會、教一商，2樓教室為教一企、教一資、教一小",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "寶山教學二館",
      TipNo: "006",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E6%95%99%E5%AD%B8%E4%BA%8C%E9%A4%A8.jpg?alt=media&token=f50a2529-c85e-4c28-9202-0000eaa28ca2",
      TipContent: "學生諮商輔導中心寶山分處，自西元2010年3月15日起設於4樓",
    })

    this.fdb.list("/TipList").push({
      TipTitle: "第九宿舍",
      TipNo: "007",
      TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E7%AC%AC%E4%B9%9D%E5%AE%BF%E8%88%8D.jpg?alt=media&token=17e1b972-c7c7-4d49-9408-92b1be59ceed",
      TipContent: "彰化師範大學寶山校區唯一的一棟宿舍，一共有八層樓，一樓到五樓提供男同學住宿；六樓到八樓提供女同學住宿。所以、第9宿舍學習專區三樓為男生學習專區，六樓為女生學習專區。",
    })
  }


}
