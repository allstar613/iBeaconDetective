import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



//Welcome page
import { WelcomePage } from '../pages/Welcome/welcome/welcome';

//Friends page
import { ChatroomPage } from '../pages/Friends/chatroom/chatroom';

//Investigate page
import { IbeaconHuntingPage } from '../pages/Investigate/ibeacon-hunting/ibeacon-hunting';

//Leaderboard page
import { LeaderboardPage } from '../pages/Leaderboard/leaderboard/leaderboard';

//Mission page
import { MissionPage } from '../pages/Mission/mission/mission';

//Murderer page
import { MurdererPage } from '../pages/Murderer/murderer/murderer';

//SearchCard page
import { UesrInformationPage } from '../pages/SearchCard/uesr-information/uesr-information';

//Tip page
import { TipPage } from '../pages/Tip/tip/tip';



export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();



        this.appMenuItems = [

            { title: '任務', component: MissionPage, icon: 'bookmarks' },
            { title: '提示', component: TipPage, icon: 'bulb' },
            { title: '偵查', component: IbeaconHuntingPage, icon: 'search' },
            { title: '搜查證', component: UesrInformationPage, icon: 'card' },
            { title: '好友', component: ChatroomPage, icon: 'contacts' },
            { title: '嫌疑人與證人', component: MurdererPage, icon: 'logo-snapchat' },
            { title: '排行榜', component: LeaderboardPage, icon: 'podium' },
            { title: '登出', component: WelcomePage, icon: 'log-out' },
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


}
