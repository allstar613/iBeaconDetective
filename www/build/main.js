webpackJsonp([20],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let ChatProvider = class ChatProvider {
    constructor(events) {
        this.events = events;
        this.firebuddychats = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/buddychats');
        this.buddymessages = [];
    }
    initializebuddy(buddy) {
        this.buddy = buddy;
    }
    //新增雙方聊天訊息
    addnewmessage(msg) {
        if (this.buddy) {
            var promise = new Promise((resolve, reject) => {
                this.firebuddychats.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).child(this.buddy.Uid).push({
                    sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                    message: msg,
                    timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP
                }).then(() => {
                    this.firebuddychats.child(this.buddy.Uid).child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).push({
                        sentby: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid,
                        message: msg,
                        timestamp: __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database.ServerValue.TIMESTAMP
                    }).then(() => {
                        resolve(true);
                    });
                });
            });
            return promise;
        }
    }
    //從資料庫抓聊天資料
    getbuddymessages() {
        let temp;
        this.firebuddychats.child(__WEBPACK_IMPORTED_MODULE_1_firebase___default.a.auth().currentUser.uid).child(this.buddy.Uid).on('value', (snapshot) => {
            this.buddymessages = [];
            temp = snapshot.val();
            for (var tempkey in temp) {
                this.buddymessages.push(temp[tempkey]);
            }
            this.events.publish('newmessage');
        });
    }
};
ChatProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */]])
], ChatProvider);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFriendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AddFriendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let AddFriendPage = class AddFriendPage {
    constructor(navCtrl, navParams, userservice, alertCtrl, requestservice) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.alertCtrl = alertCtrl;
        this.requestservice = requestservice;
        this.newrequest = {};
        this.User_Email = [];
        this.User_FB = [];
        this.AllUsers = [];
        this.firereq = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/requests');
        this.firefriends = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/friends');
        this.userservice.getallusers_Email().then((res) => {
            this.User_Email = res;
        }).then(() => {
            this.userservice.getallusers_FB().then((res) => {
                this.User_FB = res;
            });
        }).then(() => {
            this.AllUsers = this.User_FB;
            for (var i = 0; i < this.User_Email.length; i++) {
                this.AllUsers.push(this.User_Email[i]);
            }
        });
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
        });
    }
    //發送邀請
    sendreq(recipient) {
        this.newrequest.sender = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
        this.newrequest.recipient = recipient.Uid;
        this.friend = false;
        this.request = false;
        if (this.newrequest.sender === this.newrequest.recipient) {
            alert('自己永遠是自己的好友');
        }
        else {
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
            });
            let friendsuid = [];
            this.firefriends.child(__WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid).on('value', (snapshot) => {
                let allfriends = snapshot.val();
                for (var i in allfriends) {
                    friendsuid.push(allfriends[i].Uid);
                    if (this.newrequest.recipient == allfriends[i].Uid) {
                        alert('該玩家已經是您的好友');
                        this.friend = true;
                        break;
                    }
                }
            });
            if (this.friend == false && this.request == false) {
                let successalert = this.alertCtrl.create({
                    title: '送出邀請',
                    subTitle: '已經好友邀請送至 ' + recipient.UserName,
                    buttons: ['確認']
                });
                this.requestservice.sendrequest(this.newrequest).then((res) => {
                    if (res.success) {
                        successalert.present();
                        let sentuser = this.AllUsers.indexOf(recipient);
                        this.AllUsers.splice(sentuser, 1);
                    }
                }).catch((err) => {
                    alert(err);
                });
            }
        }
    }
};
AddFriendPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-add-friend',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-friend\add-friend.html"*/'<!--\n  Generated template for the AddFriendPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>增加朋友</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="searchstring" (input)="searchuser($event)" placeholder="Search"></ion-searchbar>\n  <ion-list no-lines>\n    <ion-list>\n      <ion-item-sliding *ngFor="let key of AllUsers">\n        <ion-item>\n          <ion-avatar item-left>\n            <img src="{{key.UserPhotoURL}}">\n          </ion-avatar>\n          <h2>{{key.UserName}}</h2>\n          <button ion-button color="primary" (click)="sendreq(key)" item-right>\n            <ion-icon name="person-add">新增</ion-icon>\n          </button>\n        </ion-item>\n\n      </ion-item-sliding>\n    </ion-list>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-friend\add-friend.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__["a" /* RequestsProvider */]])
], AddFriendPage);

//# sourceMappingURL=add-friend.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTeamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_imghandler_imghandler__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AddTeamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let AddTeamPage = class AddTeamPage {
    constructor(navCtrl, navParams, alertCtrl, groupservice, imghandler, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.groupservice = groupservice;
        this.imghandler = imghandler;
        this.loadingCtrl = loadingCtrl;
        this.newgroup = {
            groupName: "隊伍名稱",
            groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
        };
    }
    ionViewDidLoad() {
        //console.log('ionViewDidLoad AddTeamPage');
    }
    //選擇圖片
    chooseimage() {
        if (this.newgroup.groupName == "隊伍名稱") {
            let namealert = this.alertCtrl.create({
                buttons: ['okay'],
                message: 'Please enter the groupname first. Thanks'
            });
            namealert.present();
        }
        else {
            let loader = this.loadingCtrl.create({
                content: 'Loading, please wait..'
            });
            loader.present();
            this.imghandler.grouppicstore(this.newgroup.groupName).then((res) => {
                loader.dismiss();
                if (res)
                    this.newgroup.groupPic = res;
            }).catch((err) => {
                alert(err);
            });
        }
    }
    //新增隊伍
    creategroup() {
        this.groupservice.addgroup(this.newgroup).then(() => {
            this.navCtrl.pop();
        }).catch((err) => {
            alert(JSON.stringify(err));
        });
    }
    //編輯隊伍名稱
    editgroupname() {
        let alert = this.alertCtrl.create({
            title: '創建隊伍',
            inputs: [{
                    name: 'groupname',
                    placeholder: '輸入隊伍名稱'
                }],
            buttons: [{
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: '確定',
                    handler: data => {
                        if (data.groupname) {
                            this.newgroup.groupName = data.groupname;
                        }
                        else {
                            this.newgroup.groupName = 'groupName';
                        }
                    }
                }
            ]
        });
        alert.present();
    }
};
AddTeamPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-add-team',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-team\add-team.html"*/'<!--\n  Generated template for the AddTeamPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>創造隊伍</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="profile-image" (click)="editgroupname()">\n    <img src="{{newgroup.groupPic}}">\n  </div>\n  <div>\n    <h2>{{newgroup.groupName}}</h2>\n  </div>\n  <div>\n    點擊圖片來新增隊伍\n  </div>\n  <div class="spacer" style="height: 10px;"></div>\n  <div>\n    <button ion-button round outline (click)="creategroup()">創建</button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-team\add-team.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__["a" /* GroupsProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_imghandler_imghandler__["a" /* ImghandlerProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], AddTeamPage);

//# sourceMappingURL=add-team.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTeammemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_groups_groups__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AddTeammemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let AddTeammemberPage = class AddTeammemberPage {
    constructor(navCtrl, navParams, requestservice, events, groupservice, storage, fdb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requestservice = requestservice;
        this.events = events;
        this.groupservice = groupservice;
        this.storage = storage;
        this.fdb = fdb;
        this.myfriends = [];
        this.groupmembers = [];
        this.tempmyfriends = [];
        this.UserList = [];
        this.isGetData = false;
        this.WayToLogin = {};
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
            });
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
                });
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
                });
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
        });
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
        });
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
        });
        this.myfriends = tempfriends;
    }
    //新增隊友
    addbuddy(buddy) {
        this.newbuddy = buddy;
        this.groupservice.addmember(buddy, this.UserList[this.update_index]);
    }
};
AddTeammemberPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-add-teammember',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-teammember\add-teammember.html"*/'<!--\n  Generated template for the AddTeammemberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>新增隊友</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="searchstring" (input)="searchuser($event)" placeholder="Search">\n  </ion-searchbar>\n  <ion-list no-lines>\n    <ion-item-sliding *ngFor="let key of myfriends">\n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{key.UserPhotoURL}}">\n        </ion-avatar>\n        <h2>{{key.UserName}}</h2>\n        <button ion-button color="primary" (click)="addbuddy(key)" item-right>\n          <ion-icon name="person-add">邀請</ion-icon>\n\n        </button>\n      </ion-item>\n\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\add-teammember\add-teammember.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__["a" /* RequestsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__providers_groups_groups__["a" /* GroupsProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], AddTeammemberPage);

//# sourceMappingURL=add-teammember.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatroomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_friend_add_friend__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__personal_chat_personal_chat__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_groups_groups__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__team_chat_team_chat__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__add_team_add_team__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Generated class for the ChatroomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let ChatroomPage = class ChatroomPage {
    constructor(navCtrl, navParams, changeref, fdb, storage, toast, requestservice, events, alertCtrl, chatservice, groupservice, platform, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.changeref = changeref;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.requestservice = requestservice;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.chatservice = chatservice;
        this.groupservice = groupservice;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UserList = [];
        this.myrequests = [];
        this.myfriends = [];
        this.allmygroups = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
        };
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ChatroomPage');
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
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            //   console.log('Ok');
            this.UpdateData_firstVivePage();
        });
    }
    //第一次進入頁面
    UpdateData_firstVivePage() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_003) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_003: true,
                    Mission_003: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 300,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 300) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：同業攀談`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_003) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_003: true,
                    Mission_003: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 300,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 300) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：同業攀談!?`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
    //-----
    ionViewWillEnter() {
        this.myfriends = [];
        //
        this.myrequests = [];
        this.allmygroups = [];
        this.requestservice.getmyrequests();
        this.requestservice.getmyfriends();
        this.groupservice.getmygroups();
        this.events.subscribe('newgroup', () => {
            this.allmygroups = [];
            this.allmygroups = this.groupservice.mygroups;
        });
        this.events.subscribe('gotrequests', () => {
            this.myrequests = [];
            this.myrequests = this.requestservice.userdetails;
        });
        this.events.subscribe('friends', () => {
            this.myfriends = [];
            this.myfriends = this.requestservice.myfriends;
        });
    }
    reload() {
        this.myfriends = [];
        this.myrequests = [];
        this.allmygroups = [];
        this.requestservice.getmyrequests();
        this.requestservice.getmyfriends();
        this.groupservice.getmygroups();
    }
    ionViewDidLeave() {
        this.events.unsubscribe('newgroup');
        this.events.unsubscribe('gotrequests');
        this.events.unsubscribe('friends');
    }
    //Firend涵式------------------------------------------------
    addbuddy() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__add_friend_add_friend__["a" /* AddFriendPage */]);
    }
    //接受好友邀請
    accept(item) {
        this.requestservice.acceptrequest(item).then(() => {
            let newalert = this.alertCtrl.create({
                title: '新增好友',
                subTitle: '點擊您的好友和他聯絡吧!!',
                buttons: [
                    {
                        text: '確定',
                        handler: data => {
                            this.reload();
                        }
                    }
                ]
            });
            newalert.present();
        });
    }
    //拒絕好友邀請
    ignore(item) {
        this.requestservice.deleterequest(item).then(() => {
            this.reload();
        }).catch((err) => {
            alert(err);
        });
    }
    //進入與好友的個人聊天室
    buddychat(buddy) {
        this.chatservice.initializebuddy(buddy);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__personal_chat_personal_chat__["a" /* PersonalChatPage */]);
    }
    //Team涵式--------------------------------------
    //新增隊伍
    addgroup() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__add_team_add_team__["a" /* AddTeamPage */]);
    }
    //進入隊伍聊天室
    openchat(group) {
        this.groupservice.getintogroup(group.groupName);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__team_chat_team_chat__["a" /* TeamChatPage */], { groupName: group.groupName });
    }
};
ChatroomPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-chatroom',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\chatroom\chatroom.html"*/'<!--\n  Generated template for the ChatroomPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>好友</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list no-lines>\n    <ion-list-header>\n      好友邀請\n    </ion-list-header>\n    <ion-item-sliding *ngFor="let item of myrequests">\n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{item.UserPhotoURL}}">\n        </ion-avatar>\n        <h4>{{item.UserName}}</h4>\n        <button ion-button color="secondary" (click)="accept(item)">\n          <ion-icon name="checkmark">新增</ion-icon>\n        </button>\n        <button ion-button color="danger" (click)="ignore(item)">\n          <ion-icon name="trash">忽略</ion-icon>\n        </button>\n      </ion-item>\n\n    </ion-item-sliding>\n    <ion-list-header>\n      朋友\n      <button item-right ion-button icon-only (click)="addbuddy()">\n        <ion-icon name="person-add"></ion-icon>\n      </button>\n    </ion-list-header>\n\n    <ion-item *ngFor="let item of myfriends" (click)="buddychat(item)">\n      <ion-avatar item-left>\n        <img src={{item.UserPhotoURL}}>\n      </ion-avatar>\n      <h3>{{item.UserName}}</h3>\n    </ion-item>\n    <ion-list-header>\n      隊伍\n      <button item-right ion-button icon-only (click)="addgroup()">\n        <ion-icon name="contacts"></ion-icon>\n      </button>\n    </ion-list-header>\n    <ion-item *ngFor="let item of allmygroups">\n      <ion-avatar item-left>\n        <img src="{{item.groupimage}}">\n      </ion-avatar>\n      <h3 (click)="openchat(item)">{{item.groupName}}</h3>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\chatroom\chatroom.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__["a" /* RequestsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_groups_groups__["a" /* GroupsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_native_audio__["a" /* NativeAudio */]])
], ChatroomPage);

//# sourceMappingURL=chatroom.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonalChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the PersonalChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let PersonalChatPage = class PersonalChatPage {
    constructor(navCtrl, navParams, chatservice, events, zone, loadingCtrl, geolocation, storage, userservice, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatservice = chatservice;
        this.events = events;
        this.zone = zone;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.storage = storage;
        this.userservice = userservice;
        this.camera = camera;
        this.allmessages = [];
        this.WayToLogin = {};
        this.whoAmI = [];
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
            });
        });
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
                this.userservice.whoAmI(this.WayToLogin.WhichWay, this.WayToLogin.UserUID).then((resolve) => {
                    this.whoAmI = resolve;
                    //   alert(JSON.stringify(this.whoAmI[0].UserPhotoURL));
                });
            });
        });
    }
    //新增聊天訊息
    addmessage() {
        this.chatservice.addnewmessage(this.newmessage).then(() => {
            this.content.scrollToBottom();
            this.newmessage = '';
        });
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
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 800,
            targetHeight: 800,
            sourceType: sourceType,
        };
        this.camera.getPicture(options).then((imageData) => {
            this.isChanagePic = true;
            this.imageData = 'data:image/jpeg;base64,' + imageData;
        }).then(resolve => {
            this.upload();
        });
    }
    //上傳圖片照片
    upload() {
        //  alert('upload');
        let storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref();
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child('chatroom/' + filename + '.jpg');
        var uploadTask = imageRef.putString(this.imageData, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage.StringFormat.DATA_URL);
        uploadTask.then((snapshot) => {
            this.downloadURL = uploadTask.snapshot.downloadURL;
            this.chatservice.addnewmessage(this.downloadURL).then(() => {
                this.scrollto();
            });
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
            data.coords.latitude;
            data.coords.longitude;
        });
        const subscription = this.geolocation.watchPosition()
            .subscribe(position => {
            console.log(position.coords.longitude + ' ' + position.coords.latitude);
        });
        // To stop notifications
        subscription.unsubscribe();
        this.chatservice.addnewmessage(this.geo).then(() => {
            this.content.scrollToBottom();
            //this.newmessage = this.geo;
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], PersonalChatPage.prototype, "content", void 0);
PersonalChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-personal-chat',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\personal-chat\personal-chat.html"*/'<!--\n  Generated template for the PersonalChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>{{buddy.UserName}}</ion-title>\n    <ion-buttons end>\n\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content #content>\n  <div class="chatwindow">\n    <ion-list no-lines>\n      <ion-item *ngFor="let item of allmessages; let i = index" text-wrap>\n        <ion-avatar item-left *ngIf="item.sentby === buddy.Uid">\n          <img src="{{buddy.UserPhotoURL}}">\n        </ion-avatar>\n        <div class="bubble me" *ngIf="item.sentby === buddy.Uid">\n          <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n          <img src="{{item.message}}" *ngIf="imgornot[i]">\n        </div>\n        <ion-avatar item-right *ngIf="item.sentby != buddy.Uid">\n          <img src="{{whoAmI[0].UserPhotoURL}}">\n        </ion-avatar>\n        <div class="bubble you" *ngIf="item.sentby != buddy.Uid">\n          <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n          <img src="{{item.message}}" *ngIf="imgornot[i]">\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n<ion-footer ion-fixed>\n  <ion-toolbar>\n    <ion-item>\n      <button ion-button icon-only small item-left (click)="getPicture(1)">\n        <ion-icon name="camera"></ion-icon>\n      </button>\n      <button ion-button icon-only small item-left (click)="getPicture(0)">\n        <ion-icon name="image"></ion-icon>\n      </button>\n      <ion-item>\n        <ion-input [(ngModel)]="newmessage" placeholder="Write your message ..."></ion-input>\n      </ion-item>\n\n      <button ion-button item-right (click)="addmessage()" color="royal">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\personal-chat\personal-chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */]])
], PersonalChatPage);

