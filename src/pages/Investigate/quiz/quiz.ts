import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';

import { DataProvider } from '../../../providers/data/data';

import { ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the QuizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {



  lat: number;
  lon: number;

  rand: number;
  //-----------------

  music: any;

  representative: number;

  //UserData
  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];

  update_index: number;

  isGetData: boolean;

  viewMode: string;

  //Tip
  Tips = [];

  /**
 * 以下是Quiz的宣告
 */
  @ViewChild('slides') slides: any;

  Quizs = [];

  hasAnswered: boolean = false;

  slideOptions: any;
  questions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider, private changeref: ChangeDetectorRef, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController, private nativeAudio: NativeAudio, private platform: Platform) {

    //抓取上個頁面傳入的資料
    this.representative = this.navParams.data;

    this.isGetData = false;

    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('wrong', 'assets/audio/quiz_false.mp3', 1, 1, 0);
      nativeAudio.preloadComplex('right', 'assets/audio/quiz_right.mp3', 1, 1, 0);
    }

    //Quiz
    this.slideOptions = {
      onlyExternal: false
    };
  }

  ionViewDidLoad() {

    //撈取資料
    this.loadData_part1();

    //實時更新經驗值
    setInterval(() => {


      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;

      }

      if (this.slides.isEnd) {
        this.UpdateData_FirstOver();
      }

      this.changeref.markForCheck();
    }, 1000);

    //以下依照傳入的資料 載入問題
    //Quiz
    //機械
    if (this.representative == 64309) {
      this.dataService.load_T().then((data) => {
        //    alert(JSON.stringify(data));

        data.map((question) => {

          let originalOrder = question.answers;
          question.answers = this.randomizeAnswers(originalOrder);
          return question;;

        });

        this.questions = data;

      }).then(() => {
        this.slides.lockSwipes(true);
      });
    } else if (this.representative == 9691) {
      //工學
      this.dataService.load_I().then((data) => {

        data.map((question) => {
          //    alert(JSON.stringify(data));
          let originalOrder = question.answers;
          question.answers = this.randomizeAnswers(originalOrder);
          return question;;

        });

        this.questions = data;


      }).then(() => {
        this.slides.lockSwipes(true);
      });
    } else if (this.representative == 12843) {
      //管院
      this.dataService.load_M().then((data) => {
        //    alert(JSON.stringify(data));
        data.map((question) => {

          let originalOrder = question.answers;
          question.answers = this.randomizeAnswers(originalOrder);
          return question;;

        });

        this.questions = data;


      }).then(() => {
        this.slides.lockSwipes(true);
      });
    }


  }


  //Quiz 涵式
  //選擇答案
  selectAnswer(answer, question) {

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;
    this.slides.lockSwipes(false);

    //答對的話切換到達對頁面，不讓使用者手動切換頁面
    //反之亦然
    if (answer.correct) {
      this.nativeAudio.play('right');
      //  this.slides.slideTo(1, 0);
      this.slides.slideNext();
      this.slides.lockSwipes(true);

      if (this.slides.isEnd()) {
        this.clue();
        this.answerOver();
      }
    }
    else {
      this.nativeAudio.play('wrong');
      //  this.slides.slideTo(2, 0);
      this.slides.lockSwipes(true);
    }

    setTimeout(() => {
      this.hasAnswered = false;
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 1500);
  }

  //隨機打亂問題順序
  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;

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

  clue() {

    return new Promise((resolve) => {

      if (!this.UserList[this.update_index].Map_T && !this.UserList[this.update_index].Map_I) {
        this.rand = Math.floor(Math.random() * 2);
        //   alert(this.rand);
        //機械大樓
        if (this.rand == 0) {
          this.lat = 24.06492;
          this.lon = 120.55961;
          resolve("ok");
        } else if (this.rand == 1) {
          //工學院
          this.lat = 24.06597;
          this.lon = 120.55915;
          resolve("ok");
        }
      } else if (this.UserList[this.update_index].Map_T && !this.UserList[this.update_index].Map_I) {
        this.rand = 0;
        this.lat = 24.06492;
        this.lon = 120.55961;
        resolve("ok");
      } else if (!this.UserList[this.update_index].Map_T && this.UserList[this.update_index].Map_I) {
        this.rand = 1;
        this.lat = 24.06597;
        this.lon = 120.55915;
        resolve("ok");
      }
    }).then(resolve => {
      this.newMarker();
    })

  }

  //回答完問題
  //依照登入方式以及偵測到的地點
  //到玩家資料庫中修改玩家進程
  answerOver() {
    if (this.WayToLogin.WhichWay == "Email") {
      //機械
      if (this.representative == 64309) {
        this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {

          Quiz_T: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),

        })

      } else if (this.representative == 9691) {
        //工學
        this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {

          Quiz_I: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        })
      } else if (this.representative == 12843) {
        //管院
        this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {

          Quiz_M: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        })
      }
    } else if (this.WayToLogin.WhichWay == "FB") {
      //機械
      if (this.representative == 64309) {
        this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {

          Quiz_T: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        })

      } else if (this.representative == 9691) {
        //工學
        this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {

          Quiz_I: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        })
      } else if (this.representative == 12843) {
        //管院
        this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {

          Quiz_M: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        })
      }
    }

  }

  //在地圖上資料庫中新增新的標記
  newMarker() {

    if (this.WayToLogin.WhichWay == "Email") {


      if (this.rand == 0) {
        this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
          type: "System",
          lat: this.lat,
          lon: this.lon,
          representative: this.rand,
          isDone: false,
          content: "一進大門右手邊的位置好像特別神秘..."
        });

        this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {

          Map_I: true,

        })
      } else if (this.rand == 1) {

        this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
          type: "System",
          lat: this.lat,
          lon: this.lon,
          representative: this.rand,
          isDone: false,
          content: "有人通報，B1的樓梯附近有一些可疑的人"
        });

        this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {

          Map_T: true,

        })
      }

    }
    else if (this.WayToLogin.WhichWay == "FB") {


      if (this.rand == 0) {

        this.fdb.list("/map/" + this.UserList[this.update_index].UserUid).push({
          type: "System",
          lat: this.lat,
          lon: this.lon,
          representative: this.rand,
          isDone: false,
          content: "一進大門右手邊的位置好像特別神秘..."

        })

        this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {

          Map_I: true,

        })
      } else if (this.rand == 1) {

        this.fdb.list("/map/" + this.UserList[this.update_index].UserUid).push({
          type: "System",
          lat: this.lat,
          lon: this.lon,
          representative: this.rand,
          isDone: false,
          content: "有人通報，B1的樓梯附近有一些可疑的人"

        })

        this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {

          Map_T: true,

        })
      }
    }

  }

  //第一次進入頁面
  UpdateData_firstVivePage() {
    //   alert(JSON.stringify("UpdateData"));

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_008) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_008: true,
          Mission_008: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：現場偵查`,
            duration: 3000
          }).present();
        }
      }
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_008) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_008: true,
          Mission_008: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 25,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：現場偵查`,
            duration: 3000
          }).present();
        }
      }

    }
  }

  //第一次進入偵查頁面任務判斷
  UpdateData_FirstOver() {
    //   alert(JSON.stringify("UpdateData"));

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_007) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_007: true,
          Mission_007: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 40,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 40) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：實力的證明`,
            duration: 3000
          }).present();
        }
      }
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_007) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_007: true,
          Mission_007: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 40,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 40) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：實力的證明`,
            duration: 3000
          }).present();
        }
      }
    }
  }

}
