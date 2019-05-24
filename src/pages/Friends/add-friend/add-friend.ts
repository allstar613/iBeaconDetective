import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { RequestsProvider } from '../../../providers/requests/requests';
import { connreq } from '../../../models/interfaces/request';
import firebase from 'firebase';
/**
 * Generated class for the AddFriendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {
  newrequest = {} as connreq;
  friend: boolean;
  request: boolean;
  User_Email = [];
  User_FB = [];
  AllUsers = [];
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider) {
    this.userservice.getallusers_Email().then((res: any) => {
      this.User_Email = res;
    }).then(() => {
      this.userservice.getallusers_FB().then((res: any) => {
        this.User_FB = res;
      })
    }).then(() => {
      this.AllUsers = this.User_FB;
      for (var i = 0; i < this.User_Email.length; i++) {
        this.AllUsers.push(this.User_Email[i]);
      }
    })
    this.friend = false;
    this.request = false;
  }

  //搜尋好友
  searchuser(searchbar) {
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.AllUsers = this.AllUsers.filter((v) => {
      if (v.UserName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  //發送邀請
  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.Uid;
    this.friend = false;
    this.request = false;

    if (this.newrequest.sender === this.newrequest.recipient) {
      alert('自己永遠是自己的好友');
    } else {
      var myrequests = [];
      this.firereq.child(this.newrequest.recipient).on('value', (snapshot) => {
        let allmyrequests = snapshot.val();
        for (var i in allmyrequests) {
          myrequests.push(allmyrequests[i].sender);
          if (this.newrequest.sender == allmyrequests[i].sender) {
            alert('你已發送邀請');
            this.request = true;
            break;
          }
        }
      })
      let friendsuid = [];
      this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        let allfriends = snapshot.val();
        for (var i in allfriends) {
          friendsuid.push(allfriends[i].Uid);
          if (this.newrequest.recipient == allfriends[i].Uid) {
            alert('該玩家已經是您的好友');
            this.friend = true;
            break;
          }
        }
      })

      if (this.friend == false && this.request == false) {
        let successalert = this.alertCtrl.create({
          title: '送出邀請',
          subTitle: '已經好友邀請送至 ' + recipient.UserName,
          buttons: ['確認']
        });
        this.requestservice.sendrequest(this.newrequest).then((res: any) => {
          if (res.success) {
            successalert.present();
            let sentuser = this.AllUsers.indexOf(recipient);
            this.AllUsers.splice(sentuser, 1);
          }

        }).catch((err) => {
          alert(err);
        })
      }

    }
  }
}