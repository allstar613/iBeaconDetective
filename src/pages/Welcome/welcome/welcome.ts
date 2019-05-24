import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { UesrInformationPage } from '../../SearchCard/uesr-information/uesr-information';
import { EmailLoginPage } from '../email-login/email-login';

import { WayToLoginModel } from "../../../models/WayToLogin-models"

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { Storage } from '@ionic/storage';

import { Slides } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';


@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    music: any;

    WayToLogin = {} as WayToLoginModel;

    CatchData: any;

    UsedUserCheck = [];

    isUsedUser: boolean;

    CountForUser: number;

    index_remember: number;

    rand: number;

    lat: number;
    lon: number;
    born: string;

    //   @ViewChild('slides') slides: any;
    @ViewChild(Slides) slides: Slides;
    constructor(public navCtrl: NavController, private fdb: AngularFireDatabase, private storage: Storage, private platform: Platform, private nativeAudio: NativeAudio) {

        this.loadData();
        this.isUsedUser = false;
        this.CountForUser = 0;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('welcome', 'assets/audio/bgm_welcome.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }

    }


    loginWithFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() => {

            firebase.auth().getRedirectResult().then((result) => {

                return new Promise((resolve) => {
                    if (result) {
                        //    alert(JSON.stringify(result));
                        this.CatchData = result;
                        resolve(result);
                    }
                }).then(resolve => {
                    this.checkUser();
                });

            }).catch(function (error) {
                alert(JSON.stringify(error));
            });

        })
    }


    onSuccessPreloading = (data) => {
        this.nativeAudio.loop('welcome');
        this.nativeAudio.unload('information');
        this.nativeAudio.unload('ibeacon');
        //   this.nativeAudio.play('track1');
    }

    ngOnDestroy() {
        this.nativeAudio.unload('welcome');
    }

    loginWithEmail() {
        this.navCtrl.push(EmailLoginPage);
    }

    loadData() {
        this.fdb.list("/Accounts_FB").subscribe(data => {
            if (data) {
                this.UsedUserCheck = data;
            }
        });
    }

    //檢查是否為老玩家
    checkUser() {

        let promise = new Promise((resolve) => {


            for (var i = 0; i < this.UsedUserCheck.length; i++) {

                if (this.UsedUserCheck[i].UserUid == this.CatchData.user.uid) {

                    this.isUsedUser = true;
                    this.index_remember = i;
                }

                this.CountForUser++;
            }


            if (this.CountForUser == this.UsedUserCheck.length) {
                //    alert(this.isUsedUser);
                //   alert("checkUser OK");
                resolve("Done")
            }
        }).then(resolve => {
            this.clue();
        })


    }

    UpdateData() {
        //如果是老玩家
        if (this.isUsedUser) {
            this.fdb.list("/Accounts_FB").update(this.UsedUserCheck[this.index_remember].$key, {

                UserName: this.CatchData.user.displayName,
                UserUid: this.CatchData.user.uid,
                UserPhotoURL: this.CatchData.user.photoURL,

            }).then(() => {
                this.WayToLogin = {
                    UserUID: this.CatchData.user.uid,
                    WhichWay: "FB",
                };
                this.storage.remove('Way').then(() => {
                    this.storage.set('Way', this.WayToLogin).then(() => {
                        this.navCtrl.setRoot(UesrInformationPage);
                    });
                });
            })

        } else {
            this.fdb.list("/Accounts_FB").push({
                UserName: this.CatchData.user.displayName,
                UserUid: this.CatchData.user.uid,
                Uid: this.CatchData.user.uid,
                UserPhotoURL: this.CatchData.user.photoURL,
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

            }).then(() => {

                this.fdb.list("/map/" + this.CatchData.user.uid).push({
                    type: "System",
                    lat: this.lat,
                    lon: this.lon,
                    representative: 2,
                    isDone: false,
                    content: "聽說在310附近有一些線索.."
                })

                this.WayToLogin = {
                    UserUID: this.CatchData.user.uid,
                    WhichWay: "FB",
                };
                this.storage.remove('Way').then(() => {
                    this.storage.set('Way', this.WayToLogin).then(() => {
                        this.navCtrl.setRoot(UesrInformationPage);
                    });
                });
            })
        }
    }

    skipSlider() {
        this.slides.slideTo(this.slides.length() - 1, 0);
    }

    slideEnd() {
        this.slides.stopAutoplay();
    }

    clue() {

        return new Promise((resolve) => {

            //       this.rand = Math.floor(Math.random() * 3);
            /*      alert(this.rand);
                  //機械大樓
                  if (this.rand == 0) {
                      this.lat = 24.06492;
                      this.lon = 120.55961;
                      this.born = "機械大樓";
                      resolve("ok");
                  } else if (this.rand == 1) {
                      //管院
                      this.lat = 24.06351;
                      this.lon = 120.55918;
                      this.born = "管理學院";
                      resolve("ok");
                  } else {
                      //工學院
                      this.lat = 24.06597;
                      this.lon = 120.55915;
                      this.born = "工學院";
                      resolve("ok");
                  }*/
            this.lat = 24.06351;
            this.lon = 120.55918;
            //  this.born = "管理學院";
            resolve("ok");

        }).then(resolve => {
            this.UpdateData();
        })

    }


}
