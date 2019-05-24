import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { connreq } from '../../models/interfaces/request';
import { UserProvider } from '../user/user';
import firebase from 'firebase';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');

  userdetails;
  myfriends;

  User_Email = [];
  User_FB = [];
  AllUsers = [];

  constructor(public userservice: UserProvider, public events: Events) {

  }

  //送出邀請
  sendrequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      })
    })
    return promise;
  }

  //顯示出我所有的邀請
  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      //   alert(JSON.stringify(allmyrequests));
      //  myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      //    alert(JSON.stringify(myrequests));

      this.userservice.getallusers_Email().then((res: any) => {
        this.User_Email = res;
        //       alert(JSON.stringify("E"));
        //    this.temparr = res;
      }).then(() => {
        this.userservice.getallusers_FB().then((res: any) => {
          this.User_FB = res;
          //         alert(JSON.stringify("F"));
          //    this.temparr = res;
        })
      }).then(() => {
        //      alert(JSON.stringify("M"));
        let promise = new Promise((resolve) => {
          let count = 0;
          this.AllUsers = this.User_FB;
          for (var i = 0; i < this.User_Email.length; i++) {
            this.AllUsers.push(this.User_Email[i]);
            count++;
          }
          //       alert(JSON.stringify(count));
          //       alert(JSON.stringify(this.User_Email.length));
          if (count == this.User_Email.length) {
            resolve("Ok")
          }
        }).then(resolve => {

          this.userdetails = [];
          for (var j in myrequests)
            for (var key in this.AllUsers) {

              if (myrequests[j] === this.AllUsers[key].Uid) {
                this.userdetails.push(this.AllUsers[key]);
              }
            }

          this.events.publish('gotrequests');
        })
      })

      /*
            this.userservice.getallusers().then((res) => {
              var allusers = res;
              this.userdetails = [];
              for (var j in myrequests)
                for (var key in allusers) {
                  if (myrequests[j] === allusers[key].uid) {
                    this.userdetails.push(allusers[key]);
                  }
                }
              this.events.publish('gotrequests');
            })
      */
    })
  }

  //接受邀請
  acceptrequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.Uid
      }).then(() => {
        this.firefriends.child(buddy.Uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(buddy).then(() => {
            resolve(true);
          })
        })
      })
    })
    return promise;
  }

  //刪除邀請
  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.Uid).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        })
      })
        .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  //顯示我的朋友
  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {

      let allfriends = snapshot.val();

      this.myfriends = [];

      for (var i in allfriends) {
        friendsuid.push(allfriends[i].uid);
      }


      this.userservice.getallusers_Email().then((res: any) => {

        this.User_Email = res;

      }).then(() => {
        this.userservice.getallusers_FB().then((res: any) => {
          this.User_FB = res;
        })
      }).then(() => {
        let promise = new Promise((resolve) => {
          let count = 0;
          this.AllUsers = this.User_FB;
          for (var i = 0; i < this.User_Email.length; i++) {
            this.AllUsers.push(this.User_Email[i]);
            count++;
          }
          if (count == this.User_Email.length) {

            resolve("Ok")
          }
        }).then(resolve => {
          this.myfriends = [];
          for (var j in friendsuid)
            for (var key in this.AllUsers) {
              if (friendsuid[j] === this.AllUsers[key].Uid) {

                this.myfriends.push(this.AllUsers[key]);
              }
            }
          this.events.publish('friends');
        })
      })


      /*
            this.userservice.getallusers().then((users) => {
              this.myfriends = [];
              for (var j in friendsuid)
                for (var key in users) {
                  if (friendsuid[j] === users[key].uid) {
                    this.myfriends.push(users[key]);
                  }
                }
              this.events.publish('friends');
            }).catch((err) => {
              alert(err);
            })
      */
    })
  }

}
