import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { MedalsDetailPage } from '../medals-detail/medals-detail';

/**
 * Generated class for the MedalsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-medals',
  templateUrl: 'medals.html',
})
export class MedalsPage {

  //ps. 這個頁面到最後並沒有放入系統中呈現
  //此頁面中的涵式結構跟邏輯皆與 Mission頁面 相同

  //UserData

  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  update_index: number;

  isGetData: boolean;
  isMatchDone: boolean;

  MedalList = [];
  MedalDone = [];
  MedalDidnot = [];

  DetailBox = [];

  medalType: any;

  MedalName: string;
  MedalNo: string;
  MedalURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, private storage: Storage, private changeref: ChangeDetectorRef, private toast: ToastController) {

    this.isGetData = false;
    this.isMatchDone = false;
  }

  ionViewDidLoad() {

    this.loadData_part1();

    setInterval(() => {

      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
      }
      this.changeref.markForCheck();
    }, 1000);

    this.medalType = "onGet";
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

  GotOngottonDetail(i) {

    this.DetailBox.pop();
    this.DetailBox.push({
      isGot: false,
      MedalName: this.MedalDidnot[i].MedalName,
      MedalNo: this.MedalDidnot[i].MedalNo,
      MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%B0%9A%E6%9C%AA%E5%8F%96%E5%BE%97.png?alt=media&token=363bda5c-2ff6-4f45-be52-13bc641f7ad1",
      GetWays: this.MedalDidnot[i].GetWays,
      Description: this.MedalDidnot[i].Description
    })

    this.navCtrl.push(MedalsDetailPage, this.DetailBox[0]);
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
      this.GetMedalList();
    })
  }

  //Get Medal Data

  GetMedalList() {
    this.fdb.list("/MedalList").subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.MedalList = data;
          resolve(data);
        }
      }).then(resolve => {
        //  alert("GetMedalList Over");
        this.UpdateData_firsViewPage();
        //  this.matchMedal();
      })

    });
  }

  matchMedal() {
    this.MedalDone = [];
    this.MedalDidnot = [];

    if (this.UserList[this.update_index].Medal_001) {
      this.MedalDone.push(this.MedalList[0]);
    } else {
      this.MedalDidnot.push(this.MedalList[0]);
    }

    if (this.UserList[this.update_index].Medal_002) {
      this.MedalDone.push(this.MedalList[1]);
    } else {
      this.MedalDidnot.push(this.MedalList[1]);
    }

    if (this.UserList[this.update_index].Medal_003) {
      this.MedalDone.push(this.MedalList[2]);
    } else {
      this.MedalDidnot.push(this.MedalList[2]);
    }

    if (this.UserList[this.update_index].Medal_004) {
      this.MedalDone.push(this.MedalList[3]);
    } else {
      this.MedalDidnot.push(this.MedalList[3]);
    }

    if (this.UserList[this.update_index].Medal_005) {
      this.MedalDone.push(this.MedalList[4]);
    } else {
      this.MedalDidnot.push(this.MedalList[4]);
    }

    if (this.UserList[this.update_index].Medal_006) {
      this.MedalDone.push(this.MedalList[5]);
    } else {
      this.MedalDidnot.push(this.MedalList[5]);
    }

    if (this.UserList[this.update_index].Medal_007) {
      this.MedalDone.push(this.MedalList[6]);
    } else {
      this.MedalDidnot.push(this.MedalList[6]);
    }

    if (this.UserList[this.update_index].Medal_008) {
      this.MedalDone.push(this.MedalList[7]);
    } else {
      this.MedalDidnot.push(this.MedalList[7]);
    }

    if (this.UserList[this.update_index].Medal_009) {
      this.MedalDone.push(this.MedalList[8]);
    } else {
      this.MedalDidnot.push(this.MedalList[8]);
    }

    if (this.UserList[this.update_index].Medal_010) {
      this.MedalDone.push(this.MedalList[9]);
    } else {
      this.MedalDidnot.push(this.MedalList[9]);
    }

    if (this.UserList[this.update_index].Medal_011) {
      this.MedalDone.push(this.MedalList[10]);
    } else {
      this.MedalDidnot.push(this.MedalList[10]);
    }

    if (this.UserList[this.update_index].Medal_012) {
      this.MedalDone.push(this.MedalList[11]);
    } else {
      this.MedalDidnot.push(this.MedalList[11]);
    }

    this.isMatchDone = true;

  }

  //第一次進入頁面判斷
  UpdateData_firsViewPage() {
    let promise = new Promise((resolve) => {
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
        resolve("OK");
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
        resolve("OK");
      }
    }).then(resolve => {
      this.matchMedal();
    })
  }



  AddMedal() {
    /*   this.fdb.list("/MedalList").push({
         MedalName: "小偵探",
         MedalNo: "001",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%B0%8F%E5%81%B5%E6%8E%A2.png?alt=media&token=8f11983b-4f68-4f7c-972b-23a02346d837",
         GetWays: "完成任務「初次踏入」",
         Description: "玩家第一次登入，接受使命的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "搜查證明",
         MedalNo: "002",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%90%9C%E6%9F%A5%E8%AD%89%E6%98%8E.png?alt=media&token=be9d16e3-b57a-4b47-bf61-e249808fa8c4",
         GetWays: "完成任務「察看搜查證」",
         Description: "玩家第一次查看個人資訊的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "開始交流",
         MedalNo: "003",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E9%96%8B%E5%A7%8B%E4%BA%A4%E6%B5%81.png?alt=media&token=4cc14943-3a6d-48d4-b349-750f86862acc",
         GetWays: "完成任務「同業攀談」",
         Description: "玩家第一次進入聊天室的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "起步偵查",
         MedalNo: "004",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B5%B7%E6%AD%A5%E5%81%B5%E6%9F%A5.png?alt=media&token=89745a2b-9e6c-426b-8397-47950d17cc9a",
         GetWays: "完成任務「首次偵查線索」",
         Description: "玩家第一次進入偵查頁面的證明",
       })
       this.fdb.list("/MedalList").push({
         MedalName: "勁敵",
         MedalNo: "005",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%8B%81%E6%95%B5.png?alt=media&token=a230ba20-da76-4f9e-9d47-a7154380bd34",
         GetWays: "完成任務「同業競爭」",
         Description: "玩家第一次查看排行榜的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "我不是邊緣人",
         MedalNo: "006",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%88%90%E7%BE%A4%E7%B5%90%E9%9A%8A.png?alt=media&token=cdf1937b-78e1-463c-83d4-423bea9aca7f",
         GetWays: "完成任務「出外靠朋友」",
         Description: "當玩家第一次與其他玩家成為朋友的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "接近犯人的第一步",
         MedalNo: "007",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%8E%A5%E8%BF%91%E7%8A%AF%E4%BA%BA%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5.png?alt=media&token=0340e620-58c9-400c-b8bc-043e7d1cd973",
         GetWays: "完成任務「實力的證明」",
         Description: "玩家第一次取得線索，所給予的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "踏入禁區",
         MedalNo: "008",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B8%8F%E5%85%A5%E7%A6%81%E5%8D%80.png?alt=media&token=f1ace902-d79c-41cd-b92e-58b5b6ce7a85",
         GetWays: "完成任務「現場搜查」",
         Description: "當玩家第一次接受線索偵查活動的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "蒐藏家",
         MedalNo: "009",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%94%B6%E8%97%8F%E5%AE%B6.png?alt=media&token=de0a9178-21d9-4018-a367-281cc620d990",
         GetWays: "完成任務「榮耀」",
         Description: "當玩家第一次進入獎章頁面的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "閱讀者",
         MedalNo: "010",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E9%96%B1%E8%AE%80%E8%80%85.png?alt=media&token=b2b8b973-5beb-4375-a957-4d39572dc841",
         GetWays: "完成任務「指引!?」",
         Description: "當玩家第一次進入提示頁面的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "賞金獵人",
         MedalNo: "011",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B3%9E%E9%87%91%E7%8D%B5%E4%BA%BA.png?alt=media&token=2c264b07-41aa-4c1d-b5c6-cbc7181b09c1",
         GetWays: "完成任務「狩獵開始」",
         Description: "當玩家第一次進入任務頁面的證明"
       })
       this.fdb.list("/MedalList").push({
         MedalName: "成群結隊",
         MedalNo: "012",
         MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%88%90%E7%BE%A4%E7%B5%90%E9%9A%8A.png?alt=media&token=cdf1937b-78e1-463c-83d4-423bea9aca7f",
         GetWays: "完成任務「人海戰術」",
         Description: "當玩家第一次與其他玩家組隊的證明"
       })
   */

    this.fdb.list("/MedalList").push({
      MedalName: "英雄",
      MedalNo: "013",
      MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%8B%B1%E9%9B%84.png?alt=media&token=1b12231d-d0c1-46b4-974c-257edc6791f1",
      GetWays: "完成任務「懲凶緝惡」",
      Description: "玩家找出正確兇手的證明"
    })
    //-----------------------------------------------------------------

    /*
        this.fdb.list("/MissionList").push({
          MissionNo: "001",
          MissionName: "初次踏入",
          MissionDetail: "首次登入系統，不限任何登入方式",
          MissionRewardPoint: 20,
          MissionRewardMedal: "小偵探",
          MissionRewardExp: 100,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "002",
          MissionName: "查看搜查證",
          MissionDetail: "首次觀看個人資料",
          MissionRewardPoint: 20,
          MissionRewardMedal: "搜查證明",
          MissionRewardExp: 200,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "003",
          MissionName: "同業攀談",
          MissionDetail: "首次進入聊天室",
          MissionRewardPoint: 50,
          MissionRewardMedal: "開始交流",
          MissionRewardExp: 300,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "004",
          MissionName: "首次偵查線索",
          MissionDetail: "首次進入偵查頁面",
          MissionRewardPoint: 40,
          MissionRewardMedal: "起步偵查",
          MissionRewardExp: 300,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "005",
          MissionName: "同業競爭",
          MissionDetail: "首次觀看排行榜",
          MissionRewardPoint: 30,
          MissionRewardMedal: "勁敵",
          MissionRewardExp: 250,
        })
    
    
        this.fdb.list("/MissionList").push({
          MissionNo: "006",
          MissionName: "出外靠朋友",
          MissionDetail: "首次結交朋友",
          MissionRewardPoint: 50,
          MissionRewardMedal: "我不是邊緣人",
          MissionRewardExp: 250,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "007",
          MissionName: "實力的證明",
          MissionDetail: "第一次找到線索",
          MissionRewardPoint: 50,
          MissionRewardMedal: "接近犯人的第一步",
          MissionRewardExp: 400,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "008",
          MissionName: "現場搜查",
          MissionDetail: "首次接受謎題挑戰",
          MissionRewardPoint: 50,
          MissionRewardMedal: "上工!",
          MissionRewardExp: 250,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "009",
          MissionName: "榮耀",
          MissionDetail: "首次進入獎章頁面",
          MissionRewardPoint: 50,
          MissionRewardMedal: "蒐藏家",
          MissionRewardExp: 250,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "010",
          MissionName: "指引!?",
          MissionDetail: "首次進入提示頁面",
          MissionRewardPoint: 50,
          MissionRewardMedal: "閱讀者",
          MissionRewardExp: 250,
        })
    
        this.fdb.list("/MissionList").push({
          MissionNo: "011",
          MissionName: "狩獵開始",
          MissionDetail: "首次進入任務頁面",
          MissionRewardPoint: 50,
          MissionRewardMedal: "賞金獵人",
          MissionRewardExp: 250,
        })
    
    
        this.fdb.list("/MissionList").push({
          MissionNo: "012",
          MissionName: "出外靠朋友",
          MissionDetail: "首次結交朋友",
          MissionRewardPoint: 50,
          MissionRewardMedal: "蒐藏家",
          MissionRewardExp: 250,
        })
    */

    this.fdb.list("/MissionList").push({
      MissionNo: "013",
      MissionName: "懲凶緝惡",
      MissionDetail: "玩家找出正確凶手",
      MissionRewardPoint: 300,
      MissionRewardMedal: "英雄",
      MissionRewardExp: 500,
    })
  }

}
