import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatProvider {
  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any;
  buddymessages = [];

  constructor(public events: Events) {

  }

  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  //新增雙方聊天訊息
  addnewmessage(msg) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.Uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy.Uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
          })
        })
      })
      return promise;
    }
  }

  //從資料庫抓聊天資料
  getbuddymessages() {

    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.Uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
