import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { MyApp } from './app.component';

//Welcome page
import { WelcomePage } from '../pages/Welcome/welcome/welcome';
import { EmailLoginPage } from '../pages/Welcome/email-login/email-login';
import { EmailRegisterPage } from '../pages/Welcome/email-register/email-register';

//Friends page
import { ChatroomPage } from '../pages/Friends/chatroom/chatroom';
import { AddFriendPage } from '../pages/Friends/add-friend/add-friend';
import { PersonalChatPage } from '../pages/Friends/personal-chat/personal-chat';

import { TeamChatPage } from '../pages/Friends/team-chat/team-chat';
import { AddTeamPage } from '../pages/Friends/add-team/add-team';

import { TeamInfoPage } from '../pages/Friends/team-info/team-info';
import { TeamMemberPage } from '../pages/Friends/team-member/team-member';
import { AddTeammemberPage } from '../pages/Friends/add-teammember/add-teammember';

//Investigate page
import { IbeaconHuntingPage } from '../pages/Investigate/ibeacon-hunting/ibeacon-hunting';
import { QuizPage } from '../pages/Investigate/quiz/quiz';

//Leaderboard page
import { LeaderboardPage } from '../pages/Leaderboard/leaderboard/leaderboard';

//Mission page
import { MissionPage } from '../pages/Mission/mission/mission';
import { MissionDetailPage } from '../pages/Mission/mission-detail/mission-detail';

//Murderer page
import { MurdererPage } from '../pages/Murderer/murderer/murderer';
import { MurdererDetailPage } from '../pages/Murderer/murderer-detail/murderer-detail';

//SearchCard page
import { UesrInformationPage } from '../pages/SearchCard/uesr-information/uesr-information';
import { MedalsPage } from '../pages/SearchCard/medals/medals';
import { MedalsDetailPage } from '../pages/SearchCard/medals-detail/medals-detail';

//Tip page
import { TipPage } from '../pages/Tip/tip/tip';
import { TipDetailPage } from '../pages/Tip/tip-detail/tip-detail';

//Provider
import { IBeaconProvider } from '../providers/i-beacon/i-beacon';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import { DataProvider } from '../providers/data/data';

//系統中用到的pulgin
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { IBeacon } from '@ionic-native/ibeacon';

import { AngularFireModule } from "angularfire2"
import { AngularFireAuthModule } from "angularfire2/auth"
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FIREBASE_CONFIG } from "./app.firebase.config";
import firebase from 'firebase';

import { Geolocation } from '@ionic-native/geolocation';

import { FlashCardComponent } from '../components/flash-card/flash-card';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { NativeAudio } from '@ionic-native/native-audio';

import { Camera } from '@ionic-native/camera';


firebase.initializeApp({
  apiKey: "AIzaSyBXrwVCFOYqEbPq-Ri25ncGv7ASyfQFkyc",
  authDomain: "treasurehunting-1499113897925.firebaseapp.com",
  databaseURL: "https://treasurehunting-1499113897925.firebaseio.com",
  projectId: "treasurehunting-1499113897925",
  storageBucket: "treasurehunting-1499113897925.appspot.com",
  messagingSenderId: "354775082966"
});

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LeaderboardPage,
    UesrInformationPage,
    ChatroomPage,
    AddFriendPage,
    PersonalChatPage,
    AddTeamPage,
    AddTeammemberPage,
    TeamChatPage,
    TeamMemberPage,
    TeamInfoPage,
    MedalsPage,
    MedalsDetailPage,
    IbeaconHuntingPage,
    QuizPage,
    MissionPage,
    MissionDetailPage,
    MurdererPage,
    MurdererDetailPage,
    TipPage,
    TipDetailPage,
    EmailLoginPage,
    EmailRegisterPage,
    FlashCardComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LeaderboardPage,
    ChatroomPage,
    AddFriendPage,
    PersonalChatPage,
    AddTeamPage,
    AddTeammemberPage,
    TeamChatPage,
    TeamMemberPage,
    TeamInfoPage,
    UesrInformationPage,
    MedalsPage,
    MedalsDetailPage,
    IbeaconHuntingPage,
    QuizPage,
    MissionPage,
    MissionDetailPage,
    TipPage,
    TipDetailPage,
    MurdererPage,
    MurdererDetailPage,
    EmailLoginPage,
    EmailRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeaconProvider,
    IBeacon,
    UserProvider,
    ImghandlerProvider,
    UserProvider,
    RequestsProvider,
    ChatProvider,
    GroupsProvider,
    Camera,
    File,
    FilePath,
    FileChooser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    DataProvider,
    LocalNotifications,
    NativeAudio
  ]
})
export class AppModule { }