//# sourceMappingURL=personal-chat.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__team_info_team_info__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__team_member_team_member__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__add_teammember_add_teammember__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the TeamChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let TeamChatPage = class TeamChatPage {
    constructor(navCtrl, navParams, groupservice, actionSheet, events, loadingCtrl, geolocation, platform, storage, userservice, camera, fdb, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupservice = groupservice;
        this.actionSheet = actionSheet;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.platform = platform;
        this.storage = storage;
        this.userservice = userservice;
        this.camera = camera;
        this.fdb = fdb;
        this.alertCtrl = alertCtrl;
        this.owner = false;
        this.UserList = [];
        this.isGetData = false;
        this.WayToLogin = {};
        this.whoAmI = [];
        this.notice = "我已經發送了一個消息，可以到偵查頁面看看。";
        // this.init();
        this.ToFindMe();
        this.loadData_part1();
        this.alignuid = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid;
        // this.photoURL;
        this.groupName = this.navParams.get('groupName');
        this.groupservice.getownership(this.groupName).then((res) => {
            if (res)
                this.owner = true;
        }).catch((err) => {
            alert(err);
        });
        this.events.subscribe('newgroupmsg', () => {
            this.allgroupmsgs = [];
            this.imgornot = [];
            this.allgroupmsgs = this.groupservice.groupmsgs;
            for (var key in this.allgroupmsgs) {
                var d = new Date(this.allgroupmsgs[key].timestamp);
                var hours = d.getHours();
                var minutes = "0" + d.getMinutes();
                var month = d.getMonth();
                var da = d.getDate();
                var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);
                this.allgroupmsgs[key].timestamp = formattedTime;
                if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
                    this.imgornot.push(true);
                }
                else {
                    this.imgornot.push(false);
                }
            }
            this.scrollto();
        });
    }
    ionViewDidLoad() {
        this.groupservice.getownership(this.groupName).then((res) => {
            if (res)
                this.groupmembers = this.groupservice.currentgroup;
            else {
                this.groupservice.getgroupmembers();
            }
        });
        this.events.subscribe('gotmembers', () => {
            this.groupmembers = this.groupservice.currentgroup;
        });
    }
    init() {
        this.groupservice.getownership(this.groupName).then((res) => {
            if (res)
                this.groupmembers = this.groupservice.currentgroup;
            else {
                this.groupservice.getgroupmembers();
            }
        });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('gotmembers');
    }
    //找到自己
    ToFindMe() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    //   alert(JSON.stringify(val));
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.userservice.whoAmI(this.WayToLogin.WhichWay, this.WayToLogin.UserUID).then((resolve) => {
                    this.whoAmI = resolve;
                    //   alert(JSON.stringify(this.whoAmI[0].UserPhotoURL));
                });
            }).then(() => {
                //   this.groupservice.getTeamMes(this.whoAmI[0].Uid, this.groupName);
                this.groupservice.getgroupmsgs(this.groupName);
            });
        });
    }
    //隊長選單
    presentOwnerSheet() {
        let sheet = this.actionSheet.create({
            title: '隊伍選單',
            buttons: [
                {
                    text: '新增隊員',
                    icon: 'person-add',
                    handler: () => {
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__add_teammember_add_teammember__["a" /* AddTeammemberPage */]);
                    }
                },
                {
                    text: '踢出隊員',
                    icon: 'remove-circle',
                    handler: () => {
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__team_member_team_member__["a" /* TeamMemberPage */]);
                    }
                },
                {
                    text: '隊伍資訊',
                    icon: 'person',
                    handler: () => {
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__team_info_team_info__["a" /* TeamInfoPage */], { groupName: this.groupName });
                    }
                },
                {
                    text: '解散隊伍',
                    icon: 'trash',
                    handler: () => {
                        this.groupservice.deletegroup().then(() => {
                            this.navCtrl.pop();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    icon: 'cancel',
                    handler: () => {
                        console.log('Cancelled');
                    }
                }
            ]
        });
        sheet.present();
    }
    //隊員選單
    presentMemberSheet() {
        let sheet = this.actionSheet.create({
            title: '隊伍選單',
            buttons: [
                {
                    text: '離開隊伍',
                    icon: 'log-out',
                    handler: () => {
                        this.groupservice.leavegroup().then(() => {
                            this.navCtrl.pop();
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    icon: 'cancel',
                    handler: () => {
                        console.log('Cancelled');
                    }
                }
            ]
        });
        sheet.present();
    }
    makeNotice() {
        this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.notice).then(() => {
            this.scrollto();
            //   this.newmessage = '';
        });
    }
    //新增聊天室訊息
    addgroupmsg() {
        this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.newmessage).then(() => {
            this.scrollto();
            this.newmessage = '';
        });
    }
    //一秒自動捲到最下面
    scrollto() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 1000);
    }
    //get圖片照片來源
    getPicture(sourceType) {
        //  alert('getPicture');
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 800,
            targetHeight: 800,
            sourceType: sourceType,
        };
        this.camera.getPicture(options).then((imageData) => {
            //  alert('~?');
            this.isChanagePic = true;
            this.imageData = 'data:image/jpeg;base64,' + imageData;
        }).then(resolve => {
            this.upload();
        });
    }
    //上傳圖片照片
    upload() {
        //  alert('upload');
        let storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref();
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child('chatroom/' + filename + '.jpg');
        var uploadTask = imageRef.putString(this.imageData, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage.StringFormat.DATA_URL);
        uploadTask.then((snapshot) => {
            this.downloadURL = uploadTask.snapshot.downloadURL;
            this.downloadURL = uploadTask.snapshot.downloadURL;
            this.groupservice.addgroupmsg(this.whoAmI[0].UserName, this.whoAmI[0].UserPhotoURL, this.downloadURL).then(() => {
                this.scrollto();
            });
            //    this.showSuccesfulUploadAlert();
            //this.add();
        }).catch(error => alert("upload error"));
    }
    //-------------------------------------------------
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
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promose = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            //  this.loadData_part4();
        });
    }
    //抓座標位置
    sendgeo() {
        this.geolocation.getCurrentPosition().then((position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            this.share();
        }, (err) => {
            console.log(err);
        });
    }
    //送出座標位置
    share() {
        this.init();
        let alert2 = this.alertCtrl.create({
            title: '與隊友分享資訊以及位置',
            inputs: [{
                    name: 'teammessage',
                    placeholder: '請輸入您提醒隊友的事情'
                }],
            buttons: [{
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: '確定',
                    handler: data => {
                        this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
                            type: "Friend",
                            lat: this.lat,
                            lon: this.lon,
                            representative: 3,
                            isDone: false,
                            content: data.teammessage
                        }).then(() => {
                            //   alert(JSON.stringify(this.groupmembers.length));
                            for (var i = 0; i < this.groupmembers.length; i++) {
                                this.fdb.list("/map/" + this.groupmembers[i].Uid).push({
                                    type: "Friend",
                                    lat: this.lat,
                                    lon: this.lon,
                                    representative: 3,
                                    isDone: false,
                                    content: data.teammessage
                                });
                            }
                            this.makeNotice();
                            alert('訊息已送出');
                        });
                    }
                }
            ]
        });
        alert2.present();
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], TeamChatPage.prototype, "content", void 0);
TeamChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-team-chat',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-chat\team-chat.html"*/'<!--\n  Generated template for the TeamChatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>{{groupName}}</ion-title>\n    <ion-buttons end>\n\n      <button *ngIf="owner" ion-button icon-only (click)="presentOwnerSheet()">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <button *ngIf="!owner" ion-button icon-only (click)="presentMemberSheet()">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content #content>\n  <div class="chatwindow">\n    <ion-list no-lines>\n      <ion-item *ngFor="let item of allgroupmsgs; let i = index" text-wrap>\n        <ion-avatar item-right *ngIf="item.sentby === alignuid">\n          <img class="profile-pic-right" src="{{whoAmI[0].UserPhotoURL}}">\n          <h6 style="color: mediumpurple;" class="name-right">{{item.UserName}}</h6>\n        </ion-avatar>\n        <div class="bubble me" *ngIf="item.sentby === alignuid">\n\n          <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n          <img src="{{item.message}}" *ngIf="imgornot[i]">\n          <p>\n            <small>{{item.timestamp}}</small>\n          </p>\n        </div>\n        <ion-avatar item-left *ngIf="item.sentby != alignuid">\n          <img class="profile-pic-left" src="{{item.UserPhotoURL}}">\n          <h6 style="color: mediumvioletred;" class="name-left">{{item.UserName}}</h6>\n        </ion-avatar>\n        <div class="bubble you" *ngIf="item.sentby != alignuid">\n\n          <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n          <img src="{{item.message}}" *ngIf="imgornot[i]">\n          <p>\n            <small>{{item.timestamp}}</small>\n          </p>\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n<ion-footer ion-fixed>\n  <ion-toolbar>\n    <ion-item>\n      <button ion-button icon-only small item-left (click)="getPicture(1)">\n        <ion-icon name="camera"></ion-icon>\n      </button>\n      <button ion-button icon-only small item-left (click)="getPicture(0)">\n        <ion-icon name="image"></ion-icon>\n      </button>\n      <button ion-button icon-only small item-left (tap)="sendgeo()">\n        <ion-icon name="pin"></ion-icon>\n      </button>\n      <ion-item>\n        <ion-input [(ngModel)]="newmessage" placeholder="Write your message ..."></ion-input>\n      </ion-item>\n\n      <button ion-button item-right (click)="addgroupmsg()">\n        <ion-icon name="send" color="royal"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-chat\team-chat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__["a" /* GroupsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], TeamChatPage);

//# sourceMappingURL=team-chat.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TeamInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let TeamInfoPage = class TeamInfoPage {
    constructor(navCtrl, navParams, groupservice, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupservice = groupservice;
        this.events = events;
    }
    ionViewDidLoad() {
        this.groupservice.getownership(this.groupservice.currentgroupname).then((res) => {
            if (res)
                this.groupmembers = this.groupservice.currentgroup;
            else {
                this.groupservice.getgroupmembers();
            }
        });
        this.events.subscribe('gotmembers', () => {
            this.groupmembers = this.groupservice.currentgroup;
        });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('gotmembers');
    }
};
TeamInfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-team-info',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-info\team-info.html"*/'<!--\n  Generated template for the TeamInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>隊伍資訊</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list no-lines>\n    <ion-list-header>\n      組隊成員\n    </ion-list-header>\n    <ion-item *ngFor="let item of groupmembers">\n      <ion-avatar item-left>\n        <img src="{{item.UserPhotoURL}}">\n      </ion-avatar>\n      <h2>{{item.UserName}}</h2>\n      <p>Member</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-info\team-info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__["a" /* GroupsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], TeamInfoPage);

//# sourceMappingURL=team-info.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamMemberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TeamMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let TeamMemberPage = class TeamMemberPage {
    constructor(navCtrl, navParams, groupservice, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupservice = groupservice;
        this.events = events;
    }
    ionViewDidLoad() {
        //console.log('ionViewDidLoad TeamMemberPage');
    }
    ionViewWillEnter() {
        this.groupmembers = this.groupservice.currentgroup;
        this.tempgrpmembers = this.groupmembers;
        this.events.subscribe('gotintogroup', () => {
            this.groupmembers = this.groupservice.currentgroup;
            this.tempgrpmembers = this.groupmembers;
        });
    }
    ionViewWillLeave() {
        this.events.unsubscribe('gotintogroups');
    }
    //搜尋隊員
    searchuser(searchbar) {
        let tempmembers = this.tempgrpmembers;
        var q = searchbar.target.value;
        if (q.trim() === '') {
            this.groupmembers = this.tempgrpmembers;
            return;
        }
        tempmembers = tempmembers.filter((v) => {
            if (v.UserName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
        this.groupmembers = tempmembers;
    }
    //移除隊員
    removemember(member) {
        this.groupservice.deletemember(member);
    }
};
TeamMemberPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-team-member',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-member\team-member.html"*/'<!--\n  Generated template for the TeamMemberPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header>\n\n  <ion-navbar color="hcolor">\n    <ion-title>隊員</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar [(ngModel)]="searchstring" (input)="searchuser($event)" placeholder="Search">\n  </ion-searchbar>\n  <ion-list no-lines>\n    <ion-item-sliding *ngFor="let key of groupmembers">\n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{key.UserPhotoURL}}">\n        </ion-avatar>\n        <h2>{{key.UserName}}</h2>\n        <button ion-button color="danger" (click)="removemember(key)" item-right>\n          <ion-icon name="trash">踢除</ion-icon>\n\n        </button>\n      </ion-item>\n\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Friends\team-member\team-member.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_groups_groups__["a" /* GroupsProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], TeamMemberPage);

//# sourceMappingURL=team-member.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IbeaconHuntingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_i_beacon_i_beacon__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_beacon_model__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_ibeacon__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__quiz_quiz__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let IbeaconHuntingPage = class IbeaconHuntingPage {
    constructor(navCtrl, geo, platform, beaconProvider, events, alertCtrl, changeref, localNotifications, fdb, storage, toast, nativeAudio, ibeacon, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.geo = geo;
        this.platform = platform;
        this.beaconProvider = beaconProvider;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.changeref = changeref;
        this.localNotifications = localNotifications;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.nativeAudio = nativeAudio;
        this.ibeacon = ibeacon;
        this.loadingCtrl = loadingCtrl;
        this.WayToLogin = {};
        this.UserList = [];
        this.markerList = [];
        this.isGetData = false;
        /**
         *
         * 以下是Beacon的宣告
         */
        this.beacons = [];
        this.status = "Scanning...";
        //任務清單
        this.MissionList = [];
        //背景音樂
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.unload('information');
            this.nativeAudio.loop('ibeacon');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        this.Get_I = false;
        this.Get_M = false;
        this.Get_T = false;
        //Beacon
        // required for UI update
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]({ enableLongStackTrace: false });
        //Notification
        this.platform.ready().then((readySource) => {
            this.localNotifications.on('click', (notification, state) => {
                let json = JSON.parse(notification.data);
                let alert = alertCtrl.create({
                    title: notification.title,
                    subTitle: json.mydata
                });
                alert.present();
            });
        });
        if (this.platform.is('cordova')) {
            this.ibeacon.enableBluetooth();
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0);
            nativeAudio.preloadComplex('ibeacon', 'assets/audio/bgm_ibeacon.mp3', 1, 1, 0).then(this.onSuccessPreloading);
            nativeAudio.preloadComplex('discover', 'assets/audio/quiz_discover.mp3', 1, 1, 0);
        }
    }
    //畫面讀取的Loading
    presentLoadingCustom() {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
      連接中...請稍候..
      <div #map id="map"></div>`,
            duration: 5000
        });
        loading.onDidDismiss(() => {
            console.log('Dismissed loading');
        });
        loading.present();
    }
    //當進入這個頁面的時候，開始偵測
    ionViewWillEnter() {
        this.startScan();
    }
    //離開頁面的時候，停止偵測
    //並取消iBeacon訊號刷新的事件
    ionViewDidLeave() {
        this.beaconProvider.stopScan();
        this.events.unsubscribe('didRangeBeaconsInRegion');
    }
    //當進入此頁面
    ionViewDidLoad() {
        this.presentLoadingCustom();
        //創建一個Alert訊息，並等待
        this.Quizinit_T();
        this.Quizinit_I();
        this.Quizinit_M();
        //進行一系列的資料撈取
        this.loadData_part1();
        //重複刷新頁面，以實時新增經驗值
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
    }
    //離開時，切換音樂
    ngOnDestroy() {
        this.nativeAudio.unload('ibeacon');
        this.nativeAudio.loop('information');
        this.map = null;
    }
    //Notification 涵式
    scheduleNotification() {
        this.localNotifications.schedule({
            id: 1,
            title: '訊息通知',
            text: '已將可疑的場景封鎖，等候您來搜查',
            data: { mydata: '歡迎回來' },
            at: new Date(new Date().getTime() + 1 * 1000)
        });
    }
    //Go to Quiz
    showQuiz() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__quiz_quiz__["a" /* QuizPage */]);
    }
    Quizinit_T() {
        this.QT = this.alertCtrl.create({
            title: '挑戰邀請',
            message: '已經在工學院發現可疑的場景，請問是否要仔細調查 ?',
            buttons: [
                {
                    text: '晚ㄧ點在處理',
                    handler: () => {
                        this.startScan();
                        this.Quizinit_T();
                        //  this.listenToBeaconEvents();
                    }
                },
                {
                    text: '當然!',
                    handler: () => {
                        this.UpdateData_FirstGetQuiz();
                        this.Quizinit_T();
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__quiz_quiz__["a" /* QuizPage */], this.DefineIbeacon);
                    }
                }
            ]
        });
    }
    Quizinit_I() {
        this.QI = this.alertCtrl.create({
            title: '挑戰邀請',
            message: '已經在機械大樓發現可疑的場景，請問是否要仔細調查 ?',
            buttons: [
                {
                    text: '晚ㄧ點在處理',
                    handler: () => {
                        this.startScan();
                        this.Quizinit_I();
                        //  this.listenToBeaconEvents();
                    }
                },
                {
                    text: '當然!',
                    handler: () => {
                        this.UpdateData_FirstGetQuiz();
                        this.Quizinit_I();
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__quiz_quiz__["a" /* QuizPage */], this.DefineIbeacon);
                    }
                }
            ]
        });
    }
    Quizinit_M() {
        this.QM = this.alertCtrl.create({
            title: '挑戰邀請',
            message: '已經在管理學院發現可疑的場景，請問是否要仔細調查 ?',
            buttons: [
                {
                    text: '晚ㄧ點在處理',
                    handler: () => {
                        this.startScan();
                        this.Quizinit_M();
                        //  this.listenToBeaconEvents();
                    }
                },
                {
                    text: '當然!',
                    handler: () => {
                        this.UpdateData_FirstGetQuiz();
                        this.Quizinit_M();
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__quiz_quiz__["a" /* QuizPage */], this.DefineIbeacon);
                    }
                }
            ]
        });
    }
    //判斷iBeacon位置，並做出相對應的事件
    AskforQuiz() {
        if (this.DefineIbeacon == 64309 && !this.UserList[this.update_index].Quiz_T) {
            //機械
            this.nativeAudio.play('discover');
            this.QT.present();
            this.scheduleNotification();
        }
        else if (this.DefineIbeacon == 9691 && !this.UserList[this.update_index].Quiz_I) {
            //工學
            this.nativeAudio.play('discover');
            this.QI.present();
            this.scheduleNotification();
        }
        else if (this.DefineIbeacon == 12843 && !this.UserList[this.update_index].Quiz_M) {
            //管院
            this.nativeAudio.play('discover');
            this.QM.present();
            this.scheduleNotification();
        }
    }
    //map涵式
    //初始化map
    initMap() {
        this.geo.getCurrentPosition().then((position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            //設定座標
            let latLng = new google.maps.LatLng(this.lat, this.lon);
            let mapOptions = {
                center: latLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.makeMarker();
            //  this.addMarker();
        }, (err) => {
            console.log(err);
        });
    }
    //新增地圖標記
    makeMarker() {
        for (var i = 0; i < this.markerList.length; i++) {
            this.lat = this.markerList[i].lat;
            this.lon = this.markerList[i].lon;
            this.addMarker(this.lat, this.lon, this.markerList[i].type, this.markerList[i].representative, this.markerList[i].content);
        }
    }
    //新增地圖標記
    addMarker(lat, lon, type, representative, contents) {
        //為不同回饋，設計標記樣式
        var image_friend = {
            url: "assets/map/beachflag.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var image_done = {
            url: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/map-ok.png?alt=media&token=a29b1a03-2212-4b6b-b4b9-8d6c198a3380",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        //標記分成 系統提供以及朋友提供兩種
        if (type == "System") {
            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: google.maps.SymbolPath.CIRCLE,
                position: { lat: lat, lng: lon }
            });
            let content = contents;
            this.addInfoWindow(marker, content, representative);
        }
        else if (type == "Friend") {
            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: image_friend,
                position: { lat: lat, lng: lon }
            });
            let content = contents;
            this.addInfoWindow(marker, content, representative);
        }
    }
    //地圖標記的觸發事件
    addInfoWindow(marker, content, representative) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }
    //iBeacon涵式
    startScan() {
        this.platform.ready().then(() => {
            this.beaconProvider.startScan().then((isInitialised) => {
                if (isInitialised) {
                    this.listenToBeaconEvents();
                }
                else
                    this.status = "problem in start scan";
            });
        });
    }
    stopScan() {
        this.platform.ready().then(() => {
            this.beaconProvider.stopScan();
            this.AskforQuiz();
        });
    }
    //監聽iBeacon
    listenToBeaconEvents() {
        this.events.subscribe('didRangeBeaconsInRegion', (data) => {
            // update the UI with the beacon list  
            this.zone.run(() => {
                this.beacons = [];
                let beaconList = data.beacons;
                beaconList.forEach((beacon) => {
                    //    alert("listenToBeaconEvents");
                    let beaconObject = new __WEBPACK_IMPORTED_MODULE_3__models_beacon_model__["a" /* BeaconModel */](beacon);
                    this.beacons.push(beaconObject);
                    this.DefineIbeacon = this.beacons[0].major;
                    //    this.AskforQuiz();
                    this.stopScan();
                });
            });
        });
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
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promose = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.Get_I = this.UserList[this.update_index].Quiz_I;
            this.Get_M = this.UserList[this.update_index].Quiz_M;
            this.Get_T = this.UserList[this.update_index].Quiz_T;
            this.loadData_part4();
        });
    }
    loadData_part4() {
        this.fdb.list("/map/" + this.UserList[this.update_index].Uid).subscribe(data => {
            return new Promise((resolve) => {
                if (data) {
                    this.markerList = data;
                    resolve(data);
                }
            }).then(resolve => {
                this.UpdateData_FirstViewPage();
                this.initMap();
            });
        });
    }
    //第一次進入偵查頁面任務判斷
    UpdateData_FirstViewPage() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_004) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_004: true,
                    Mission_004: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 40,
                    UserExp: this.UserList[this.update_index].UserExp + 30,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 30) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：首次偵查線索`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_004) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_004: true,
                    Mission_004: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 40,
                    UserExp: this.UserList[this.update_index].UserExp + 30,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 30) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：首次偵查線索`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
    UpdateData_FirstGetQuiz() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_008) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_008: true,
                    Mission_008: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：現場搜查`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_008) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_008: true,
                    Mission_008: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：現場搜查`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
], IbeaconHuntingPage.prototype, "mapElement", void 0);
IbeaconHuntingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-ibeacon-hunting',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Investigate\ibeacon-hunting\ibeacon-hunting.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>偵查</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n\n  <div #map id="map"></div>\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Investigate\ibeacon-hunting\ibeacon-hunting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__providers_i_beacon_i_beacon__["a" /* IBeaconProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_ibeacon__["a" /* IBeacon */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]])
], IbeaconHuntingPage);

