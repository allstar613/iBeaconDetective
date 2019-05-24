import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { IBeaconProvider } from '../../../providers/i-beacon/i-beacon';
import { BeaconModel } from '../../../models/beacon-model';
import { IBeacon } from '@ionic-native/ibeacon';


import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChangeDetectorRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { QuizPage } from '../quiz/quiz';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

declare var google;

import { NativeAudio } from '@ionic-native/native-audio';

@IonicPage()
@Component({
  selector: 'page-ibeacon-hunting',
  templateUrl: 'ibeacon-hunting.html',
})
export class IbeaconHuntingPage {


  viewMode: any;

  //UserData
  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];
  markerList = [];

  update_index: number;

  isGetData: boolean = false;

  QT: any;
  QI: any;
  QM: any;

  Get_T: boolean;
  Get_I: boolean;
  Get_M: boolean;

  DefineIbeacon: number;

  //map宣告
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  lat: number;
  lon: number;

  where: any;
  /**
   * 
   * 以下是Beacon的宣告 
   */
  beacons: BeaconModel[] = [];
  zone: any;
  selectedBeacon: BeaconModel;
  status: string = "Scanning...";

  //任務清單
  MissionList = [];

  constructor(public navCtrl: NavController, private geo: Geolocation, public platform: Platform, public beaconProvider: IBeaconProvider, public events: Events, public alertCtrl: AlertController, private changeref: ChangeDetectorRef, private localNotifications: LocalNotifications, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController, private nativeAudio: NativeAudio, private ibeacon: IBeacon, public loadingCtrl: LoadingController) {

    this.isGetData = false;
    this.Get_I = false;
    this.Get_M = false;
    this.Get_T = false;

    //Beacon
    // required for UI update
    this.zone = new NgZone({ enableLongStackTrace: false });

    //Notification
    this.platform.ready().then((readySource) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });

    if (this.platform.is('cordova')) {
      this.ibeacon.enableBluetooth();

      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0);
      nativeAudio.preloadComplex('ibeacon', 'assets/audio/bgm_ibeacon.mp3', 1, 1, 0).then(this.onSuccessPreloading);
      nativeAudio.preloadComplex('discover', 'assets/audio/quiz_discover.mp3', 1, 1, 0);

    }

  }

  //畫面讀取的Loading
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content:

        `
      連接中...請稍候..
      <div #map id="map"></div>`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

  //當進入這個頁面的時候，開始偵測
  ionViewWillEnter() {
    this.startScan();

  }

  //離開頁面的時候，停止偵測
  //並取消iBeacon訊號刷新的事件
  ionViewDidLeave() {
    this.beaconProvider.stopScan();
    this.events.unsubscribe('didRangeBeaconsInRegion');

  }

  //當進入此頁面
  ionViewDidLoad() {

    this.presentLoadingCustom();

    //創建一個Alert訊息，並等待
    this.Quizinit_T();
    this.Quizinit_I();
    this.Quizinit_M();

    //進行一系列的資料撈取
    this.loadData_part1();

    //重複刷新頁面，以實時新增經驗值
    setInterval(() => {

      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;

      }
      this.changeref.markForCheck();
    }, 1000);
  }

  //背景音樂
  onSuccessPreloading = (data) => {
    this.nativeAudio.unload('information');
    this.nativeAudio.loop('ibeacon');
    //   this.nativeAudio.play('track1');
  }

  //離開時，切換音樂
  ngOnDestroy() {
    this.nativeAudio.unload('ibeacon');
    this.nativeAudio.loop('information');
    this.map = null;
  }


  //Notification 涵式
  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: '訊息通知',
      text: '已將可疑的場景封鎖，等候您來搜查',
      data: { mydata: '歡迎回來' },
      at: new Date(new Date().getTime() + 1 * 1000)
    });
  }

  //Go to Quiz
  showQuiz() {
    this.navCtrl.push(QuizPage);
  }


  Quizinit_T() {

    this.QT = this.alertCtrl.create({
      title: '挑戰邀請',
      message: '已經在工學院發現可疑的場景，請問是否要仔細調查 ?',
      buttons: [
        {
          text: '晚ㄧ點在處理',
          handler: () => {
            this.startScan();
            this.Quizinit_T();
            //  this.listenToBeaconEvents();
          }
        },
        {
          text: '當然!',
          handler: () => {

            this.UpdateData_FirstGetQuiz();
            this.Quizinit_T();
            this.navCtrl.push(QuizPage, this.DefineIbeacon);
          }
        }
      ]
    });
  }

  Quizinit_I() {

    this.QI = this.alertCtrl.create({
      title: '挑戰邀請',
      message: '已經在機械大樓發現可疑的場景，請問是否要仔細調查 ?',
      buttons: [
        {
          text: '晚ㄧ點在處理',
          handler: () => {
            this.startScan();
            this.Quizinit_I();
            //  this.listenToBeaconEvents();
          }
        },
        {
          text: '當然!',
          handler: () => {
            this.UpdateData_FirstGetQuiz();
            this.Quizinit_I();
            this.navCtrl.push(QuizPage, this.DefineIbeacon);
          }
        }
      ]
    });
  }

  Quizinit_M() {

    this.QM = this.alertCtrl.create({
      title: '挑戰邀請',
      message: '已經在管理學院發現可疑的場景，請問是否要仔細調查 ?',
      buttons: [
        {
          text: '晚ㄧ點在處理',
          handler: () => {
            this.startScan();
            this.Quizinit_M();
            //  this.listenToBeaconEvents();
          }
        },
        {
          text: '當然!',
          handler: () => {
            this.UpdateData_FirstGetQuiz();
            this.Quizinit_M();
            this.navCtrl.push(QuizPage, this.DefineIbeacon);
          }
        }
      ]
    });
  }

  //判斷iBeacon位置，並做出相對應的事件
  AskforQuiz() {

    if (this.DefineIbeacon == 64309 && !this.UserList[this.update_index].Quiz_T) {
      //機械
      this.nativeAudio.play('discover');
      this.QT.present();
      this.scheduleNotification();
    } else if (this.DefineIbeacon == 9691 && !this.UserList[this.update_index].Quiz_I) {
      //工學
      this.nativeAudio.play('discover');
      this.QI.present();
      this.scheduleNotification();
    } else if (this.DefineIbeacon == 12843 && !this.UserList[this.update_index].Quiz_M) {
      //管院
      this.nativeAudio.play('discover');
      this.QM.present();
      this.scheduleNotification();
    }

  }

  //map涵式
  //初始化map
  initMap() {

    this.geo.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      //設定座標
      let latLng = new google.maps.LatLng(this.lat, this.lon);

      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.makeMarker();
      //  this.addMarker();

    }, (err) => {
      console.log(err);
    });
  }

  //新增地圖標記
  makeMarker() {

    for (var i = 0; i < this.markerList.length; i++) {
      this.lat = this.markerList[i].lat;
      this.lon = this.markerList[i].lon;

      this.addMarker(this.lat, this.lon, this.markerList[i].type, this.markerList[i].representative, this.markerList[i].content);
    }
  }

  //新增地圖標記
  addMarker(lat, lon, type, representative, contents) {

    //為不同回饋，設計標記樣式
    var image_friend = {
      url: "assets/map/beachflag.png",
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var image_done = {
      url: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/map-ok.png?alt=media&token=a29b1a03-2212-4b6b-b4b9-8d6c198a3380",
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    //標記分成 系統提供以及朋友提供兩種
    if (type == "System") {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: google.maps.SymbolPath.CIRCLE,
        position: { lat: lat, lng: lon }
      });

      let content = contents;

      this.addInfoWindow(marker, content, representative);


    } else if (type == "Friend") {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: image_friend,

        position: { lat: lat, lng: lon }
      });

      let content = contents;

      this.addInfoWindow(marker, content, representative);

    }

  }

  //地圖標記的觸發事件
  addInfoWindow(marker, content, representative) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {

      infoWindow.open(this.map, marker);
    });

  }


  //iBeacon涵式
  startScan() {

    this.platform.ready().then(() => {
      this.beaconProvider.startScan().then((isInitialised) => {
        if (isInitialised) {
          this.listenToBeaconEvents();
        }
        else this.status = "problem in start scan";
      });
    });

  }

  stopScan() {

    this.platform.ready().then(() => {

      this.beaconProvider.stopScan();
      this.AskforQuiz();

    });

  }

  //監聽iBeacon
  listenToBeaconEvents() {

    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
      // update the UI with the beacon list  
      this.zone.run(() => {
        this.beacons = [];
        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {
          //    alert("listenToBeaconEvents");
          let beaconObject = new BeaconModel(beacon);
          this.beacons.push(beaconObject);
          this.DefineIbeacon = this.beacons[0].major;
          //    this.AskforQuiz();
          this.stopScan();
        });
      });
    });
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
    let promose = new Promise((resolve) => {
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
      this.Get_I = this.UserList[this.update_index].Quiz_I;
      this.Get_M = this.UserList[this.update_index].Quiz_M;
      this.Get_T = this.UserList[this.update_index].Quiz_T;
      this.loadData_part4();
    })
  }

  loadData_part4() {

    this.fdb.list("/map/" + this.UserList[this.update_index].Uid).subscribe(data => {
      return new Promise((resolve) => {
        if (data) {
          this.markerList = data;
          resolve(data);
        }
      }).then(resolve => {
        this.UpdateData_FirstViewPage();
        this.initMap();
      })
    });
  }

  //第一次進入偵查頁面任務判斷
  UpdateData_FirstViewPage() {
    //   alert(JSON.stringify("UpdateData"));

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_004) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_004: true,
          Mission_004: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 40,
          UserExp: this.UserList[this.update_index].UserExp + 30,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 30) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：首次偵查線索`,
            duration: 3000
          }).present();
        }
      }
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_004) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_004: true,
          Mission_004: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 40,
          UserExp: this.UserList[this.update_index].UserExp + 30,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 30) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：首次偵查線索`,
            duration: 3000
          }).present();
        }
      }
    }
  }

  UpdateData_FirstGetQuiz() {
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
            message: `完成任務：現場搜查`,
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
            message: `完成任務：現場搜查`,
            duration: 3000
          }).present();
        }
      }
    }
  }

}
