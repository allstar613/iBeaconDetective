import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EmailModel } from "../../../models/email-models"
import { WayToLoginModel } from "../../../models/WayToLogin-models"

import { EmailRegisterPage } from '../email-register/email-register';
import { AngularFireAuth } from 'angularfire2/auth'
import { UesrInformationPage } from '../../SearchCard/uesr-information/uesr-information';

import { AngularFireDatabase } from 'angularfire2/database';

import { Storage } from '@ionic/storage';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-email-login',
  templateUrl: 'email-login.html',
})
export class EmailLoginPage {

  user_email = {} as EmailModel;
  WayToLogin = {} as WayToLoginModel;

  isLogin: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private storage: Storage, private toast: ToastController) {
    this.user_email.UserEmail = "";
    this.user_email.UserPassword = "";

    this.isLogin = false;

  }

  email_login(user_email: EmailModel) {

    firebase.auth().signInWithEmailAndPassword(user_email.UserEmail, user_email.UserPassword).then(() => {
      this.WayToLogin = {
        UserUID: this.user_email.UserEmail,
        WhichWay: "Email",
      };

      this.storage.remove('Way').then(() => {
        this.storage.set('Way', this.WayToLogin).then(() => {
          this.navCtrl.setRoot(UesrInformationPage);
        });
      });
    }).catch(function (error) {
      alert("帳號/密碼錯誤喔");
    });
  }

  ToRegister() {
    this.navCtrl.push(EmailRegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailLoginPage');
  }

}