//# sourceMappingURL=ibeacon-hunting.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the QuizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let QuizPage = class QuizPage {
    constructor(navCtrl, navParams, dataService, changeref, fdb, storage, toast, nativeAudio, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.changeref = changeref;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.nativeAudio = nativeAudio;
        this.platform = platform;
        this.WayToLogin = {};
        this.UserList = [];
        //Tip
        this.Tips = [];
        this.Quizs = [];
        this.hasAnswered = false;
        //抓取上個頁面傳入的資料
        this.representative = this.navParams.data;
        this.isGetData = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('wrong', 'assets/audio/quiz_false.mp3', 1, 1, 0);
            nativeAudio.preloadComplex('right', 'assets/audio/quiz_right.mp3', 1, 1, 0);
        }
        //Quiz
        this.slideOptions = {
            onlyExternal: false
        };
    }
    ionViewDidLoad() {
        //撈取資料
        this.loadData_part1();
        //實時更新經驗值
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            if (this.slides.isEnd) {
                this.UpdateData_FirstOver();
            }
            this.changeref.markForCheck();
        }, 1000);
        //以下依照傳入的資料 載入問題
        //Quiz
        //機械
        if (this.representative == 64309) {
            this.dataService.load_T().then((data) => {
                //    alert(JSON.stringify(data));
                data.map((question) => {
                    let originalOrder = question.answers;
                    question.answers = this.randomizeAnswers(originalOrder);
                    return question;
                    ;
                });
                this.questions = data;
            }).then(() => {
                this.slides.lockSwipes(true);
            });
        }
        else if (this.representative == 9691) {
            //工學
            this.dataService.load_I().then((data) => {
                data.map((question) => {
                    //    alert(JSON.stringify(data));
                    let originalOrder = question.answers;
                    question.answers = this.randomizeAnswers(originalOrder);
                    return question;
                    ;
                });
                this.questions = data;
            }).then(() => {
                this.slides.lockSwipes(true);
            });
        }
        else if (this.representative == 12843) {
            //管院
            this.dataService.load_M().then((data) => {
                //    alert(JSON.stringify(data));
                data.map((question) => {
                    let originalOrder = question.answers;
                    question.answers = this.randomizeAnswers(originalOrder);
                    return question;
                    ;
                });
                this.questions = data;
            }).then(() => {
                this.slides.lockSwipes(true);
            });
        }
    }
    //Quiz 涵式
    //選擇答案
    selectAnswer(answer, question) {
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;
        this.slides.lockSwipes(false);
        //答對的話切換到達對頁面，不讓使用者手動切換頁面
        //反之亦然
        if (answer.correct) {
            this.nativeAudio.play('right');
            //  this.slides.slideTo(1, 0);
            this.slides.slideNext();
            this.slides.lockSwipes(true);
            if (this.slides.isEnd()) {
                this.clue();
                this.answerOver();
            }
        }
        else {
            this.nativeAudio.play('wrong');
            //  this.slides.slideTo(2, 0);
            this.slides.lockSwipes(true);
        }
        setTimeout(() => {
            this.hasAnswered = false;
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 1500);
    }
    //隨機打亂問題順序
    randomizeAnswers(rawAnswers) {
        for (let i = rawAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
        return rawAnswers;
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
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.UpdateData_firstVivePage();
        });
    }
    clue() {
        return new Promise((resolve) => {
            if (!this.UserList[this.update_index].Map_T && !this.UserList[this.update_index].Map_I) {
                this.rand = Math.floor(Math.random() * 2);
                //   alert(this.rand);
                //機械大樓
                if (this.rand == 0) {
                    this.lat = 24.06492;
                    this.lon = 120.55961;
                    resolve("ok");
                }
                else if (this.rand == 1) {
                    //工學院
                    this.lat = 24.06597;
                    this.lon = 120.55915;
                    resolve("ok");
                }
            }
            else if (this.UserList[this.update_index].Map_T && !this.UserList[this.update_index].Map_I) {
                this.rand = 0;
                this.lat = 24.06492;
                this.lon = 120.55961;
                resolve("ok");
            }
            else if (!this.UserList[this.update_index].Map_T && this.UserList[this.update_index].Map_I) {
                this.rand = 1;
                this.lat = 24.06597;
                this.lon = 120.55915;
                resolve("ok");
            }
        }).then(resolve => {
            this.newMarker();
        });
    }
    //回答完問題
    //依照登入方式以及偵測到的地點
    //到玩家資料庫中修改玩家進程
    answerOver() {
        if (this.WayToLogin.WhichWay == "Email") {
            //機械
            if (this.representative == 64309) {
                this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Quiz_T: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
            else if (this.representative == 9691) {
                //工學
                this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Quiz_I: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
            else if (this.representative == 12843) {
                //管院
                this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Quiz_M: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            //機械
            if (this.representative == 64309) {
                this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Quiz_T: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
            else if (this.representative == 9691) {
                //工學
                this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Quiz_I: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
            else if (this.representative == 12843) {
                //管院
                this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Quiz_M: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
            }
        }
    }
    //在地圖上資料庫中新增新的標記
    newMarker() {
        if (this.WayToLogin.WhichWay == "Email") {
            if (this.rand == 0) {
                this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
                    type: "System",
                    lat: this.lat,
                    lon: this.lon,
                    representative: this.rand,
                    isDone: false,
                    content: "一進大門右手邊的位置好像特別神秘..."
                });
                this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Map_I: true,
                });
            }
            else if (this.rand == 1) {
                this.fdb.list("/map/" + this.UserList[this.update_index].Uid).push({
                    type: "System",
                    lat: this.lat,
                    lon: this.lon,
                    representative: this.rand,
                    isDone: false,
                    content: "有人通報，B1的樓梯附近有一些可疑的人"
                });
                this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Map_T: true,
                });
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (this.rand == 0) {
                this.fdb.list("/map/" + this.UserList[this.update_index].UserUid).push({
                    type: "System",
                    lat: this.lat,
                    lon: this.lon,
                    representative: this.rand,
                    isDone: false,
                    content: "一進大門右手邊的位置好像特別神秘..."
                });
                this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Map_I: true,
                });
            }
            else if (this.rand == 1) {
                this.fdb.list("/map/" + this.UserList[this.update_index].UserUid).push({
                    type: "System",
                    lat: this.lat,
                    lon: this.lon,
                    representative: this.rand,
                    isDone: false,
                    content: "有人通報，B1的樓梯附近有一些可疑的人"
                });
                this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Map_T: true,
                });
            }
        }
    }
    //第一次進入頁面
    UpdateData_firstVivePage() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_008) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_008: true,
                    Mission_008: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：現場偵查`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_008) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_008: true,
                    Mission_008: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：現場偵查`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
    //第一次進入偵查頁面任務判斷
    UpdateData_FirstOver() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_007) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_007: true,
                    Mission_007: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 40,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 40) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：實力的證明`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_007) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_007: true,
                    Mission_007: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 40,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 40) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：實力的證明`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
    __metadata("design:type", Object)
], QuizPage.prototype, "slides", void 0);
QuizPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-quiz',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Investigate\quiz\quiz.html"*/'<!--\n  Generated template for the QuizPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>搜查線索</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-slides #slides [autoplay]="slideOptions">\n\n    <ion-slide *ngFor="let question of questions; let i = index;">\n\n      <h3>{{question.questionText}}</h3>\n\n      <ion-list no-lines radio-group>\n\n        <ion-item *ngFor="let answer of question.answers; let i = index;">\n\n          <ion-label>{{i+1}}. {{answer.answer}}</ion-label>\n          <ion-radio (click)="selectAnswer(answer, question)" [checked]="answer.selected" [disabled]="hasAnswered"></ion-radio>\n\n        </ion-item>\n\n      </ion-list>\n\n    </ion-slide>\n\n    <ion-slide>\n      <h2>調查完畢!</h2>\n\n      <p>繼續尋找看看有沒有其他線索吧。</p>\n      <p>同時獲得少數經驗值與積分。</p>\n    </ion-slide>\n\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Investigate\quiz\quiz.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
], QuizPage);

//# sourceMappingURL=quiz.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeaderboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LeaderboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let LeaderboardPage = class LeaderboardPage {
    constructor(navCtrl, playerdata, fdb, storage, changeref, toast, platform, nativeAudio) {
        this.navCtrl = navCtrl;
        this.playerdata = playerdata;
        this.fdb = fdb;
        this.storage = storage;
        this.changeref = changeref;
        this.toast = toast;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UserList_FromFB = [];
        this.UserList = [];
        this.LeaderList = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        this.isMix = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    //撈取資料
    ionViewDidLoad() {
        this.loadData_part1();
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            //  this.navCtrl.setRoot(LeaderboardPage);
            this.changeref.markForCheck();
        }, 1000);
        this.viewMode = "Player_all";
    }
    //GetUserData
    //從本機記憶體抓取登入方式
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
        });
    }
    //把用Email登入的玩家資料抓出來
    loadData_part2() {
        this.fdb.list("/Accounts_Email").subscribe(data => {
            return new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
                if (data) {
                    this.UserList = data;
                    resolve(data);
                }
            }).then(resolve => {
                this.loadData_part3();
            });
        });
    }
    //把用FB登入的玩家資料抓出來
    loadData_part3() {
        this.fdb.list("/Accounts_FB").subscribe(data => {
            return new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
                if (data) {
                    this.UserList_FromFB = data;
                    resolve(data);
                }
            }).then(resolve => {
                this.loadData_part4();
            });
        });
    }
    //將兩個登入方式的玩家資料混在一起
    loadData_part4() {
        let promise = new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
            for (var i = 0; i < this.UserList_FromFB.length; i++) {
                this.UserList.push(this.UserList_FromFB[i]);
            }
            resolve("GET");
        }).then(resolve => {
            //    alert(JSON.stringify(this.LeaderList));
            //   this.LeaderList = this.UserList;
            this.RankThePlayer(this.UserList);
            //    setTimeout(() => {
            this.loadData_part5();
            //  }, 750);
        });
    }
    //依照積分去排列
    RankThePlayer(box = []) {
        let promise = new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
            box.sort(function (a, b) { return b.UserPoint - a.UserPoint; });
            return box;
        });
    }
    //從全部玩家資料裡面找出自己
    loadData_part5() {
        let promise = new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                    this.Me = this.UserList[i].UserUid;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.UpdateData_firstLogin();
            //    this.LeaderList = this.RankThePlayer(this.LeaderList);
        });
    }
    /*
      //依照積分去排列
      RankThePlayer(box = []) {
    
        box.sort(function (a, b) { return b.UserPoint - a.UserPoint });
        return box;
      }
    */
    //第一次登入任務判斷
    UpdateData_firstLogin() {
        let promise = new __WEBPACK_IMPORTED_MODULE_4_firebase__["Promise"]((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_005) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_005: true,
                        Mission_005: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 30,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：同業競爭`,
                            duration: 3000
                        }).present();
                        resolve("OK");
                    }
                }
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_005) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_005: true,
                        Mission_005: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 30,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：同業競爭`,
                            duration: 3000
                        }).present();
                        resolve("OK");
                    }
                }
            }
        });
    }
};
LeaderboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-leaderboard',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Leaderboard\leaderboard\leaderboard.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>排行榜</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list *ngFor="let player of UserList; let i = index">\n    <ion-item *ngIf="i===update_index" class="isMe">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-1>\n            <h2>{{i+1}}</h2>\n          </ion-col>\n          <ion-col col-2>\n            <ion-avatar>\n              <img src="{{player.UserPhotoURL}}" />\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-5>\n            <h2>{{player.UserName}}</h2>\n          </ion-col>\n          <ion-col col-4>\n            <h2>point: {{player.UserPoint}}</h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n\n    <ion-item *ngIf="i!=update_index">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-1>\n            <h2>{{i+1}}</h2>\n          </ion-col>\n          <ion-col col-2>\n            <ion-avatar>\n              <img src="{{player.UserPhotoURL}}" />\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-5>\n            <h2>{{player.UserName}}</h2>\n          </ion-col>\n          <ion-col col-4>\n            <h2>point: {{player.UserPoint}}</h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Leaderboard\leaderboard\leaderboard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */]])
], LeaderboardPage);

