import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, LoadingController } from 'ionic-angular';
import { ChatProvider } from '../../../providers/chat/chat';

import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

import { WayToLoginModel } from "../../../models/WayToLogin-models";

import { Storage } from '@ionic/storage';

import { UserProvider } from '../../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the PersonalChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal-chat',
  templateUrl: 'personal-chat.html',
})
export class PersonalChatPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot;
  lat: number;
  lon: number;
  geo: string;
  WayToLogin = {} as WayToLoginModel;
  whoAmI = [];

  downloadURL: string;
  imageData: string;
  isChanagePic: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,
    public events: Events, public zone: NgZone, public loadingCtrl: LoadingController,
    private geolocation: Geolocation, private storage: Storage, public userservice: UserProvider, private camera: Camera) {


    this.ToFindMe();

    this.buddy = this.chatservice.buddy;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.imgornot = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
        for (var key in this.allmessages) {
          if (this.allmessages[key].message.substring(0, 4) == 'http')
            this.imgornot.push(true);
          else
            this.imgornot.push(false);
        }
      })
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PersonalChatPage');
  }

  ToFindMe() {

    this.storage.get('Way').then((val) => {
      return new Promise((resolve) => {
        if (val) {
          this.WayToLogin = val;
          resolve(val);
        }
      }).then(resolve => {

        this.userservice.whoAmI(this.WayToLogin.WhichWay, this.WayToLogin.UserUID).then((resolve: any) => {

          this.whoAmI = resolve;
          //   alert(JSON.stringify(this.whoAmI[0].UserPhotoURL));
        });
      })
    });
  }


  //新增聊天訊息
  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  //一秒自動捲到最下面
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  //get圖片照片來源
  getPicture(sourceType) {
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

      this.chatservice.addnewmessage(this.downloadURL).then(() => {
        this.scrollto();

      })
    }).catch(error => alert("upload error"));

  }

  //送出座標位置
  sendgeo() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.geo = this.lat + "," + this.lon;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      data.coords.latitude
      data.coords.longitude
    });
    const subscription = this.geolocation.watchPosition()
      //.filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        console.log(position.coords.longitude + ' ' + position.coords.latitude);
      });

    // To stop notifications
    subscription.unsubscribe();
    this.chatservice.addnewmessage(this.geo).then(() => {
      this.content.scrollToBottom();
      //this.newmessage = this.geo;
    })

  }
}
