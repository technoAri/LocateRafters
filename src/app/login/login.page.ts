import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { config } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  firebaseConfig = {
    apiKey: 'AIzaSyC5TEUV5TJ1lGW6fztdZU_FCMLUiGZNzLk',
    // authDomain: "<your-project-authdomain>",
    // databaseURL: "<your-database-URL>",
    projectId: 'locaterafters',
    // storageBucket: "<your-storage-bucket>",
    // messagingSenderId: "<your-messaging-sender-id>"
  };

  userProfile: any = null;
  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private router: Router) {
    if (!firebase.apps.length) {
      firebase.initializeApp(this.firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.router.navigate(['/home']);
      } else {
        this.userProfile = null;
      }
    });
  }

  ngOnInit() {
    // console.log();
  }

  loginUser(): void {
    console.log("login called");
    this.googlePlus
      .login({
        webClientId:
          '424112178216-adfgvs75uklntj3pa7p4uetr8kml59f9.apps.googleusercontent.com',
        offline: true
      })
      .then(
        res => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(
            res.idToken
          );
          firebase
            .auth()
            .signInWithCredential(googleCredential)
            .then(response => {
              console.log('Firebase success: ' + JSON.stringify(response));
              this.router.navigate(['/home']);
            });
        },
        err => {
          console.error('Error: ', err);
        }
      );
  }
}