//# sourceMappingURL=leaderboard.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MissionDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the MissionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let MissionDetailPage = class MissionDetailPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.missionBox = [];
        //抓取傳入的資料
        this.missionBox = this.navParams.data;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad MissionDetailPage');
    }
};
MissionDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-mission-detail',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Mission\mission-detail\mission-detail.html"*/'<!--\n  Generated template for the MissionDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title> {{missionBox.MissionName}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngIf="!missionBox.isGot">\n    <ion-card-content>\n      <ion-card-title>\n        {{missionBox.MissionName}}\n      </ion-card-title>\n      <p>任務內容：</p>\n      <h2>{{missionBox.MissionDetail}}</h2>\n      <br>\n      <p>取得獎章：</p>\n      <h2>{{missionBox.MissionRewardMedal}}</h2>\n      <br>\n      <p>獎勵經驗值：</p>\n      <h2>{{missionBox.MissionRewardExp}}</h2>\n      <br>\n      <p>獎勵點數：</p>\n      <h2>{{missionBox.MissionRewardPoint}}</h2>\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-card *ngIf="missionBox.isGot">\n    <ion-card-content>\n      <ion-card-title>\n        {{missionBox.MissionName}}\n      </ion-card-title>\n      <p>任務內容：</p>\n      <h2>{{missionBox.MissionDetail}}</h2>\n      <br>\n      <p>取得獎章：</p>\n      <h2>{{missionBox.MissionRewardMedal}}</h2>\n      <br>\n      <p>獎勵經驗值：</p>\n      <h2>{{missionBox.MissionRewardExp}}</h2>\n      <br>\n      <p>獎勵點數：</p>\n      <h2>{{missionBox.MissionRewardPoint}}</h2>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Mission\mission-detail\mission-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MissionDetailPage);

//# sourceMappingURL=mission-detail.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MissionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mission_detail_mission_detail__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the MissionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let MissionPage = class MissionPage {
    constructor(platform, navCtrl, navParams, fdb, storage, changeref, toast, nativeAudio) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.changeref = changeref;
        this.toast = toast;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UserList = [];
        this.MissionList = [];
        this.MissionDone = [];
        this.MissionDidnot = [];
        this.DetailBox = [];
        //載入成功後，放音樂
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        this.isMatchDone = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    ionViewDidLoad() {
        //撈取資料
        this.loadData_part1();
        //實時更新經驗條
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
        this.missionType = "onClear";
    }
    //Change to detail
    //這個是去看已完成任務的詳細資料
    GotGottonDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            isGot: true,
            MissionName: this.MissionDone[i].MissionName,
            MissionRewardMedal: this.MissionDone[i].MissionRewardMedal,
            MissionRewardExp: this.MissionDone[i].MissionRewardExp,
            MissionRewardPoint: this.MissionDone[i].MissionRewardPoint,
            MissionDetail: this.MissionDone[i].MissionDetail
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mission_detail_mission_detail__["a" /* MissionDetailPage */], this.DetailBox[0]);
    }
    //這個是去看未完成任務的詳細資料
    GotOngottonDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            isGot: false,
            MissionName: this.MissionDidnot[i].MissionName,
            MissionRewardMedal: this.MissionDidnot[i].MissionRewardMedal,
            MissionRewardExp: this.MissionDidnot[i].MissionRewardExp,
            MissionRewardPoint: this.MissionDidnot[i].MissionRewardPoint,
            MissionDetail: this.MissionDidnot[i].MissionDetail
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mission_detail_mission_detail__["a" /* MissionDetailPage */], this.DetailBox[0]);
    }
    //GetUserData
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.GetMissionList();
        });
    }
    //Get Mission Data
    GetMissionList() {
        this.fdb.list("/MissionList").subscribe(data => {
            return new Promise((resolve) => {
                if (data) {
                    this.MissionList = data;
                    resolve(data);
                }
            }).then(resolve => {
                this.UpdateData_firsViewPage();
            });
        });
    }
    //第一次進入頁面判斷
    UpdateData_firsViewPage() {
        let promise = new Promise((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_011) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_011: true,
                        Mission_011: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 50,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：狩獵開始`,
                            duration: 3000
                        }).present();
                    }
                }
                resolve("OK");
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_011) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_011: true,
                        Mission_011: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 50,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：狩獵開始`,
                            duration: 3000
                        }).present();
                    }
                }
                resolve("OK");
            }
        }).then(resolve => {
            this.matchMission();
        });
    }
    //將任務分類為 已完成跟未完成
    matchMission() {
        this.MissionDone = [];
        this.MissionDidnot = [];
        if (this.UserList[this.update_index].Mission_001) {
            this.MissionDone.push(this.MissionList[0]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[0]);
        }
        if (this.UserList[this.update_index].Mission_002) {
            this.MissionDone.push(this.MissionList[1]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[1]);
        }
        if (this.UserList[this.update_index].Mission_003) {
            this.MissionDone.push(this.MissionList[2]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[2]);
        }
        if (this.UserList[this.update_index].Mission_004) {
            this.MissionDone.push(this.MissionList[3]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[3]);
        }
        if (this.UserList[this.update_index].Mission_005) {
            this.MissionDone.push(this.MissionList[4]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[4]);
        }
        if (this.UserList[this.update_index].Mission_007) {
            this.MissionDone.push(this.MissionList[6]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[6]);
        }
        if (this.UserList[this.update_index].Mission_008) {
            this.MissionDone.push(this.MissionList[7]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[7]);
        }
        if (this.UserList[this.update_index].Mission_009) {
            this.MissionDone.push(this.MissionList[8]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[8]);
        }
        if (this.UserList[this.update_index].Mission_010) {
            this.MissionDone.push(this.MissionList[9]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[9]);
        }
        if (this.UserList[this.update_index].Mission_011) {
            this.MissionDone.push(this.MissionList[10]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[10]);
        }
        if (this.UserList[this.update_index].Mission_013) {
            this.MissionDone.push(this.MissionList[12]);
        }
        else {
            this.MissionDidnot.push(this.MissionList[12]);
        }
        this.isMatchDone = true;
    }
};
MissionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-mission',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Mission\mission\mission.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>任務</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list *ngIf="missionType===\'Clear\' && isMatchDone">\n    <ion-item-sliding *ngFor="let mission of MissionDone; let i = index">\n      <button ion-item (click)="GotGottonDetail(i)">\n        <p>{{mission.MissionName}}</p>\n        <p item-end>(1/1)</p>\n      </button>\n    </ion-item-sliding>\n  </ion-list>\n\n\n  <ion-list *ngIf="missionType===\'onClear\' && isMatchDone">\n    <ion-item-sliding *ngFor="let mission of MissionDidnot; let i = index">\n      <button ion-item (click)="GotOngottonDetail(i)">\n        <p>{{mission.MissionName}}</p>\n        <p item-end>(0/1)</p>\n      </button>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer padding>\n  <ion-segment [(ngModel)]="missionType">\n    <ion-segment-button value="onClear">\n      未完成任務\n    </ion-segment-button>\n    <ion-segment-button value="Clear">\n      已完成任務\n    </ion-segment-button>\n  </ion-segment>\n</ion-footer>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Mission\mission\mission.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */]])
], MissionPage);

//# sourceMappingURL=mission.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TipPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tip_detail_tip_detail__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let TipPage = class TipPage {
    constructor(navCtrl, navParams, changeref, fdb, storage, toast, platform, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.changeref = changeref;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UserList = [];
        //Tip
        this.Tips = [];
        this.DetailBox = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    ionViewDidLoad() {
        this.GetTipsList();
        this.loadData_part1();
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
    }
    GetTipsList() {
        this.fdb.list("/TipList").subscribe(data => {
            this.Tips = data;
            //  alert(JSON.stringify(this.Tips));
        });
    }
    GotoTipDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            TipTitle: this.Tips[i].TipTitle,
            TipPic: this.Tips[i].TipPic,
            TipContent: this.Tips[i].TipContent,
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tip_detail_tip_detail__["a" /* TipDetailPage */], this.DetailBox[0]);
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
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.UpdateData_firstVivePage();
        });
    }
    //第一次進入頁面
    UpdateData_firstVivePage() {
        //   alert(JSON.stringify("UpdateData"));
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_010) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_010: true,
                    Mission_010: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：指引!?`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_010) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_010: true,
                    Mission_010: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：指引!?`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
    add() {
        this.fdb.list("/TipList").push({
            TipTitle: "彰化師範大學寶山校區",
            TipNo: "001",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%9C%B0%E5%9C%96.jpg?alt=media&token=54c3fc16-7db7-4980-84f5-ec10839de0bb",
            TipContent: "寶山校區的警衛室位於師大路及寶山路的交接處，朝著警衛室西邊的寶山路前進，沿途會經過創新育成中心、甲區變電站，通過地下道後，緊接而來的是第九宿舍與在它後方的疊球場，在往前約五百公尺的路程，則到抵達黑松林，以及校區最西方的排球場。另一方，若從警衛室東北方道路前進，穿越了汽車停車場順著道路直行，在右手邊依序經過了總變電站、淨水場與經世館，走到深水井時往左轉，再稍走一段路程，在道路的左方將會經過力行館及相隔約五十公尺的人工湖，繞過校區最北的污水處理場後，約莫五百公尺的路程，將會抵達落在寶山校區的網球場，再往前直行，依序會看見教學二館、教學一館與教學大樓。",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "機械大樓(力行館)",
            TipNo: "002",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%8A%9B%E8%A1%8C%E9%A4%A8.JPG?alt=media&token=d6db5714-5b6c-4afb-aca9-9eea8d161fcd",
            TipContent: "地上6樓、地下1樓的建築物，寶山校區衛生保健組（健康中心）設於地下1樓，工業教育與技術學系、人力資源管理研究所。",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "管理學院大樓(經世館)",
            TipNo: "003",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E7%AE%A1%E7%90%86%E5%AD%B8%E9%99%A2.jpg?alt=media&token=239abde0-c8fa-428a-be95-53c2033da884",
            TipContent: "本院設有企業管理學系（所）、行銷與流通管理研究所、會計學系（所）、資訊管理學系（所）、數位內容科技與管理研究所。在推廣教育方面，現有國際企業經營管理碩士學位(IMBA)班、企業高階管理碩士學位(EMBA)班、創新與管理碩士學位(IMMBA)班。",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "工學院",
            TipNo: "004",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E5%B7%A5%E5%AD%B8%E9%99%A2.jpg?alt=media&token=3cabc181-2266-429b-ac76-65cf8e1838ec",
            TipContent: "工學院於民國91年8月成立，目前設有資訊工程學系(大學部、資訊工程學系碩士班、資訊工程學系積體電路設計碩士班)、電子工程學系(大學部、碩士班)、電機工程學系(大學部、碩士班、博士班)、機電工程學系(大學部、碩士班、博士班)及電信工程研究所(碩士班)等4系1所。",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "寶山教學ㄧ館",
            TipNo: "005",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E6%95%99%E5%AD%B8%E4%B8%80%E9%A4%A8.JPG?alt=media&token=d8a8a376-a66a-423a-857c-43d382d740fe",
            TipContent: "地上4樓、地下3樓的建築物，寶山文書收發組（學生領取信件處）設於1樓，1樓教室為教一會、教一商，2樓教室為教一企、教一資、教一小",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "寶山教學二館",
            TipNo: "006",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E6%95%99%E5%AD%B8%E4%BA%8C%E9%A4%A8.jpg?alt=media&token=f50a2529-c85e-4c28-9202-0000eaa28ca2",
            TipContent: "學生諮商輔導中心寶山分處，自西元2010年3月15日起設於4樓",
        });
        this.fdb.list("/TipList").push({
            TipTitle: "第九宿舍",
            TipNo: "007",
            TipPic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%AF%B6%E5%B1%B1%E6%A0%A1%E5%8D%80%2F%E5%AF%B6%E5%B1%B1%E7%AC%AC%E4%B9%9D%E5%AE%BF%E8%88%8D.jpg?alt=media&token=17e1b972-c7c7-4d49-9408-92b1be59ceed",
            TipContent: "彰化師範大學寶山校區唯一的一棟宿舍，一共有八層樓，一樓到五樓提供男同學住宿；六樓到八樓提供女同學住宿。所以、第9宿舍學習專區三樓為男生學習專區，六樓為女生學習專區。",
        });
    }
};
TipPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-tip',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Tip\tip\tip.html"*/'<!--\n  Generated template for the TipPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>提示</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let tip of Tips; let i = index">\n      <button ion-item (click)="GotoTipDetail(i)">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-3>\n              <ion-avatar>\n                <img src="{{tip.TipPic}}" />\n              </ion-avatar>\n            </ion-col>\n            <ion-col col-9>\n              <div>{{tip.TipTitle}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </button>\n      <ion-item-options>\n        <button danger>詳細</button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Tip\tip\tip.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_audio__["a" /* NativeAudio */]])
], TipPage);

//# sourceMappingURL=tip.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TipDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TipDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let TipDetailPage = class TipDetailPage {
    constructor(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.Tips = [];
        this.Tips = this.navParams.data;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TipDetailPage');
    }
};
TipDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-tip-detail',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Tip\tip-detail\tip-detail.html"*/'<!--\n  Generated template for the TipDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{Tips.TipTitle}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <img src="{{Tips.TipPic}}" />\n  <p>{{Tips.TipTitle}}</p>\n  <p>{{Tips.TipContent}}</p>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Tip\tip-detail\tip-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], TipDetailPage);

//# sourceMappingURL=tip-detail.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__email_register_email_register__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SearchCard_uesr_information_uesr_information__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let EmailLoginPage = class EmailLoginPage {
    constructor(navCtrl, navParams, afAuth, storage, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.storage = storage;
        this.toast = toast;
        this.user_email = {};
        this.WayToLogin = {};
        this.user_email.UserEmail = "";
        this.user_email.UserPassword = "";
        this.isLogin = false;
    }
    email_login(user_email) {
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signInWithEmailAndPassword(user_email.UserEmail, user_email.UserPassword).then(() => {
            this.WayToLogin = {
                UserUID: this.user_email.UserEmail,
                WhichWay: "Email",
            };
            this.storage.remove('Way').then(() => {
                this.storage.set('Way', this.WayToLogin).then(() => {
                    this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */]);
                });
            });
        }).catch(function (error) {
            alert("帳號/密碼錯誤喔");
        });
    }
    ToRegister() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__email_register_email_register__["a" /* EmailRegisterPage */]);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad EmailLoginPage');
    }
};
EmailLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-email-login',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\email-login\email-login.html"*/'<!--\n  Generated template for the EmailLoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Email 登入</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label floating>Email Address</ion-label>\n    <ion-input type="text" value="" [(ngModel)]="user_email.UserEmail"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Email Password</ion-label>\n    <ion-input type="password" value="" [(ngModel)]="user_email.UserPassword"></ion-input>\n  </ion-item>\n\n  <button ion-button block (click)="email_login(user_email)">登入</button>\n  <button ion-button block (click)="ToRegister()">註冊</button>\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\email-login\email-login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], EmailLoginPage);

