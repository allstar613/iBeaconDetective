import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, AlertController, Platform } from 'ionic-angular';


import { RequestsProvider } from '../../../providers/requests/requests';
import { ChatProvider } from '../../../providers/chat/chat';

import { ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { AddFriendPage } from '../add-friend/add-friend';

import { PersonalChatPage } from '../personal-chat/personal-chat';
import { GroupsProvider } from '../../../providers/groups/groups';

import { TeamChatPage } from '../team-chat/team-chat';
import { AddTeamPage } from '../add-team/add-team';

import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the ChatroomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

  //UserData
  loadProgress: number;

  WayToLogin = {} as WayToLoginModel;

  UserList = [];


  myrequests = [];
  myfriends = [];
  allmygroups = [];

  update_index: number;

  isGetData: boolean;

  viewMode: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private changeref: ChangeDetectorRef, private fdb: AngularFireDatabase, private storage: Storage, private toast: ToastController, public requestservice: RequestsProvider,
    public events: Events, public alertCtrl: AlertController, public chatservice: ChatProvider, public groupservice: GroupsProvider, public platform: Platform, private nativeAudio: NativeAudio) {


    setInterval(() => {


      if (this.isGetData) {

        this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;

      }

      this.changeref.markForCheck();
    }, 1000);

    if (this.platform.is('cordova')) {
      nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }

  onSuccessPreloading = (data) => {
    this.nativeAudio.loop('information');
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
      //   console.log('Ok');
      this.UpdateData_firstVivePage();
    })

  }

  //第一次進入頁面
  UpdateData_firstVivePage() {
    //   alert(JSON.stringify("UpdateData"));

    if (this.WayToLogin.WhichWay == "Email") {
      if (!this.UserList[this.update_index].Mission_003) {
        const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
          Medal_003: true,
          Mission_003: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 300,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 300) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：同業攀談`,
            duration: 3000
          }).present();
        }
      }
    }
    else if (this.WayToLogin.WhichWay == "FB") {
      if (!this.UserList[this.update_index].Mission_003) {
        const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
          Medal_003: true,
          Mission_003: true,
          UserPoint: this.UserList[this.update_index].UserPoint + 50,
          UserExp: this.UserList[this.update_index].UserExp + 300,
          UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 300) / 200)),
        });
        if (result) {
          this.toast.create({
            message: `完成任務：同業攀談!?`,
            duration: 3000
          }).present();
        }
      }

    }
  }

  //-----
  ionViewWillEnter() {
    this.myfriends = [];

    //
    this.myrequests = [];
    this.allmygroups = [];

    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.groupservice.getmygroups();


    this.events.subscribe('newgroup', () => {
      this.allmygroups = [];
      this.allmygroups = this.groupservice.mygroups;
    })
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }

  reload() {
    this.myfriends = [];
    this.myrequests = [];
    this.allmygroups = [];

    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.groupservice.getmygroups();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('newgroup');
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  //Firend涵式------------------------------------------------
  addbuddy() {
    this.navCtrl.push(AddFriendPage);
  }

  //接受好友邀請
  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: '新增好友',
        subTitle: '點擊您的好友和他聯絡吧!!',
        buttons: [
          {
            text: '確定',
            handler: data => {
              this.reload();
            }
          }
        ]
      });
      newalert.present();
    })
  }

  //拒絕好友邀請
  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {
      this.reload();
    }).catch((err) => {
      alert(err);
    })
  }

  //進入與好友的個人聊天室
  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push(PersonalChatPage);
  }

  //Team涵式--------------------------------------
  //新增隊伍
  addgroup() {
    this.navCtrl.push(AddTeamPage);
  }

  //進入隊伍聊天室
  openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push(TeamChatPage, { groupName: group.groupName });

  }


}
