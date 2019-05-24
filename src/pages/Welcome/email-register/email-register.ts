import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { EmailModel } from "../../../models/email-models"

import { EmailLoginPage } from '../email-login/email-login';

import { AngularFireAuth } from "angularfire2/auth"

import { AngularFireDatabase } from 'angularfire2/database';

import { Camera, CameraOptions } from '@ionic-native/camera';

import firebase from 'firebase';

/**
 * Generated class for the EmailRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-register',
  templateUrl: 'email-register.html',
})
export class EmailRegisterPage {

  imageData: string;

  downloadURL: string;
  @Input('useURI') useURI: Boolean = false;

  isChanagePic: Boolean;

  user_email = {} as EmailModel;

  uid: string;

  rand: number;

  lat: number;
  lon: number;
  born: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afauth: AngularFireAuth, private toast: ToastController, private fdb: AngularFireDatabase, private alertCtrl: AlertController, private camera: Camera) {
    this.imageData = "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%A4%A7%E9%A0%AD%E8%B2%BC%2FNoName.png?alt=media&token=1da275c3-ad1e-4972-a307-b9b8deb2b85c";
    this.downloadURL = "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%A4%A7%E9%A0%AD%E8%B2%BC%2FNoName.png?alt=media&token=1da275c3-ad1e-4972-a307-b9b8deb2b85c";
    this.isChanagePic = false;
  }

  async email_register(user_email: EmailModel) {
    try {
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user_email.UserEmail, user_email.UserPassword);
      if (result) {
        this.uid = result.uid;
        this.clue();
        this.toast.create({
          message: `註冊成功`,
          duration: 1500
        }).present();
        this.navCtrl.pop();
      }
      console.log(result);
    }
    catch (e) {
      console.error(e);
      this.toast.create({
        message: `有重複的帳號或是格式錯誤`,
        duration: 1500
      }).present();
    }

  }

  //新增資料到資料庫
  add() {
    this.fdb.list("/Accounts_Email").push({
      UserUid: this.user_email.UserEmail,
      Uid: this.uid,
      UserName: this.user_email.UserName,
      UserPhotoURL: this.downloadURL,
      UserLv: 1,
      UserPoint: 0,
      UserExp: 0,
      Map_M: true,
      Map_I: false,
      Map_T: false,
      Quiz_M: false,
      Quiz_I: false,
      Quiz_T: false,
      Mission_001: false,
      Mission_002: false,
      Mission_003: false,
      Mission_004: false,
      Mission_005: false,
      Mission_006: false,
      Mission_007: false,
      Mission_008: false,
      Mission_009: false,
      Mission_010: false,
      Mission_011: false,
      Mission_012: false,
      Mission_013: false,
      Medal_001: false,
      Medal_002: false,
      Medal_003: false,
      Medal_004: false,
      Medal_005: false,
      Medal_006: false,
      Medal_007: false,
      Medal_008: false,
      Medal_009: false,
      Medal_010: false,
      Medal_011: false,
      Medal_012: false,
      Medal_013: false,
    })

    this.fdb.list("/map/" + this.uid).push({
      type: "System",
      lat: this.lat,
      lon: this.lon,
      representative: 2,
      isDone: false,
      content: "聽說在310附近有一些線索.."
    })
  }

  clue() {

    return new Promise((resolve) => {

      //   this.rand = Math.floor(Math.random() * 3);
      /*
      //  alert(this.rand);
      //機械大樓
      if (this.rand == 0) {
        this.lat = 24.06492;
        this.lon = 120.55961;
        this.born = "機械大樓";
        resolve("ok");
      } else if (this.rand == 1) {


                //工學院
        this.lat = 24.06597;
        this.lon = 120.55915;
        this.born = "工學院";
        resolve("ok");
      } else {
        //管院
        this.lat = 24.06351;
        this.lon = 120.55918;
        this.born = "管理學院";
        resolve("ok");
      }*/
      this.lat = 24.06351;
      this.lon = 120.55918;
      //  this.born = "管理學院";
      resolve("ok");

    }).then(resolve => {

      if (this.isChanagePic) {
        this.upload();
      } else {
        this.add();
      }
      //   
    })

  }

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
    })
  }


  upload() {
    //  alert('upload');
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child('大頭貼/' + filename + '.jpg');

    var uploadTask = imageRef.putString(this.imageData, firebase.storage.StringFormat.DATA_URL);

    uploadTask.then((snapshot: any) => {
      this.downloadURL = uploadTask.snapshot.downloadURL;
      this.add();
    }).catch(error => alert("upload error"));

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailRegisterPage');
  }

}