//# sourceMappingURL=email-login.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * Generated class for the EmailRegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let EmailRegisterPage = class EmailRegisterPage {
    constructor(navCtrl, navParams, afauth, toast, fdb, alertCtrl, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afauth = afauth;
        this.toast = toast;
        this.fdb = fdb;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.useURI = false;
        this.user_email = {};
        this.imageData = "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%A4%A7%E9%A0%AD%E8%B2%BC%2FNoName.png?alt=media&token=1da275c3-ad1e-4972-a307-b9b8deb2b85c";
        this.downloadURL = "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E5%A4%A7%E9%A0%AD%E8%B2%BC%2FNoName.png?alt=media&token=1da275c3-ad1e-4972-a307-b9b8deb2b85c";
        this.isChanagePic = false;
    }
    email_register(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.afauth.auth.createUserWithEmailAndPassword(user_email.UserEmail, user_email.UserPassword);
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
        });
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
        });
        this.fdb.list("/map/" + this.uid).push({
            type: "System",
            lat: this.lat,
            lon: this.lon,
            representative: 2,
            isDone: false,
            content: "聽說在310附近有一些線索.."
        });
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
            }
            else {
                this.add();
            }
            //   
        });
    }
    getPicture(sourceType) {
        //  alert('getPicture');
        const options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 800,
            targetHeight: 800,
            sourceType: sourceType,
        };
        this.camera.getPicture(options).then((imageData) => {
            //  alert('~?');
            this.isChanagePic = true;
            this.imageData = 'data:image/jpeg;base64,' + imageData;
        });
    }
    upload() {
        //  alert('upload');
        let storageRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage().ref();
        // Create a timestamp as filename
        const filename = Math.floor(Date.now() / 1000);
        // Create a reference to 'images/todays-date.jpg'
        const imageRef = storageRef.child('大頭貼/' + filename + '.jpg');
        var uploadTask = imageRef.putString(this.imageData, __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage.StringFormat.DATA_URL);
        uploadTask.then((snapshot) => {
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
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('useURI'),
    __metadata("design:type", Boolean)
], EmailRegisterPage.prototype, "useURI", void 0);
EmailRegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-email-register',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\email-register\email-register.html"*/'<!--\n  Generated template for the EmailRegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Email 註冊</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n\n    <ion-card-content>\n      <img src="{{imageData}}" />\n    </ion-card-content>\n  </ion-card>\n\n  <ion-item>\n    <p>請輸入正確信箱格式，且密碼需為六位元以上</p>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Email Address</ion-label>\n    <ion-input type="text" value="" [(ngModel)]="user_email.UserEmail"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Email Password</ion-label>\n    <ion-input type="password" value="" [(ngModel)]="user_email.UserPassword"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>名字</ion-label>\n    <ion-input type="text" value="" [(ngModel)]="user_email.UserName"></ion-input>\n  </ion-item>\n  <button ion-button block (click)="getPicture(0)">更換大頭貼</button>\n  <button ion-button block (click)="email_register(user_email)">註冊</button>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\email-register\email-register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */]])
], EmailRegisterPage);

//# sourceMappingURL=email-register.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/Friends/add-friend/add-friend.module": [
		416,
		19
	],
	"../pages/Friends/add-team/add-team.module": [
		417,
		18
	],
	"../pages/Friends/add-teammember/add-teammember.module": [
		418,
		17
	],
	"../pages/Friends/chatroom/chatroom.module": [
		419,
		16
	],
	"../pages/Friends/personal-chat/personal-chat.module": [
		420,
		15
	],
	"../pages/Friends/team-chat/team-chat.module": [
		421,
		14
	],
	"../pages/Friends/team-info/team-info.module": [
		422,
		13
	],
	"../pages/Friends/team-member/team-member.module": [
		423,
		12
	],
	"../pages/Investigate/ibeacon-hunting/ibeacon-hunting.module": [
		424,
		11
	],
	"../pages/Investigate/quiz/quiz.module": [
		425,
		10
	],
	"../pages/Leaderboard/leaderboard/leaderboard.module": [
		426,
		9
	],
	"../pages/Mission/mission-detail/mission-detail.module": [
		427,
		8
	],
	"../pages/Mission/mission/mission.module": [
		428,
		7
	],
	"../pages/SearchCard/medals-detail/medals-detail.module": [
		429,
		6
	],
	"../pages/SearchCard/medals/medals.module": [
		430,
		5
	],
	"../pages/SearchCard/uesr-information/uesr-information.module": [
		431,
		4
	],
	"../pages/Tip/tip-detail/tip-detail.module": [
		435,
		3
	],
	"../pages/Tip/tip/tip.module": [
		432,
		2
	],
	"../pages/Welcome/email-login/email-login.module": [
		433,
		1
	],
	"../pages/Welcome/email-register/email-register.module": [
		434,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImghandlerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file_chooser__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let ImghandlerProvider = class ImghandlerProvider {
    constructor(filechooser) {
        this.filechooser = filechooser;
        this.firestore = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage();
    }
    /*
    
    For uploading an image to firebase storage.
   
    Called from - profilepic.ts
    Inputs - None.
    Outputs - The image url of the stored image.
     
     */
    //上傳隊伍照片
    uploadimage() {
        var promise = new Promise((resolve, reject) => {
            this.filechooser.open().then((url) => {
                window.FilePath.resolveNativePath(url, (result) => {
                    this.nativepath = result;
                    window.resolveLocalFileSystemURL(this.nativepath, (res) => {
                        res.file((resFile) => {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = (evt) => {
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                var imageStore = this.firestore.ref('/profileimages').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid);
                                imageStore.put(imgBlob).then((res) => {
                                    this.firestore.ref('/profileimages').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).getDownloadURL().then((url) => {
                                        resolve(url);
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                }).catch((err) => {
                                    reject(err);
                                });
                            };
                        });
                    });
                });
            });
        });
        return promise;
    }
    //隊伍照片儲存到資料庫
    grouppicstore(groupname) {
        var promise = new Promise((resolve, reject) => {
            this.filechooser.open().then((url) => {
                window.FilePath.resolveNativePath(url, (result) => {
                    this.nativepath = result;
                    window.resolveLocalFileSystemURL(this.nativepath, (res) => {
                        res.file((resFile) => {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = (evt) => {
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                var imageStore = this.firestore.ref('/groupimages').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(groupname);
                                imageStore.put(imgBlob).then((res) => {
                                    this.firestore.ref('/profileimages').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(groupname).getDownloadURL().then((url) => {
                                        resolve(url);
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                }).catch((err) => {
                                    reject(err);
                                });
                            };
                        });
                    });
                });
            });
        });
        return promise;
    }
    //照片儲存到資料庫
    picmsgstore() {
        var promise = new Promise((resolve, reject) => {
            this.filechooser.open().then((url) => {
                window.FilePath.resolveNativePath(url, (result) => {
                    this.nativepath = result;
                    window.resolveLocalFileSystemURL(this.nativepath, (res) => {
                        res.file((resFile) => {
                            var reader = new FileReader();
                            reader.readAsArrayBuffer(resFile);
                            reader.onloadend = (evt) => {
                                var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                                var uuid = this.guid();
                                var imageStore = this.firestore.ref('/picmsgs').child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child('picmsg' + uuid);
                                imageStore.put(imgBlob).then((res) => {
                                    resolve(res.downloadURL);
                                }).catch((err) => {
                                    reject(err);
                                })
                                    .catch((err) => {
                                    reject(err);
                                });
                            };
                        });
                    });
                });
            });
        });
        return promise;
    }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};
ImghandlerProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_file_chooser__["a" /* FileChooser */]])
], ImghandlerProvider);

//# sourceMappingURL=imghandler.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IBeaconProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_ibeacon__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the IBeaconProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let IBeaconProvider = class IBeaconProvider {
    constructor(platform, events, ibeacon) {
        /*
                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(
                    data => this.events.publish('didRangeBeaconsInRegion', data),
                    error => console.error()
                    );
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");*/
        this.platform = platform;
        this.events = events;
        this.ibeacon = ibeacon;
        console.log('Hello BeaconProvider Provider');
    }
    startScan() {
        let promise = new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(data => this.events.publish('didRangeBeaconsInRegion', data), error => console.error());
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
                this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
                    .then(() => { resolve(true); }, error => { resolve(false); });
            }
            else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;
    }
    stopScan() {
        let promise = new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(data => this.events.publish('didRangeBeaconsInRegion', data), error => console.error());
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
                this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                    .then(() => { resolve(true); }, error => { resolve(false); });
            }
            else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;
        //       this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    }
    /*  stopScan(): any {
          let promise = new Promise((resolve, reject) => {
              if (this.platform.is('cordova')) {
                  // Request permission to use location on iOS
                  this.ibeacon.requestAlwaysAuthorization();
                  // create a new delegate and register it with the native layer
                  this.delegate = this.ibeacon.Delegate();
                  // Subscribe to some of the delegate's event handlers
                  this.delegate.didRangeBeaconsInRegion()
                      .subscribe(
                      data => this.events.publish('didRangeBeaconsInRegion', data),
                      error => console.error()
                      );
                  this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
  
                  this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                      .then(
                      () => { resolve(true); },
                      error => { resolve(false); }
                      );
              }
              else {
                  console.error("This application needs to be running on a device");
                  resolve(false);
              }
          });
          return promise;
      }
  */
    checkBLE() {
        if (!this.ibeacon.isBluetoothEnabled()) {
            this.ibeacon.enableBluetooth();
        }
    }
};
IBeaconProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_ibeacon__["a" /* IBeacon */]])
], IBeaconProvider);

//# sourceMappingURL=i-beacon.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
let DataProvider = class DataProvider {
    constructor(http) {
        this.http = http;
    }
    load_I() {
        this.data = false;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/questions_I.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
        });
    }
    load_T() {
        this.data = false;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/questions_T.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
        });
    }
    load_M() {
        this.data = false;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/questions_M.json').map(res => res.json()).subscribe(data => {
                this.data = data.questions;
                resolve(this.data);
            });
        });
    }
};
DataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], DataProvider);

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SearchCard_uesr_information_uesr_information__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__email_login_email_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_audio__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let WelcomePage = class WelcomePage {
    constructor(navCtrl, fdb, storage, platform, nativeAudio) {
        this.navCtrl = navCtrl;
        this.fdb = fdb;
        this.storage = storage;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UsedUserCheck = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('welcome');
            this.nativeAudio.unload('information');
            this.nativeAudio.unload('ibeacon');
            //   this.nativeAudio.play('track1');
        };
        this.loadData();
        this.isUsedUser = false;
        this.CountForUser = 0;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('welcome', 'assets/audio/bgm_welcome.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    loginWithFacebook() {
        let provider = new __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth.FacebookAuthProvider();
        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().signInWithRedirect(provider).then(() => {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().getRedirectResult().then((result) => {
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
        });
    }
    ngOnDestroy() {
        this.nativeAudio.unload('welcome');
    }
    loginWithEmail() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__email_login_email_login__["a" /* EmailLoginPage */]);
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
                resolve("Done");
            }
        }).then(resolve => {
            this.clue();
        });
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
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */]);
                    });
                });
            });
        }
        else {
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
                });
                this.WayToLogin = {
                    UserUID: this.CatchData.user.uid,
                    WhichWay: "FB",
                };
                this.storage.remove('Way').then(() => {
                    this.storage.set('Way', this.WayToLogin).then(() => {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */]);
                    });
                });
            });
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
        });
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
], WelcomePage.prototype, "slides", void 0);
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\welcome\welcome.html"*/'<ion-content no-bounce>\n    <ion-slides autoplay="6500" loop="false" effect="fade" (ionSlideReachEnd)="slideEnd()">\n\n        <ion-slide style="background: black">\n            <h2>在2017年11月1號的半夜，\n                <br>彰化師範大學寶山校區管理學院發生了一起兇殺案...\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n            <h2>兇手手法十分殘忍，\n                <br>屍體臉部有數刀劃過的痕跡\n                <br>還有輕微被腐蝕過的灼傷\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n            <h2>因此，學校從全校學生中挑選幾名菁英份子\n                <br>想要抓出這名兇殘的惡徒\n                <br>而你，就是萬中選一的菁英\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n            <h2>你可以選擇與他人合作\n                <br>將惡徒盡早繩之以法\n                <br>也可以憑藉自己的聰穎天賦\n                <br>成為大英雄\n                <br>在歷史上永世留名\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n            <h2>接下來部分為大致頁面的教學\n                <br>您也可以透過最下方的Skip跳過\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/open.jpg\')">\n            <h1>「iBeacon偵探」提供兩種\n                <br>登入方式給你自由選擇</h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/information.jpg\')">\n            <h1>登入後會進入搜查證頁面\n                <br>在這可以看到您的個人資訊，包括點數、經驗值、已取得的獎章\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/medal.jpg\')">\n            <h1>可以透過在搜查證頁面點擊獎章\n                <br>查看已取得的獎章的詳細資料\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/sidemenu.jpg\')">\n            <h1>您可以透過左上的側邊欄位\n                <br>切換到您想去的頁面\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/mission.jpg\')">\n            <h1>任務頁面中分為已完成的任務以及尚未完成的任務\n                <br>點擊任務可以看到完成條件以及獎勵\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/tip.jpg\')">\n            <h1>提示頁面則包含了日後玩家在搜索階段會碰到的挑戰的相關提示\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/map.jpg\')">\n            <h1>搜查頁面則為玩家需要實地探索的目的地\n                <br>當玩家接近圖標後，會觸發搜查事件\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/getibeacon.jpg\')">\n            <h1>搜查事件會以彈出式視窗詢問玩家參與的意願，玩家可自由選擇參加與否\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/quiz.jpg\')">\n            <h1>搜查線索的過程都會是以問答選擇題的方式進行\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/friend.jpg\')">\n            <h1>在好友頁面，玩家可以看到自己的好友列表以及隊伍列表，透過點擊右方圖示，進入添加好友的頁面\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/addfriend.jpg\')">\n            <h1>玩家自由選取想要申請加入好友的玩家\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/talk.jpg\')">\n            <h1>而回到好友頁面，點擊該名玩家名稱，即可與好友交流\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/team.jpg\')">\n            <h1>在好友頁面點擊創建隊伍，可以進入創隊伍的頁面\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/teamtalk.jpg\')">\n            <h1>而在隊伍的聊天室中，可以發送目前的所在位置以及想要告知隊友的事情給隊員\n            </h1>\n            <h1>隊員可以在搜查頁面看到不同的資訊\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background-image: url(\'assets/img/welcome/leaderboard.jpg\')">\n            <h1>排行榜頁面則可以看到自己與其他玩家之間的積分差距。\n            </h1>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n            <h2>那麼...\n                <br>「iBeacon偵探」正式開始...\n                <br>\n                <br>\n            </h2>\n            <p (click)=" skipSlider()">>>skip</p>\n        </ion-slide>\n\n        <ion-slide style="background: black">\n\n            <h2>\n                <br>本應用所使用的登入為\n                <br>「Facebook OAuth第三方登入」\n                <br>以及「E-mail」登入\n                <br>僅使用於本研究中\n                <br>且僅使用公開的資訊。</h2>\n            <button ion-button block icon-start color="dark" (click)="loginWithFacebook()">\n                <ion-icon name="logo-facebook"></ion-icon> Facebook登入</button>\n\n            <button ion-button block icon-start color="dark" (click)="loginWithEmail()">\n                <ion-icon name="mail"></ion-icon> Email登入</button>\n        </ion-slide>\n\n\n    </ion-slides>\n\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Welcome\welcome\welcome.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_native_audio__["a" /* NativeAudio */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MurdererPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__murderer_detail_murderer_detail__ = __webpack_require__(278);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the MurdererPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let MurdererPage = class MurdererPage {
    constructor(navCtrl, navParams, fdb, storage, platform, nativeAudio, changeref) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.changeref = changeref;
        this.WayToLogin = {};
        this.UserList = [];
        this.DetailBox = [];
        this.MurdererList = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    ionViewDidLoad() {
        this.loadData_part1();
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
    }
    //Change to detail
    GotoDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            Name: this.MurdererList[i].Name,
            Answer: this.MurdererList[i].Answer,
            Confession: this.MurdererList[i].Confession,
            Department: this.MurdererList[i].Department,
            Pic: this.MurdererList[i].Pic,
            Talk: this.MurdererList[i].Talk,
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__murderer_detail_murderer_detail__["a" /* MurdererDetailPage */], this.DetailBox[0]);
    }
    //GetUserData
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.GetMurdererList();
        });
    }
    GetMurdererList() {
        this.fdb.list("/MurdererList").subscribe(data => {
            return new Promise((resolve) => {
                if (data) {
                    this.MurdererList = data;
                    resolve(data);
                }
            });
        });
    }
    AddMedal() {
        this.fdb.list("/MurdererList").push({
            Name: "張樂哲",
            Confession: "哈~?，我確實在那天晚上快10點的時候有走地下道，我只是每晚都會走到校園內散散步，怎麼，散步也犯法了嗎?",
            Department: "機電工程學系",
            Answer: false,
            Pic: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/murderer%2F%E5%BC%B5%E6%A8%82%E5%93%B2.png?alt=media&token=31b04400-fb51-4c09-8705-bfdebf79fec0"
        });
    }
};
MurdererPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-murderer',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Murderer\murderer\murderer.html"*/'<!--\n  Generated template for the MurdererPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title (click)="AddMedal()">嫌疑人/證人</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list>\n    <ion-item *ngFor="let murderer of MurdererList; let i = index">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <ion-avatar>\n              <img src="{{murderer.Pic}}" />\n            </ion-avatar>\n          </ion-col>\n          <ion-col col-4>\n            <h2>{{murderer.Name}}</h2>\n          </ion-col>\n          <ion-col col-4>\n            <button ion-button (click)="GotoDetail(i)">>查看口供</button>\n          </ion-col>\n\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Murderer\murderer\murderer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
], MurdererPage);

