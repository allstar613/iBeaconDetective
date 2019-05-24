import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupsProvider {
  firegroup = firebase.database().ref('/groups');
  mygroups: Array<any> = [];
  currentgroup: Array<any> = [];
  currentgroupname;
  grouppic;
  groupmsgs;


  constructor(public events: Events, private fdb: AngularFireDatabase) {
  }

  //新增隊伍
  addgroup(newGroup) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child('Groupsname').orderByChild('name').equalTo(newGroup.groupName).once('value', (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        if (somekey) {
          alert("此隊伍名稱已存在，請重新輸入")
        } else {
          this.firegroup.child('Groupsname').push({
            name: newGroup.groupName
          }).then(() => {
            this.firegroup.child(firebase.auth().currentUser.uid).child(newGroup.groupName).set({
              groupimage: newGroup.groupPic,
              msgboard: '',
              owner: firebase.auth().currentUser.uid
            })
          }).then(() => {
            resolve(true);
          }).catch((err) => {
            reject(err);
          })

        }
      })
    });
    return promise;
  }

  //顯示我參加的所有隊伍
  getmygroups() {
    this.firegroup.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      this.mygroups = [];
      if (snapshot.val() != null) {
        var temp = snapshot.val();
        for (var key in temp) {
          var newgroup = {
            groupName: key,
            groupimage: temp[key].groupimage
          }
          this.mygroups.push(newgroup);
        }
      }
      this.events.publish('newgroup');
    })

  }

  //進入隊伍聊天室
  getintogroup(groupname) {
    if (groupname != null) {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        if (snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
    }
  }

  //顯示隊長資訊
  getownership(groupname) {
    var promise = new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
        var temp = snapshot.val().owner;
        if (temp == firebase.auth().currentUser.uid) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //顯示隊伍的圖片
  getgroupimage() {
    return new Promise((resolve, reject) => {
      alert(JSON.stringify("無線電連接中..."));
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        this.grouppic = snapshot.val().groupimage;
        resolve(true);
      })
    })

  }

  //新增隊員
  addmember(newmember, me) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() => {
      this.getgroupimage().then(() => {
        alert(JSON.stringify("隊員已連接!"));

        this.firegroup.child(newmember.Uid).child(this.currentgroupname).set({
          groupimage: this.grouppic,
          owner: firebase.auth().currentUser.uid,
          msgboard: '',
        })

        //     alert(JSON.stringify(me));
        this.firegroup.child(newmember.Uid).child(this.currentgroupname).child('members').push(me);
        this.getintogroup(this.currentgroupname);

      })
    })

  }

  //刪除隊員
  deletemember(member) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname)
      .child('members').orderByChild('Uid').equalTo(member.Uid).once('value', (snapshot) => {
        snapshot.ref.remove().then(() => {
          this.firegroup.child(member.Uid).child(this.currentgroupname).remove().then(() => {
            this.getintogroup(this.currentgroupname);
          })
        })
      })
  }

  //顯示隊伍的成員
  getgroupmembers() {
    this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
      var tempdata = snapshot.val().owner;
      this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempvar = snapshot.val();
        for (var key in tempvar) {
          this.currentgroup.push(tempvar[key]);
        }
      })
    })
    this.events.publish('gotmembers');
  }

  //離開隊伍
  leavegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
        var tempowner = snapshot.val().owner;
        this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('Uid')
          .equalTo(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            snapshot.ref.remove().then(() => {
              this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
                resolve(true);
              }).catch((err) => {
                reject(err);
              })
            }).catch((err) => {
              reject(err);
            })
          })
      })

      /**********
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
        var tempowner = snapshot.val();
        if (tempowner != firebase.auth().currentUser.uid) {
          this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
            sentby: "system",
            message: "123",
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
        }
      })*/
    })

  }

  //刪除隊伍
  deletegroup() {
    return new Promise((resolve, reject) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
        var tempmembers = snapshot.val();

        for (var key in tempmembers) {
          this.firegroup.child(tempmembers[key].Uid).child(this.currentgroupname).remove();
        }

        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {

          this.firegroup.child('Groupsname').orderByChild('name').equalTo(this.currentgroupname).once('value', (snapshot) => {
            let somekey;
            for (var key in snapshot.val())
              somekey = key;
            this.firegroup.child('Groupsname').child(somekey).remove().then(() => {
              resolve(true);
            })
          })

          resolve(true);
        }).catch((err) => {
          reject(err);
        })

      })
    })
  }

  //新增隊伍聊天訊息(每位隊員都會新增)
  addgroupmsg(Name, Photo, newmessage) {
    return new Promise((resolve) => {
      this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
        var tempowner = snapshot.val();
        this.firegroup.child(firebase.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
          sentby: firebase.auth().currentUser.uid,
          UserName: Name,
          UserPhotoURL: Photo,
          message: newmessage,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          if (tempowner != firebase.auth().currentUser.uid) {
            this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
              sentby: firebase.auth().currentUser.uid,
              UserName: Name,
              UserPhotoURL: Photo,
              message: newmessage,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            })
          }
          var tempmembers = [];
          this.firegroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => {
            var tempmembersobj = snapshot.val();
            for (var key in tempmembersobj)
              tempmembers.push(tempmembersobj[key]);
          }).then(() => {
            let postedmsgs = tempmembers.map((item) => {
              if (item.Uid != firebase.auth().currentUser.uid) {
                return new Promise((resolve) => {
                  this.postmsgs(Name, Photo, item, newmessage, resolve);
                })
              }
            })
            Promise.all(postedmsgs).then(() => {
              this.getgroupmsgs(this.currentgroupname);
              resolve(true);
            })
          })
        })
      })
    })
  }

  //上傳聊天訊息到資料庫
  postmsgs(Name, Photo, member, msg, cb) {
    this.firegroup.child(member.Uid).child(this.currentgroupname).child('msgboard').push({
      sentby: firebase.auth().currentUser.uid,
      UserName: Name,
      UserPhotoURL: Photo,
      message: msg,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      cb();
    })
  }

  //從資料庫抓聊天資料
  getgroupmsgs(groupname) {
    this.firegroup.child(firebase.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
      var tempmsgholder = snapshot.val();
      this.groupmsgs = [];
      for (var key in tempmsgholder)
        this.groupmsgs.push(tempmsgholder[key]);
      this.events.publish('newgroupmsg');
    })
  }

}