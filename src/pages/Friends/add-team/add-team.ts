import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../../providers/groups/groups';
import { ImghandlerProvider } from '../../../providers/imghandler/imghandler';
/**
 * Generated class for the AddTeamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-team',
  templateUrl: 'add-team.html',
})
export class AddTeamPage {
  newgroup = {
    groupName: "隊伍名稱",
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public groupservice: GroupsProvider, public imghandler: ImghandlerProvider,
    public loadingCtrl: LoadingController) {
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
      this.imghandler.grouppicstore(this.newgroup.groupName).then((res: any) => {
        loader.dismiss();
        if (res)
          this.newgroup.groupPic = res;
      }).catch((err) => {
        alert(err);
      })
    }

  }

  //新增隊伍
  creategroup() {
    this.groupservice.addgroup(this.newgroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
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
            this.newgroup.groupName = data.groupname
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
}