//# sourceMappingURL=murderer.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MurdererDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MurdererDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let MurdererDetailPage = class MurdererDetailPage {
    constructor(navCtrl, navParams, fdb, storage, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.murdererBox = {};
        this.WayToLogin = {};
        this.UserList = [];
        this.murdererBox = this.navParams.data;
        this.isGetData = false;
    }
    ionViewDidLoad() {
        this.loadData_part1();
    }
    //GetUserData
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        });
    }
    identify() {
        if (this.UserList[this.update_index].Quiz_I && this.UserList[this.update_index].Quiz_T && this.UserList[this.update_index].Quiz_M && this.murdererBox.Answer) {
            alert("呿，哈哈哈哈阿，結果還是被抓到了");
            alert("事件已經破案，將獲得經驗值、積分。");
            this.Over();
        }
        else {
            alert(this.murdererBox.Talk);
        }
    }
    Over() {
        let promise = new Promise((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_013) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_013: true,
                        Mission_013: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 300,
                        UserExp: this.UserList[this.update_index].UserExp + 500,
                        UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 500)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：懲凶緝惡`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_013) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_013: true,
                        Mission_013: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 300,
                        UserExp: this.UserList[this.update_index].UserExp + 500,
                        UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 500)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：懲凶緝惡`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
        });
    }
};
MurdererDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-murderer-detail',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\Murderer\murderer-detail\murderer-detail.html"*/'<!--\n  Generated template for the MurdererDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <img src="{{murdererBox.Pic}}" />\n\n    <ion-card-content>\n      <ion-card-title>\n        {{murdererBox.Name}}\n      </ion-card-title>\n      <p>{{murdererBox.Department}}</p>\n      <br>\n      <p>{{murdererBox.Confession}}</p>\n      <button ion-button full (click)="identify()">凶手就是你</button>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\Murderer\murderer-detail\murderer-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], MurdererDetailPage);

//# sourceMappingURL=murderer-detail.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedalsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__medals_detail_medals_detail__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MedalsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let MedalsPage = class MedalsPage {
    constructor(navCtrl, navParams, fdb, storage, changeref, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.changeref = changeref;
        this.toast = toast;
        this.WayToLogin = {};
        this.UserList = [];
        this.MedalList = [];
        this.MedalDone = [];
        this.MedalDidnot = [];
        this.DetailBox = [];
        this.isGetData = false;
        this.isMatchDone = false;
    }
    ionViewDidLoad() {
        this.loadData_part1();
        setInterval(() => {
            if (this.isGetData) {
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / (this.UserList[this.update_index].UserLv * 200) * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
        this.medalType = "onGet";
    }
    //Change to detail
    GotGottonDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            isGot: true,
            MedalName: this.MedalDone[i].MedalName,
            MedalNo: this.MedalDone[i].MedalNo,
            MedalURL: this.MedalDone[i].MedalURL,
            GetWays: this.MedalDone[i].GetWays,
            Description: this.MedalDone[i].Description
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__medals_detail_medals_detail__["a" /* MedalsDetailPage */], this.DetailBox[0]);
    }
    GotOngottonDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            isGot: false,
            MedalName: this.MedalDidnot[i].MedalName,
            MedalNo: this.MedalDidnot[i].MedalNo,
            MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%B0%9A%E6%9C%AA%E5%8F%96%E5%BE%97.png?alt=media&token=363bda5c-2ff6-4f45-be52-13bc641f7ad1",
            GetWays: this.MedalDidnot[i].GetWays,
            Description: this.MedalDidnot[i].Description
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__medals_detail_medals_detail__["a" /* MedalsDetailPage */], this.DetailBox[0]);
    }
    //GetUserData
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.GetMedalList();
        });
    }
    //Get Medal Data
    GetMedalList() {
        this.fdb.list("/MedalList").subscribe(data => {
            return new Promise((resolve) => {
                if (data) {
                    this.MedalList = data;
                    resolve(data);
                }
            }).then(resolve => {
                //  alert("GetMedalList Over");
                this.UpdateData_firsViewPage();
                //  this.matchMedal();
            });
        });
    }
    matchMedal() {
        this.MedalDone = [];
        this.MedalDidnot = [];
        if (this.UserList[this.update_index].Medal_001) {
            this.MedalDone.push(this.MedalList[0]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[0]);
        }
        if (this.UserList[this.update_index].Medal_002) {
            this.MedalDone.push(this.MedalList[1]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[1]);
        }
        if (this.UserList[this.update_index].Medal_003) {
            this.MedalDone.push(this.MedalList[2]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[2]);
        }
        if (this.UserList[this.update_index].Medal_004) {
            this.MedalDone.push(this.MedalList[3]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[3]);
        }
        if (this.UserList[this.update_index].Medal_005) {
            this.MedalDone.push(this.MedalList[4]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[4]);
        }
        if (this.UserList[this.update_index].Medal_006) {
            this.MedalDone.push(this.MedalList[5]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[5]);
        }
        if (this.UserList[this.update_index].Medal_007) {
            this.MedalDone.push(this.MedalList[6]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[6]);
        }
        if (this.UserList[this.update_index].Medal_008) {
            this.MedalDone.push(this.MedalList[7]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[7]);
        }
        if (this.UserList[this.update_index].Medal_009) {
            this.MedalDone.push(this.MedalList[8]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[8]);
        }
        if (this.UserList[this.update_index].Medal_010) {
            this.MedalDone.push(this.MedalList[9]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[9]);
        }
        if (this.UserList[this.update_index].Medal_011) {
            this.MedalDone.push(this.MedalList[10]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[10]);
        }
        if (this.UserList[this.update_index].Medal_012) {
            this.MedalDone.push(this.MedalList[11]);
        }
        else {
            this.MedalDidnot.push(this.MedalList[11]);
        }
        this.isMatchDone = true;
    }
    //第一次進入頁面判斷
    UpdateData_firsViewPage() {
        let promise = new Promise((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_009) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_009: true,
                        Mission_009: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 50,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：榮耀`,
                            duration: 3000
                        }).present();
                    }
                }
                resolve("OK");
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_009) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_009: true,
                        Mission_009: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 50,
                        UserExp: this.UserList[this.update_index].UserExp + 25,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：榮耀`,
                            duration: 3000
                        }).present();
                    }
                }
                resolve("OK");
            }
        }).then(resolve => {
            this.matchMedal();
        });
    }
    AddMedal() {
        /*   this.fdb.list("/MedalList").push({
             MedalName: "小偵探",
             MedalNo: "001",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%B0%8F%E5%81%B5%E6%8E%A2.png?alt=media&token=8f11983b-4f68-4f7c-972b-23a02346d837",
             GetWays: "完成任務「初次踏入」",
             Description: "玩家第一次登入，接受使命的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "搜查證明",
             MedalNo: "002",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%90%9C%E6%9F%A5%E8%AD%89%E6%98%8E.png?alt=media&token=be9d16e3-b57a-4b47-bf61-e249808fa8c4",
             GetWays: "完成任務「察看搜查證」",
             Description: "玩家第一次查看個人資訊的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "開始交流",
             MedalNo: "003",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E9%96%8B%E5%A7%8B%E4%BA%A4%E6%B5%81.png?alt=media&token=4cc14943-3a6d-48d4-b349-750f86862acc",
             GetWays: "完成任務「同業攀談」",
             Description: "玩家第一次進入聊天室的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "起步偵查",
             MedalNo: "004",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B5%B7%E6%AD%A5%E5%81%B5%E6%9F%A5.png?alt=media&token=89745a2b-9e6c-426b-8397-47950d17cc9a",
             GetWays: "完成任務「首次偵查線索」",
             Description: "玩家第一次進入偵查頁面的證明",
           })
           this.fdb.list("/MedalList").push({
             MedalName: "勁敵",
             MedalNo: "005",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%8B%81%E6%95%B5.png?alt=media&token=a230ba20-da76-4f9e-9d47-a7154380bd34",
             GetWays: "完成任務「同業競爭」",
             Description: "玩家第一次查看排行榜的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "我不是邊緣人",
             MedalNo: "006",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%88%90%E7%BE%A4%E7%B5%90%E9%9A%8A.png?alt=media&token=cdf1937b-78e1-463c-83d4-423bea9aca7f",
             GetWays: "完成任務「出外靠朋友」",
             Description: "當玩家第一次與其他玩家成為朋友的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "接近犯人的第一步",
             MedalNo: "007",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%8E%A5%E8%BF%91%E7%8A%AF%E4%BA%BA%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5.png?alt=media&token=0340e620-58c9-400c-b8bc-043e7d1cd973",
             GetWays: "完成任務「實力的證明」",
             Description: "玩家第一次取得線索，所給予的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "踏入禁區",
             MedalNo: "008",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B8%8F%E5%85%A5%E7%A6%81%E5%8D%80.png?alt=media&token=f1ace902-d79c-41cd-b92e-58b5b6ce7a85",
             GetWays: "完成任務「現場搜查」",
             Description: "當玩家第一次接受線索偵查活動的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "蒐藏家",
             MedalNo: "009",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%94%B6%E8%97%8F%E5%AE%B6.png?alt=media&token=de0a9178-21d9-4018-a367-281cc620d990",
             GetWays: "完成任務「榮耀」",
             Description: "當玩家第一次進入獎章頁面的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "閱讀者",
             MedalNo: "010",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E9%96%B1%E8%AE%80%E8%80%85.png?alt=media&token=b2b8b973-5beb-4375-a957-4d39572dc841",
             GetWays: "完成任務「指引!?」",
             Description: "當玩家第一次進入提示頁面的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "賞金獵人",
             MedalNo: "011",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%B3%9E%E9%87%91%E7%8D%B5%E4%BA%BA.png?alt=media&token=2c264b07-41aa-4c1d-b5c6-cbc7181b09c1",
             GetWays: "完成任務「狩獵開始」",
             Description: "當玩家第一次進入任務頁面的證明"
           })
           this.fdb.list("/MedalList").push({
             MedalName: "成群結隊",
             MedalNo: "012",
             MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E6%88%90%E7%BE%A4%E7%B5%90%E9%9A%8A.png?alt=media&token=cdf1937b-78e1-463c-83d4-423bea9aca7f",
             GetWays: "完成任務「人海戰術」",
             Description: "當玩家第一次與其他玩家組隊的證明"
           })
       */
        this.fdb.list("/MedalList").push({
            MedalName: "英雄",
            MedalNo: "013",
            MedalURL: "https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E8%8B%B1%E9%9B%84.png?alt=media&token=1b12231d-d0c1-46b4-974c-257edc6791f1",
            GetWays: "完成任務「懲凶緝惡」",
            Description: "玩家找出正確兇手的證明"
        });
        //-----------------------------------------------------------------
        /*
            this.fdb.list("/MissionList").push({
              MissionNo: "001",
              MissionName: "初次踏入",
              MissionDetail: "首次登入系統，不限任何登入方式",
              MissionRewardPoint: 20,
              MissionRewardMedal: "小偵探",
              MissionRewardExp: 100,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "002",
              MissionName: "查看搜查證",
              MissionDetail: "首次觀看個人資料",
              MissionRewardPoint: 20,
              MissionRewardMedal: "搜查證明",
              MissionRewardExp: 200,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "003",
              MissionName: "同業攀談",
              MissionDetail: "首次進入聊天室",
              MissionRewardPoint: 50,
              MissionRewardMedal: "開始交流",
              MissionRewardExp: 300,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "004",
              MissionName: "首次偵查線索",
              MissionDetail: "首次進入偵查頁面",
              MissionRewardPoint: 40,
              MissionRewardMedal: "起步偵查",
              MissionRewardExp: 300,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "005",
              MissionName: "同業競爭",
              MissionDetail: "首次觀看排行榜",
              MissionRewardPoint: 30,
              MissionRewardMedal: "勁敵",
              MissionRewardExp: 250,
            })
        
        
            this.fdb.list("/MissionList").push({
              MissionNo: "006",
              MissionName: "出外靠朋友",
              MissionDetail: "首次結交朋友",
              MissionRewardPoint: 50,
              MissionRewardMedal: "我不是邊緣人",
              MissionRewardExp: 250,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "007",
              MissionName: "實力的證明",
              MissionDetail: "第一次找到線索",
              MissionRewardPoint: 50,
              MissionRewardMedal: "接近犯人的第一步",
              MissionRewardExp: 400,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "008",
              MissionName: "現場搜查",
              MissionDetail: "首次接受謎題挑戰",
              MissionRewardPoint: 50,
              MissionRewardMedal: "上工!",
              MissionRewardExp: 250,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "009",
              MissionName: "榮耀",
              MissionDetail: "首次進入獎章頁面",
              MissionRewardPoint: 50,
              MissionRewardMedal: "蒐藏家",
              MissionRewardExp: 250,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "010",
              MissionName: "指引!?",
              MissionDetail: "首次進入提示頁面",
              MissionRewardPoint: 50,
              MissionRewardMedal: "閱讀者",
              MissionRewardExp: 250,
            })
        
            this.fdb.list("/MissionList").push({
              MissionNo: "011",
              MissionName: "狩獵開始",
              MissionDetail: "首次進入任務頁面",
              MissionRewardPoint: 50,
              MissionRewardMedal: "賞金獵人",
              MissionRewardExp: 250,
            })
        
        
            this.fdb.list("/MissionList").push({
              MissionNo: "012",
              MissionName: "出外靠朋友",
              MissionDetail: "首次結交朋友",
              MissionRewardPoint: 50,
              MissionRewardMedal: "蒐藏家",
              MissionRewardExp: 250,
            })
        */
        this.fdb.list("/MissionList").push({
            MissionNo: "013",
            MissionName: "懲凶緝惡",
            MissionDetail: "玩家找出正確凶手",
            MissionRewardPoint: 300,
            MissionRewardMedal: "英雄",
            MissionRewardExp: 500,
        });
    }
};
MedalsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-medals',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\medals\medals.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>獎章</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid *ngIf="isGetData">\n    <ion-segment [(ngModel)]="medalType">\n      <ion-segment-button value="onGet">\n        未獲得\n      </ion-segment-button>\n      <ion-segment-button value="Get">\n        已獲得\n      </ion-segment-button>\n    </ion-segment>\n  </ion-grid>\n\n  <ion-list *ngIf="medalType===\'onGet\' && isMatchDone">\n    <ion-item-sliding *ngFor="let medal of MedalDidnot; let i = index">\n      <button ion-item (click)="GotOngottonDetail(i)">\n        <ion-avatar>\n          <img src="https://firebasestorage.googleapis.com/v0/b/treasurehunting-1499113897925.appspot.com/o/%E7%8D%8E%E7%AB%A0%2F%E7%8D%8E%E7%AB%A0_%E5%B0%9A%E6%9C%AA%E5%8F%96%E5%BE%97.png?alt=media&token=363bda5c-2ff6-4f45-be52-13bc641f7ad1"\n          />\n        </ion-avatar>\n        <p item-end>{{medal.MedalName}}</p>\n      </button>\n    </ion-item-sliding>\n  </ion-list>\n\n\n  <ion-list *ngIf="medalType===\'Get\' && isMatchDone">\n    <ion-item-sliding *ngFor="let medal of MedalDone; let i = index">\n      <button ion-item (click)="GotGottonDetail(i)">\n        <ion-avatar>\n          <img src="{{medal.MedalURL}}" />\n        </ion-avatar>\n        <p item-end>{{medal.MedalName}}</p>\n      </button>\n\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\medals\medals.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], MedalsPage);

//# sourceMappingURL=medals.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(301);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Welcome_welcome_welcome__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Welcome_email_login_email_login__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_Welcome_email_register_email_register__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_Friends_chatroom_chatroom__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Friends_add_friend_add_friend__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_Friends_personal_chat_personal_chat__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_Friends_team_chat_team_chat__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Friends_add_team_add_team__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_Friends_team_info_team_info__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Friends_team_member_team_member__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_Friends_add_teammember_add_teammember__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Investigate_ibeacon_hunting_ibeacon_hunting__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_Investigate_quiz_quiz__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_Leaderboard_leaderboard_leaderboard__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_Mission_mission_mission__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_Mission_mission_detail_mission_detail__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_Murderer_murderer_murderer__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_Murderer_murderer_detail_murderer_detail__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_SearchCard_uesr_information_uesr_information__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_SearchCard_medals_medals__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_SearchCard_medals_detail_medals_detail__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_Tip_tip_tip__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_Tip_tip_detail_tip_detail__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_i_beacon_i_beacon__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_user_user__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_imghandler_imghandler__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_requests_requests__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_chat_chat__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_groups_groups__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_data_data__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_file__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_file_chooser__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_file_path__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_ibeacon__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angularfire2__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_angularfire2_auth__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__app_firebase_config__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_45_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_geolocation__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__components_flash_card_flash_card__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_local_notifications__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_progress_bar_progress_bar__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_native_audio__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_camera__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//Welcome page



//Friends page








//Investigate page


//Leaderboard page

//Mission page


//Murderer page


//SearchCard page



//Tip page


//Provider







//系統中用到的pulgin
















