import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Content, Events, AlertController, Platform } from 'ionic-angular';
import { GroupsProvider } from '../../../providers/groups/groups';

import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { UserProvider } from '../../../providers/user/user';
import { TeamInfoPage } from '../team-info/team-info';
import { TeamMemberPage } from '../team-member/team-member';
import { AddTeammemberPage } from '../add-teammember/add-teammember';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the TeamChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-team-chat',
  templateUrl: 'team-chat.html',
})
export class TeamChatPage {
  @ViewChild('content') content: Content;

  groupmembers;
  owner: boolean = false;
  groupName;
  newmessage: string;
  notice;
  allgroupmsgs;
  alignuid;
  photoURL;
  imgornot;
  lat: number;
  lon: number;
  geo: string;

  UserList = [];
  update_index: number;

  isGetData: boolean = false;

  WayToLogin = {} as WayToLoginModel;
  whoAmI = [];
  downloadURL: string;
  imageData: string;
  isChanagePic: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsProvider,
    public actionSheet: ActionSheetController, public events: Events, public loadingCtrl: LoadingController,
    private geolocation: Geolocation, public platform: Platform, private storage: Storage, public userservice: UserProvider, private camera: Camera, private fdb: AngularFireDatabase, public alertCtrl: AlertController) {

    this.notice = "我已經發送了一個消息，可以到偵查頁面看看。"

    // this.init();
    this.ToFindMe();
    this.loadData_part1();

    this.alignuid = firebase.auth().currentUser.uid;
    // this.photoURL;
    this.groupName = this.navParams.get('groupName');


    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.owner = true;
    }).catch((err) => {
      alert(err);
    })


    this.events.subscribe('newgroupmsg', () => {
      this.allgroupmsgs = [];
      this.imgornot = [];
      this.allgroupmsgs = this.groupservice.groupmsgs;

      for (var key in this.allgroupmsgs) {
        var d = new Date(this.allgroupmsgs[key].timestamp);
        var hours = d.getHours();
        var minutes = "0" + d.getMinutes();
        var month = d.getMonth();
        var da = d.getDate();

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);

        this.allgroupmsgs[key].timestamp = formattedTime;
        if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
          this.imgornot.push(true);
        }
        else {
          this.imgornot.push(false);
        }
      }
      this.scrollto();
    })
  }

  ionViewDidLoad() {

    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.groupmembers = this.groupservice.currentgroup;
      else {
        this.groupservice.getgroupmembers();
      }
    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.groupservice.currentgroup;

    })

  }

  init() {
    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.groupmembers = this.groupservice.currentgroup;
      else {
        this.groupservice.getgroupmembers();
      }
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotmembers');
  }


  //找到自己
  ToFindMe() {

    this.storage.get('Way').then((val) => {
      return new Promise((resolve) => {
        if (val) {
          //   alert(JSON.stringify(val));
          this.WayToLogin = val;
          resolve(val);

        }
      }).then(resolve => {

        this.userservice.whoAmI(this.WayToLogin.WhichWay, this.WayToLogin.UserUID).then((resolve: any) => {

          this.whoAmI = resolve;
          //   alert(JSON.stringify(this.whoAmI[0].UserPhotoURL));
        });
      }).then(() => {
        //   this.groupservice.getTeamMes(this.whoAmI[0].Uid, this.groupName);

        this.groupservice.getgroupmsgs(this.groupName);
      })
    });
  }

  //隊長選單
  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: '隊伍選單',
      buttons: [
        {
          text: '新增隊員',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(AddTeammemberPage);
          }
        },
        {
          text: '踢出隊員',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push(TeamMemberPage);
          }
        },
        {
          text: '隊伍資訊',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(TeamInfoPage, { groupName: this.groupName });
          }
        },
        {
          text: '解散隊伍',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: '取消',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  //隊員選單
  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: '隊伍選單',
      buttons: [
        {
          text: '離開隊伍',
          icon: 'log-out',
          handler: () => {
            this.groupservice.leavegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: '取消',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }


  makeNotice() {
    this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.notice).then(() => {
      this.scrollto();
      //   this.newmessage = '';
    })
  }

  //新增聊天室訊息
  addgroupmsg() {
    this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.newmessage).then(() => {
      this.scrollto();
      this.newmessage = '';
    })
  }

  //一秒自動捲到最下面
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  //get圖片照片來源
  getPicture(sourceType) {

    //  alert('getPicture');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 800,
      targetHeight: 800,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      //  alert('~?');
      this.isChanagePic = true;
      this.imageData = 'data:image/jpeg;base64,' + imageData;
    }).then(resolve => {
      this.upload();
    })
  }

  //上傳圖片照片
  upload() {
    //  alert('upload');
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child('chatroom/' + filename + '.jpg');

    var uploadTask = imageRef.putString(this.imageData, firebase.storage.StringFormat.DATA_URL);

    uploadTask.then((snapshot: any) => {
      this.downloadURL = uploadTask.snapshot.downloadURL;

      this.downloadURL = uploadTask.snapshot.downloadURL;
      this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.downloadURL).then(() => {
        this.scrollto();

      })
      //    this.showSuccesfulUploadAlert();
      //this.add();
    }).catch(error => alert("upload error"));

  }

  //-------------------------------------------------

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
      //  this.loadData_part4();
    })
  }

  //抓座標位置
  sendgeo() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;

      this.share();


    }, (err) => {
      console.log(err);
    })
  }

  //送出座標位置
  share() {
    this.init();
    let alert2 = this.alertCtrl.create({
      title: '與隊友分享資訊以及位置',
      inputs: [{
        name: 'teammessage',
        placeholder: '請輸入您提醒隊友的事情'
      }],
      buttons: [{
        text: '取消',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: '確定',
        handler: data => {

          this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
            type: "Friend",
            lat: this.lat,
            lon: this.lon,
            representative: 3,
            isDone: false,
            content: data.teammessage
          }).then(() => {
            //   alert(JSON.stringify(this.groupmembers.length));
            for (var i = 0; i < this.groupmembers.length; i++) {
              this.fdb.list("/map/" + this.groupmembers[i].Uid).push({
                type: "Friend",
                lat: this.lat,
                lon: this.lon,
                representative: 3,
                isDone: false,
                content: data.teammessage
              })
            }

            this.makeNotice();
            alert('訊息已送出');

          })
        }
      }
      ]
    });
    alert2.present();

  }


}
