import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyDtx0UBkNLctituiP7bD2mQD2rS3oYbWzY',
  authDomain: 'locaterafters.firebaseapp.com',
  databaseURL: 'https://locaterafters.firebaseio.com/',
  projectId: 'locaterafters',
  storageBucket: 'locaterafters.appspot.com',
  messagingSenderId: '424112178216',
  appId: '1:424112178216:web:8237f2b1c9efe2b2faa11d',
  measurementId: 'G-PXP7R08K48'
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // firebase.initializeApp(firebaseConfig);
    });
  }
}