__WEBPACK_IMPORTED_MODULE_45_firebase___default.a.initializeApp({
    apiKey: "AIzaSyBXrwVCFOYqEbPq-Ri25ncGv7ASyfQFkyc",
    authDomain: "treasurehunting-1499113897925.firebaseapp.com",
    databaseURL: "https://treasurehunting-1499113897925.firebaseio.com",
    projectId: "treasurehunting-1499113897925",
    storageBucket: "treasurehunting-1499113897925.appspot.com",
    messagingSenderId: "354775082966"
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_Welcome_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_Leaderboard_leaderboard_leaderboard__["a" /* LeaderboardPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_Friends_chatroom_chatroom__["a" /* ChatroomPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Friends_add_friend_add_friend__["a" /* AddFriendPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_Friends_personal_chat_personal_chat__["a" /* PersonalChatPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_Friends_add_team_add_team__["a" /* AddTeamPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_Friends_add_teammember_add_teammember__["a" /* AddTeammemberPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_Friends_team_chat_team_chat__["a" /* TeamChatPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Friends_team_member_team_member__["a" /* TeamMemberPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_Friends_team_info_team_info__["a" /* TeamInfoPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_SearchCard_medals_medals__["a" /* MedalsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_SearchCard_medals_detail_medals_detail__["a" /* MedalsDetailPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Investigate_ibeacon_hunting_ibeacon_hunting__["a" /* IbeaconHuntingPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_Investigate_quiz_quiz__["a" /* QuizPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_Mission_mission_mission__["a" /* MissionPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_Mission_mission_detail_mission_detail__["a" /* MissionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_Murderer_murderer_murderer__["a" /* MurdererPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_Murderer_murderer_detail_murderer_detail__["a" /* MurdererDetailPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_Tip_tip_tip__["a" /* TipPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_Tip_tip_detail_tip_detail__["a" /* TipDetailPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_Welcome_email_login_email_login__["a" /* EmailLoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_Welcome_email_register_email_register__["a" /* EmailRegisterPage */],
            __WEBPACK_IMPORTED_MODULE_47__components_flash_card_flash_card__["a" /* FlashCardComponent */],
            __WEBPACK_IMPORTED_MODULE_50__components_progress_bar_progress_bar__["a" /* ProgressBarComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_42_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_43_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_41_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_44__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/Friends/add-friend/add-friend.module#AddFriendPageModule', name: 'AddFriendPage', segment: 'add-friend', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/add-team/add-team.module#AddTeamPageModule', name: 'AddTeamPage', segment: 'add-team', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/add-teammember/add-teammember.module#AddTeammemberPageModule', name: 'AddTeammemberPage', segment: 'add-teammember', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/chatroom/chatroom.module#ChatroomPageModule', name: 'ChatroomPage', segment: 'chatroom', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/personal-chat/personal-chat.module#PersonalChatPageModule', name: 'PersonalChatPage', segment: 'personal-chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/team-chat/team-chat.module#TeamChatPageModule', name: 'TeamChatPage', segment: 'team-chat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/team-info/team-info.module#TeamInfoPageModule', name: 'TeamInfoPage', segment: 'team-info', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Friends/team-member/team-member.module#TeamMemberPageModule', name: 'TeamMemberPage', segment: 'team-member', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Investigate/ibeacon-hunting/ibeacon-hunting.module#IbeaconHuntingPageModule', name: 'IbeaconHuntingPage', segment: 'ibeacon-hunting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Investigate/quiz/quiz.module#QuizPageModule', name: 'QuizPage', segment: 'quiz', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Leaderboard/leaderboard/leaderboard.module#LeaderboardPageModule', name: 'LeaderboardPage', segment: 'leaderboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Mission/mission-detail/mission-detail.module#MissionDetailPageModule', name: 'MissionDetailPage', segment: 'mission-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Mission/mission/mission.module#MissionPageModule', name: 'MissionPage', segment: 'mission', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/SearchCard/medals-detail/medals-detail.module#MedalsDetailPageModule', name: 'MedalsDetailPage', segment: 'medals-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/SearchCard/medals/medals.module#MedalsPageModule', name: 'MedalsPage', segment: 'medals', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/SearchCard/uesr-information/uesr-information.module#UesrInformationPageModule', name: 'UesrInformationPage', segment: 'uesr-information', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Tip/tip/tip.module#TipPageModule', name: 'TipPage', segment: 'tip', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Welcome/email-login/email-login.module#EmailLoginPageModule', name: 'EmailLoginPage', segment: 'email-login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Welcome/email-register/email-register.module#EmailRegisterPageModule', name: 'EmailRegisterPage', segment: 'email-register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/Tip/tip-detail/tip-detail.module#TipDetailPageModule', name: 'TipDetailPage', segment: 'tip-detail', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_49__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_Welcome_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_Leaderboard_leaderboard_leaderboard__["a" /* LeaderboardPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_Friends_chatroom_chatroom__["a" /* ChatroomPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_Friends_add_friend_add_friend__["a" /* AddFriendPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_Friends_personal_chat_personal_chat__["a" /* PersonalChatPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_Friends_add_team_add_team__["a" /* AddTeamPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_Friends_add_teammember_add_teammember__["a" /* AddTeammemberPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_Friends_team_chat_team_chat__["a" /* TeamChatPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Friends_team_member_team_member__["a" /* TeamMemberPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_Friends_team_info_team_info__["a" /* TeamInfoPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_SearchCard_medals_medals__["a" /* MedalsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_SearchCard_medals_detail_medals_detail__["a" /* MedalsDetailPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Investigate_ibeacon_hunting_ibeacon_hunting__["a" /* IbeaconHuntingPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_Investigate_quiz_quiz__["a" /* QuizPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_Mission_mission_mission__["a" /* MissionPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_Mission_mission_detail_mission_detail__["a" /* MissionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_Tip_tip_tip__["a" /* TipPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_Tip_tip_detail_tip_detail__["a" /* TipDetailPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_Murderer_murderer_murderer__["a" /* MurdererPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_Murderer_murderer_detail_murderer_detail__["a" /* MurdererDetailPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_Welcome_email_login_email_login__["a" /* EmailLoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_Welcome_email_register_email_register__["a" /* EmailRegisterPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_30__providers_i_beacon_i_beacon__["a" /* IBeaconProvider */],
            __WEBPACK_IMPORTED_MODULE_40__ionic_native_ibeacon__["a" /* IBeacon */],
            __WEBPACK_IMPORTED_MODULE_31__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_32__providers_imghandler_imghandler__["a" /* ImghandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_31__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_33__providers_requests_requests__["a" /* RequestsProvider */],
            __WEBPACK_IMPORTED_MODULE_34__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_35__providers_groups_groups__["a" /* GroupsProvider */],
            __WEBPACK_IMPORTED_MODULE_52__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_native_file_chooser__["a" /* FileChooser */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_46__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_36__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_48__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_51__ionic_native_native_audio__["a" /* NativeAudio */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BeaconModel {
    constructor(beacon) {
        this.beacon = beacon;
        this.uuid = beacon.uuid;
        this.major = beacon.major;
        this.minor = beacon.minor;
        this.rssi = beacon.rssi;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BeaconModel;

//# sourceMappingURL=beacon-model.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_Welcome_welcome_welcome__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_Friends_chatroom_chatroom__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_Investigate_ibeacon_hunting_ibeacon_hunting__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Leaderboard_leaderboard_leaderboard__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Mission_mission_mission__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_Murderer_murderer_murderer__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_SearchCard_uesr_information_uesr_information__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Tip_tip_tip__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Welcome page

//Friends page

//Investigate page

//Leaderboard page

//Mission page

//Murderer page

//SearchCard page

//Tip page

let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_Welcome_welcome_welcome__["a" /* WelcomePage */];
        this.initializeApp();
        this.appMenuItems = [
            { title: '任務', component: __WEBPACK_IMPORTED_MODULE_8__pages_Mission_mission_mission__["a" /* MissionPage */], icon: 'bookmarks' },
            { title: '提示', component: __WEBPACK_IMPORTED_MODULE_11__pages_Tip_tip_tip__["a" /* TipPage */], icon: 'bulb' },
            { title: '偵查', component: __WEBPACK_IMPORTED_MODULE_6__pages_Investigate_ibeacon_hunting_ibeacon_hunting__["a" /* IbeaconHuntingPage */], icon: 'search' },
            { title: '搜查證', component: __WEBPACK_IMPORTED_MODULE_10__pages_SearchCard_uesr_information_uesr_information__["a" /* UesrInformationPage */], icon: 'card' },
            { title: '好友', component: __WEBPACK_IMPORTED_MODULE_5__pages_Friends_chatroom_chatroom__["a" /* ChatroomPage */], icon: 'contacts' },
            { title: '嫌疑人與證人', component: __WEBPACK_IMPORTED_MODULE_9__pages_Murderer_murderer_murderer__["a" /* MurdererPage */], icon: 'logo-snapchat' },
            { title: '排行榜', component: __WEBPACK_IMPORTED_MODULE_7__pages_Leaderboard_leaderboard_leaderboard__["a" /* LeaderboardPage */], icon: 'podium' },
            { title: '登出', component: __WEBPACK_IMPORTED_MODULE_4__pages_Welcome_welcome_welcome__["a" /* WelcomePage */], icon: 'log-out' },
        ];
    }
    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-content>\n\n    <img src="assets/img/NCUE-logo.jpg" class="menu-logo" />\n\n    <ion-list>\n      <ion-list-header>\n      </ion-list-header>\n      <button menuClose ion-item *ngFor="let menuItem of appMenuItems" (click)="openPage(menuItem)">\n        <ion-icon item-left [name]="menuItem.icon"></ion-icon>\n        {{menuItem.title}}\n      </button>\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBXrwVCFOYqEbPq-Ri25ncGv7ASyfQFkyc",
    authDomain: "treasurehunting-1499113897925.firebaseapp.com",
    databaseURL: "https://treasurehunting-1499113897925.firebaseio.com",
    projectId: "treasurehunting-1499113897925",
    storageBucket: "treasurehunting-1499113897925.appspot.com",
    messagingSenderId: "354775082966"
};
/* harmony export (immutable) */ __webpack_exports__["a"] = FIREBASE_CONFIG;

//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the FlashCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
let FlashCardComponent = class FlashCardComponent {
    constructor() {
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('isFlipped'),
    __metadata("design:type", Boolean)
], FlashCardComponent.prototype, "flipCard", void 0);
FlashCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'flash-card',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\components\flash-card\flash-card.html"*/'<!-- Generated template for the FlashCardComponent component -->\n<div class="flip-container" [class.flipped]="flipCard">\n\n  <div class="flipper">\n    <div>\n      <ng-content select=".flash-card-front"></ng-content>\n    </div>\n  </div>\n\n</div>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\components\flash-card\flash-card.html"*/
    }),
    __metadata("design:paramtypes", [])
], FlashCardComponent);

