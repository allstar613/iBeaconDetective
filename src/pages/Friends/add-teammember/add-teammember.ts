import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../../providers/requests/requests';
import { GroupsProvider } from '../../../providers/groups/groups';

import { AngularFireDatabase } from 'angularfire2/database';
import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddTeammemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-teammember',
  templateUrl: 'add-teammember.html',
})
export class AddTeammemberPage {
  myfriends = [];
  groupmembers = [];
  searchstring;
  tempmyfriends = [];
  newbuddy;

  UserList = [];
  update_index: number;

  isGetData: boolean = false;

  WayToLogin = {} as WayToLoginModel;


  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
    public events: Events, public groupservice: GroupsProvider, private storage: Storage, private fdb: AngularFireDatabase, ) {
    this.loadData_part1();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddTeammemberPage');

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

    for (var i = 0; i < this.UserList.length; i++) {
      if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {

        this.update_index = i;
        this.isGetData = true;
      }
    }
    /*
          if (this.isGetData) {
            resolve("GET")
          }
        }).then(resolve => {
      //    alert('ok')
          /*   this.requestservice.getmyfriends();
             this.events.subscribe('gotintogroup', () => {
               this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.Uid), 1);
               this.tempmyfriends = this.myfriends;
             })
             this.events.subscribe('friends', () => {
         
               this.myfriends = [];
               this.myfriends = this.requestservice.myfriends;
               this.groupmembers = this.groupservice.currentgroup;
               for (var key in this.groupmembers)
                 for (var friend in this.myfriends) {
                   if (this.groupmembers[key].Uid === this.myfriends[friend].Uid)
                     this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
                 }
               this.tempmyfriends = this.myfriends;
             })*/
    //  })
  }


  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.Uid), 1);
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {

      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.groupmembers = this.groupservice.currentgroup;
      for (var key in this.groupmembers)
        for (var friend in this.myfriends) {
          if (this.groupmembers[key].Uid === this.myfriends[friend].Uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
        }
      this.tempmyfriends = this.myfriends;
    })
  }

  //搜尋自己的好友
  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;
    var q = searchbar.target.value;
    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }

    tempfriends = tempfriends.filter((v) => {
      if (v.UserName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

    this.myfriends = tempfriends;

  }

  //新增隊友
  addbuddy(buddy) {
    this.newbuddy = buddy;
    this.groupservice.addmember(buddy, this.UserList[this.update_index]);
  }

}
