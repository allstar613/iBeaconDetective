import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata_Email = firebase.database().ref('/Accounts_Email');
  firedata_FB = firebase.database().ref('/Accounts_FB');
  constructor(public afireauth: AngularFireAuth) {

  }

  //抓Email登入使用者詳細資料
  getuserdetails_Email() {
    var promise = new Promise((resolve, reject) => {
      this.firedata_Email.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //抓Email登入使用者
  getallusers_Email() {
    var promise = new Promise((resolve, reject) => {
      this.firedata_Email.orderByChild('Uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //抓FB登入使用者
  getallusers_FB() {
    var promise = new Promise((resolve, reject) => {
      this.firedata_FB.orderByChild('Uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  //判斷自己是誰
  whoAmI(way, ID) {
    var promise = new Promise((resolve, reject) => {
      //  alert(JSON.stringify(way));

      if (way == "Email") {

        this.firedata_Email.orderByChild('Uid').once('value', (snapshot) => {
          let userdata = snapshot.val();


          let temparr = [];
          for (var key in userdata) {
            if (ID == userdata[key].UserUid) {
              temparr.push(userdata[key]);
            }
            //   
          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })

      } else if (way == "FB") {
        /*     this.firedata_FB.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
               resolve(snapshot.val());
             }).catch((err) => {
               reject(err);
             })
     
     */
        this.firedata_FB.orderByChild('Uid').once('value', (snapshot) => {
          let userdata = snapshot.val();


          let temparr = [];
          for (var key in userdata) {
            if (ID == userdata[key].UserUid) {
              temparr.push(userdata[key]);
            }
            //   
          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })

      }
    })
    return promise;
  }

}