//# sourceMappingURL=flash-card.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('progress'),
    __metadata("design:type", Object)
], ProgressBarComponent.prototype, "progress", void 0);
ProgressBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'progress-bar',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\components\progress-bar\progress-bar.html"*/'<!-- Generated template for the ProgressBarComponent component -->\n<div class="progress-outer">\n  <div class="progress-inner" [style.width]="progress + \'%\'">\n    {{progress}}%\n  </div>\n</div>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\components\progress-bar\progress-bar.html"*/
    }),
    __metadata("design:paramtypes", [])
], ProgressBarComponent);

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let GroupsProvider = class GroupsProvider {
    constructor(events, fdb) {
        this.events = events;
        this.fdb = fdb;
        this.firegroup = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/groups');
        this.mygroups = [];
        this.currentgroup = [];
    }
    //新增隊伍
    addgroup(newGroup) {
        var promise = new Promise((resolve, reject) => {
            this.firegroup.child('Groupsname').orderByChild('name').equalTo(newGroup.groupName).once('value', (snapshot) => {
                let somekey;
                for (var key in snapshot.val())
                    somekey = key;
                if (somekey) {
                    alert("此隊伍名稱已存在，請重新輸入");
                }
                else {
                    this.firegroup.child('Groupsname').push({
                        name: newGroup.groupName
                    }).then(() => {
                        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(newGroup.groupName).set({
                            groupimage: newGroup.groupPic,
                            msgboard: '',
                            owner: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid
                        });
                    }).then(() => {
                        resolve(true);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            });
        });
        return promise;
    }
    //顯示我參加的所有隊伍
    getmygroups() {
        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value', (snapshot) => {
            this.mygroups = [];
            if (snapshot.val() != null) {
                var temp = snapshot.val();
                for (var key in temp) {
                    var newgroup = {
                        groupName: key,
                        groupimage: temp[key].groupimage
                    };
                    this.mygroups.push(newgroup);
                }
            }
            this.events.publish('newgroup');
        });
    }
    //進入隊伍聊天室
    getintogroup(groupname) {
        if (groupname != null) {
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
                if (snapshot.val() != null) {
                    var temp = snapshot.val().members;
                    this.currentgroup = [];
                    for (var key in temp) {
                        this.currentgroup.push(temp[key]);
                    }
                    this.currentgroupname = groupname;
                    this.events.publish('gotintogroup');
                }
            });
        }
    }
    //顯示隊長資訊
    getownership(groupname) {
        var promise = new Promise((resolve, reject) => {
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(groupname).once('value', (snapshot) => {
                var temp = snapshot.val().owner;
                if (temp == __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            });
        });
        return promise;
    }
    //顯示隊伍的圖片
    getgroupimage() {
        return new Promise((resolve, reject) => {
            alert(JSON.stringify("無線電連接中..."));
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
                this.grouppic = snapshot.val().groupimage;
                resolve(true);
            });
        });
    }
    //新增隊員
    addmember(newmember, me) {
        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).child('members').push(newmember).then(() => {
            this.getgroupimage().then(() => {
                alert(JSON.stringify("隊員已連接!"));
                this.firegroup.child(newmember.Uid).child(this.currentgroupname).set({
                    groupimage: this.grouppic,
                    owner: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
                    msgboard: '',
                });
                //     alert(JSON.stringify(me));
                this.firegroup.child(newmember.Uid).child(this.currentgroupname).child('members').push(me);
                this.getintogroup(this.currentgroupname);
            });
        });
    }
    //刪除隊員
    deletemember(member) {
        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname)
            .child('members').orderByChild('Uid').equalTo(member.Uid).once('value', (snapshot) => {
            snapshot.ref.remove().then(() => {
                this.firegroup.child(member.Uid).child(this.currentgroupname).remove().then(() => {
                    this.getintogroup(this.currentgroupname);
                });
            });
        });
    }
    //顯示隊伍的成員
    getgroupmembers() {
        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
            var tempdata = snapshot.val().owner;
            this.firegroup.child(tempdata).child(this.currentgroupname).child('members').once('value', (snapshot) => {
                var tempvar = snapshot.val();
                for (var key in tempvar) {
                    this.currentgroup.push(tempvar[key]);
                }
            });
        });
        this.events.publish('gotmembers');
    }
    //離開隊伍
    leavegroup() {
        return new Promise((resolve, reject) => {
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).once('value', (snapshot) => {
                var tempowner = snapshot.val().owner;
                this.firegroup.child(tempowner).child(this.currentgroupname).child('members').orderByChild('Uid')
                    .equalTo(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value', (snapshot) => {
                    snapshot.ref.remove().then(() => {
                        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
                            resolve(true);
                        }).catch((err) => {
                            reject(err);
                        });
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });
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
        });
    }
    //刪除隊伍
    deletegroup() {
        return new Promise((resolve, reject) => {
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).child('members').once('value', (snapshot) => {
                var tempmembers = snapshot.val();
                for (var key in tempmembers) {
                    this.firegroup.child(tempmembers[key].Uid).child(this.currentgroupname).remove();
                }
                this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).remove().then(() => {
                    this.firegroup.child('Groupsname').orderByChild('name').equalTo(this.currentgroupname).once('value', (snapshot) => {
                        let somekey;
                        for (var key in snapshot.val())
                            somekey = key;
                        this.firegroup.child('Groupsname').child(somekey).remove().then(() => {
                            resolve(true);
                        });
                    });
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    //新增隊伍聊天訊息(每位隊員都會新增)
    addgroupmsg(Name, Photo, newmessage) {
        return new Promise((resolve) => {
            this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).child('owner').once('value', (snapshot) => {
                var tempowner = snapshot.val();
                this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(this.currentgroupname).child('msgboard').push({
                    sentby: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
                    UserName: Name,
                    UserPhotoURL: Photo,
                    message: newmessage,
                    timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP
                }).then(() => {
                    if (tempowner != __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid) {
                        this.firegroup.child(tempowner).child(this.currentgroupname).child('msgboard').push({
                            sentby: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
                            UserName: Name,
                            UserPhotoURL: Photo,
                            message: newmessage,
                            timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP
                        });
                    }
                    var tempmembers = [];
                    this.firegroup.child(tempowner).child(this.currentgroupname).child('members').once('value', (snapshot) => {
                        var tempmembersobj = snapshot.val();
                        for (var key in tempmembersobj)
                            tempmembers.push(tempmembersobj[key]);
                    }).then(() => {
                        let postedmsgs = tempmembers.map((item) => {
                            if (item.Uid != __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid) {
                                return new Promise((resolve) => {
                                    this.postmsgs(Name, Photo, item, newmessage, resolve);
                                });
                            }
                        });
                        Promise.all(postedmsgs).then(() => {
                            this.getgroupmsgs(this.currentgroupname);
                            resolve(true);
                        });
                    });
                });
            });
        });
    }
    //上傳聊天訊息到資料庫
    postmsgs(Name, Photo, member, msg, cb) {
        this.firegroup.child(member.Uid).child(this.currentgroupname).child('msgboard').push({
            sentby: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid,
            UserName: Name,
            UserPhotoURL: Photo,
            message: msg,
            timestamp: __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database.ServerValue.TIMESTAMP
        }).then(() => {
            cb();
        });
    }
    //從資料庫抓聊天資料
    getgroupmsgs(groupname) {
        this.firegroup.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).child(groupname).child('msgboard').on('value', (snapshot) => {
            var tempmsgholder = snapshot.val();
            this.groupmsgs = [];
            for (var key in tempmsgholder)
                this.groupmsgs.push(tempmsgholder[key]);
            this.events.publish('newgroupmsg');
        });
    }
};
GroupsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], GroupsProvider);

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let UserProvider = class UserProvider {
    constructor(afireauth) {
        this.afireauth = afireauth;
        this.firedata_Email = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Accounts_Email');
        this.firedata_FB = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/Accounts_FB');
    }
    //抓Email登入使用者詳細資料
    getuserdetails_Email() {
        var promise = new Promise((resolve, reject) => {
            this.firedata_Email.child(__WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().currentUser.uid).once('value', (snapshot) => {
                resolve(snapshot.val());
            }).catch((err) => {
                reject(err);
            });
        });
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
            });
        });
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
            });
        });
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
                });
            }
            else if (way == "FB") {
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
                });
            }
        });
        return promise;
    }
};
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
], UserProvider);

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UesrInformationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__medals_detail_medals_detail__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let UesrInformationPage = class UesrInformationPage {
    constructor(platform, navCtrl, navParams, fdb, storage, changeref, toast, nativeAudio) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.changeref = changeref;
        this.toast = toast;
        this.nativeAudio = nativeAudio;
        this.WayToLogin = {};
        this.UserList = [];
        //獎章用
        this.MedalList = [];
        this.MedalDone = [];
        this.DetailBox = [];
        this.onSuccessPreloading = (data) => {
            this.nativeAudio.loop('information');
            //   this.nativeAudio.play('track1');
        };
        this.isGetData = false;
        this.isMatchDone = false;
        if (this.platform.is('cordova')) {
            nativeAudio.preloadComplex('information', 'assets/audio/bgm_information.mp3', 1, 1, 0).then(this.onSuccessPreloading);
        }
    }
    ionViewDidLoad() {
        //撈取資料
        this.loadData_part1();
        //實時更新經驗條
        setInterval(() => {
            if (this.isGetData) {
                this.Exp_sum = (this.UserList[this.update_index].UserLv * 200);
                this.loadProgress = Math.floor(((this.UserList[this.update_index].UserExp) / this.Exp_sum * 100) * 100) / 100;
            }
            this.changeref.markForCheck();
        }, 1000);
    }
    //Change to detail
    GotGottonDetail(i) {
        this.DetailBox.pop();
        this.DetailBox.push({
            isGot: true,
            MedalName: this.MedalDone[i].MedalName,
            MedalNo: this.MedalDone[i].MedalNo,
            MedalURL: this.MedalDone[i].MedalURL,
            GetWays: this.MedalDone[i].GetWays,
            Description: this.MedalDone[i].Description
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__medals_detail_medals_detail__["a" /* MedalsDetailPage */], this.DetailBox[0]);
    }
    //以下為撈取資料的一連串事件
    //使用非同步的方式進行
    //也就是 A 做完 換 B ， B 做完 換C 
    //閱讀方法為
    /*
  
      this.storage.get('Way').then((val) => {
        return new Promise((resolve) => {
          if (val) {
            //  alert(JSON.stringify(val));
            this.WayToLogin = val;
            resolve(val);
          }
        }).then(resolve => {
          this.loadData_part2();
        })
      });
  
    1. this.storage.get('Way')
       這是一個可能會需要等待的涵式
       所以我們使用.then()，並要求給予他回傳一個 val值
    2. 並且在之後設定一個 Promise
  
        return new Promise((resolve) => {
          if (val) {
            //  alert(JSON.stringify(val));
            this.WayToLogin = val;
            resolve(val);
          }
        }).then(resolve => {
          this.loadData_part2();
        })
        
        原理是他會等待上面事件完成
        拿上面的來說明
        1. 當Promise偵測到第1點的值已經回傳時
        2. 進入裡面凾式，此時你可以做你想做的設定
        3. 並且透過  resolve(val); 回傳說他已經收到值了
        4. 而當後面的.then(124行)得知他收到值的時候，進行下一個涵是
        5. 後面依此類推
  
  
    */
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
                if (val) {
                    //  alert(JSON.stringify(val));
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
        });
    }
    loadData_part2() {
        if (this.WayToLogin.WhichWay == "Email") {
            this.fdb.list("/Accounts_Email").subscribe(data => {
                return new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
                    if (data) {
                        this.UserList = data;
                        resolve(data);
                    }
                }).then(resolve => {
                    this.loadData_part3();
                });
            });
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            this.fdb.list("/Accounts_FB").subscribe(data => {
                return new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
                    if (data) {
                        this.UserList = data;
                        resolve(data);
                    }
                }).then(resolve => {
                    this.loadData_part3();
                });
            });
        }
    }
    loadData_part3() {
        let promise = new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                //    alert(JSON.stringify(this.UserList[i].UserUid));
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            // this.UpdateData_firstLogin();
            this.GetMedalList();
        });
    }
    GetMedalList() {
        this.fdb.list("/MedalList").subscribe(data => {
            return new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
                if (data) {
                    this.MedalList = data;
                    resolve(data);
                }
            }).then(resolve => {
                this.UpdateData_firstLogin();
                this.matchMedal();
            });
        });
    }
    //第一次登入任務判斷
    UpdateData_firstLogin() {
        let promise = new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_001) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_001: true,
                        Mission_001: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 20,
                        UserExp: this.UserList[this.update_index].UserExp + 100,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 100) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：初次踏入`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_001) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_001: true,
                        Mission_001: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 20,
                        UserExp: this.UserList[this.update_index].UserExp + 100,
                        UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 100) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：初次踏入`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
        }).then(resolve => {
            this.UpdateData_firstViveIM();
        });
    }
    //第一次觀看個人頁面任務判斷
    UpdateData_firstViveIM() {
        let promise = new __WEBPACK_IMPORTED_MODULE_5_firebase_app__["Promise"]((resolve) => {
            if (this.WayToLogin.WhichWay == "Email") {
                if (!this.UserList[this.update_index].Mission_002) {
                    const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                        Medal_002: true,
                        Mission_002: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 20,
                        UserExp: this.UserList[this.update_index].UserExp + 20,
                        UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：查看搜查證`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
            else if (this.WayToLogin.WhichWay == "FB") {
                if (!this.UserList[this.update_index].Mission_002) {
                    const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                        Medal_002: true,
                        Mission_002: true,
                        UserPoint: this.UserList[this.update_index].UserPoint + 20,
                        UserExp: this.UserList[this.update_index].UserExp + 20,
                        UserLv: this.UserList[this.update_index].UserLv + Math.floor(((this.UserList[this.update_index].UserExp + 20) / 200)),
                    });
                    if (result) {
                        this.toast.create({
                            message: `完成任務：查看搜查證`,
                            duration: 3000
                        }).present();
                    }
                    resolve("OK");
                }
            }
        });
    }
    //將已完成的獎章撈取出來
    matchMedal() {
        //  alert("matchMedal");
        this.MedalDone = [];
        if (this.UserList[this.update_index].Medal_001) {
            this.MedalDone.push(this.MedalList[0]);
        }
        if (this.UserList[this.update_index].Medal_002) {
            this.MedalDone.push(this.MedalList[1]);
        }
        if (this.UserList[this.update_index].Medal_003) {
            this.MedalDone.push(this.MedalList[2]);
        }
        if (this.UserList[this.update_index].Medal_004) {
            this.MedalDone.push(this.MedalList[3]);
        }
        if (this.UserList[this.update_index].Medal_005) {
            this.MedalDone.push(this.MedalList[4]);
        }
        if (this.UserList[this.update_index].Medal_006) {
            this.MedalDone.push(this.MedalList[5]);
        }
        if (this.UserList[this.update_index].Medal_007) {
            this.MedalDone.push(this.MedalList[6]);
        }
        if (this.UserList[this.update_index].Medal_008) {
            this.MedalDone.push(this.MedalList[7]);
        }
        if (this.UserList[this.update_index].Medal_009) {
            this.MedalDone.push(this.MedalList[8]);
        }
        if (this.UserList[this.update_index].Medal_010) {
            this.MedalDone.push(this.MedalList[9]);
        }
        if (this.UserList[this.update_index].Medal_011) {
            this.MedalDone.push(this.MedalList[10]);
        }
        if (this.UserList[this.update_index].Medal_012) {
            this.MedalDone.push(this.MedalList[11]);
        }
        if (this.UserList[this.update_index].Medal_013) {
            this.MedalDone.push(this.MedalList[12]);
        }
        this.isMatchDone = true;
    }
};
UesrInformationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-uesr-information',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\uesr-information\uesr-information.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>搜查證</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="user">\n  <ion-grid *ngIf="isGetData">\n    <ion-row>\n      <ion-col col-2>\n        Lv: {{UserList[update_index].UserLv}}\n      </ion-col>\n      <ion-col col-3>\n        經驗值：\n      </ion-col>\n      <ion-col col-7.5>\n        <progress-bar [progress]="loadProgress"></progress-bar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card *ngIf="isGetData">\n\n    <ion-card-content>\n      <img src="{{UserList[update_index].UserPhotoURL}}" />\n      <h2>{{UserList[update_index].UserName}}</h2>\n    </ion-card-content>\n\n    <ion-list>\n      <a ion-item>\n        <ion-icon name="medical" item-left></ion-icon>\n        <p>Point</p>\n        <h2>{{UserList[update_index].UserPoint}}</h2>\n      </a>\n      <a ion-item>\n        <ion-icon name="pulse" item-left></ion-icon>\n        <p>Exp</p>\n        <h2>{{UserList[update_index].UserExp}} / {{Exp_sum}}</h2>\n      </a>\n    </ion-list>\n\n    <ion-list>\n      <ion-item *ngIf="isMatchDone">\n        <ion-grid>\n          <ion-row>\n            <ion-col col-5>\n            </ion-col>\n            <ion-col col-4>\n              <p>獎章</p>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-3 *ngFor="let medal of MedalDone; let i = index">\n              <img src="{{medal.MedalURL}}" (click)="GotGottonDetail(i)" />\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\uesr-information\uesr-information.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */]])
], UesrInformationPage);

//# sourceMappingURL=uesr-information.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let RequestsProvider = class RequestsProvider {
    constructor(userservice, events) {
        this.userservice = userservice;
        this.events = events;
        this.firereq = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/requests');
        this.firefriends = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('/friends');
        this.User_Email = [];
        this.User_FB = [];
        this.AllUsers = [];
    }
    //送出邀請
    sendrequest(req) {
        var promise = new Promise((resolve, reject) => {
            this.firereq.child(req.recipient).push({
                sender: req.sender
            }).then(() => {
                resolve({ success: true });
            });
        });
        return promise;
    }
    //顯示出我所有的邀請
    getmyrequests() {
        let allmyrequests;
        var myrequests = [];
        this.firereq.child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).on('value', (snapshot) => {
            allmyrequests = snapshot.val();
            //   alert(JSON.stringify(allmyrequests));
            //  myrequests = [];
            for (var i in allmyrequests) {
                myrequests.push(allmyrequests[i].sender);
            }
            //    alert(JSON.stringify(myrequests));
            this.userservice.getallusers_Email().then((res) => {
                this.User_Email = res;
                //       alert(JSON.stringify("E"));
                //    this.temparr = res;
            }).then(() => {
                this.userservice.getallusers_FB().then((res) => {
                    this.User_FB = res;
                    //         alert(JSON.stringify("F"));
                    //    this.temparr = res;
                });
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
                        resolve("Ok");
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
                });
            });
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
        });
    }
    //接受邀請
    acceptrequest(buddy) {
        var promise = new Promise((resolve, reject) => {
            this.myfriends = [];
            this.firefriends.child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).push({
                uid: buddy.Uid
            }).then(() => {
                this.firefriends.child(buddy.Uid).push({
                    uid: __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid
                }).then(() => {
                    this.deleterequest(buddy).then(() => {
                        resolve(true);
                    });
                });
            });
        });
        return promise;
    }
    //刪除邀請
    deleterequest(buddy) {
        var promise = new Promise((resolve, reject) => {
            this.firereq.child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.Uid).once('value', (snapshot) => {
                let somekey;
                for (var key in snapshot.val())
                    somekey = key;
                this.firereq.child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).child(somekey).remove().then(() => {
                    resolve(true);
                });
            })
                .then(() => {
            }).catch((err) => {
                reject(err);
            });
        });
        return promise;
    }
    //顯示我的朋友
    getmyfriends() {
        let friendsuid = [];
        this.firefriends.child(__WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.uid).on('value', (snapshot) => {
            let allfriends = snapshot.val();
            this.myfriends = [];
            for (var i in allfriends) {
                friendsuid.push(allfriends[i].uid);
            }
            this.userservice.getallusers_Email().then((res) => {
                this.User_Email = res;
            }).then(() => {
                this.userservice.getallusers_FB().then((res) => {
                    this.User_FB = res;
                });
            }).then(() => {
                let promise = new Promise((resolve) => {
                    let count = 0;
                    this.AllUsers = this.User_FB;
                    for (var i = 0; i < this.User_Email.length; i++) {
                        this.AllUsers.push(this.User_Email[i]);
                        count++;
                    }
                    if (count == this.User_Email.length) {
                        resolve("Ok");
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
                });
            });
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
        });
    }
};
RequestsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], RequestsProvider);

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedalsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MedalsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let MedalsDetailPage = class MedalsDetailPage {
    constructor(navCtrl, navParams, fdb, storage, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fdb = fdb;
        this.storage = storage;
        this.toast = toast;
        this.medalBox = [];
        this.WayToLogin = {};
        this.UserList = [];
        this.medalBox = this.navParams.data;
        this.isGetData = false;
    }
    ionViewDidLoad() {
        this.loadData_part1();
    }
    //GetUserData
    loadData_part1() {
        this.storage.get('Way').then((val) => {
            return new Promise((resolve) => {
                if (val) {
                    this.WayToLogin = val;
                    resolve(val);
                }
            }).then(resolve => {
                this.loadData_part2();
            });
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
                });
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
                });
            });
        }
    }
    loadData_part3() {
        let promise = new Promise((resolve) => {
            for (var i = 0; i < this.UserList.length; i++) {
                if (this.WayToLogin.UserUID == this.UserList[i].UserUid) {
                    this.update_index = i;
                    this.isGetData = true;
                }
            }
            if (this.isGetData) {
                resolve("GET");
            }
        }).then(resolve => {
            this.UpdateData_firsViewPage();
        });
    }
    //第一次進入頁面判斷
    UpdateData_firsViewPage() {
        if (this.WayToLogin.WhichWay == "Email") {
            if (!this.UserList[this.update_index].Mission_009) {
                const result = this.fdb.list("/Accounts_Email").update(this.UserList[this.update_index].$key, {
                    Medal_009: true,
                    Mission_009: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：榮耀`,
                        duration: 3000
                    }).present();
                }
            }
        }
        else if (this.WayToLogin.WhichWay == "FB") {
            if (!this.UserList[this.update_index].Mission_009) {
                const result = this.fdb.list("/Accounts_FB").update(this.UserList[this.update_index].$key, {
                    Medal_009: true,
                    Mission_009: true,
                    UserPoint: this.UserList[this.update_index].UserPoint + 50,
                    UserExp: this.UserList[this.update_index].UserExp + 25,
                    UserLv: 1 + Math.floor(((this.UserList[this.update_index].UserExp + 25) / 200)),
                });
                if (result) {
                    this.toast.create({
                        message: `完成任務：榮耀`,
                        duration: 3000
                    }).present();
                }
            }
        }
    }
};
MedalsDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-medals-detail',template:/*ion-inline-start:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\medals-detail\medals-detail.html"*/'<!--\n  Generated template for the MedalsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{medalBox.MedalName}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card *ngIf="!medalBox.isGot">\n    <img src="{{medalBox.MedalURL}}" />\n\n    <ion-card-content>\n      <ion-card-title>\n        {{medalBox.MedalName}}\n      </ion-card-title>\n      <p>取得方式：</p>\n      <h2>{{medalBox.GetWays}}</h2>\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-card *ngIf="medalBox.isGot">\n    <img src="{{medalBox.MedalURL}}" />\n\n    <ion-card-content>\n      <ion-card-title>\n        {{medalBox.MedalName}}\n      </ion-card-title>\n      <p>取得方式：</p>\n      <h2>{{medalBox.GetWays}}</h2>\n      <p>說明：</p>\n      <h2>{{medalBox.Description}}</h2>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\workspace\Thesis\iBeaconDetective\src\pages\SearchCard\medals-detail\medals-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], MedalsDetailPage);

//# sourceMappingURL=medals-detail.js.map

/***/ })

},[280]);
//# sourceMappingURL=main.js.map