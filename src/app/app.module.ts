import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LoginPage } from './login/login.page';
import { LoginPageModule } from './login/login.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { environment } from 'src/environments/environment.prod';
import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBaTnrq_Cx0K_IwcNOyb8EiutxwLUGA6E4",
  authDomain: "locaterafters-6d77b.firebaseapp.com",
  databaseURL: "https://locaterafters-6d77b.firebaseio.com",
  projectId: "locaterafters-6d77b",
  storageBucket: "locaterafters-6d77b.appspot.com",
  messagingSenderId: "211339870495",
  appId: "1:211339870495:web:875a73cba99aa4f422302a",
  measurementId: "G-BJSSJBNCQF"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Geolocation,
    NativeGeocoder,
    LoginPage,
    LoginPageModule,
    AngularFirestore,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
