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
import { environment } from 'src/environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LoginPage } from './login/login.page';
import { LoginPageModule } from './login/login.module';

var firebaseConfig = {
  apiKey: 'AIzaSyDtx0UBkNLctituiP7bD2mQD2rS3oYbWzY',
  authDomain: 'locaterafters.firebaseapp.com',
  databaseURL: 'https://locaterafters.firebaseio.com',
  projectId: 'locaterafters',
  storageBucket: 'locaterafters.appspot.com',
  messagingSenderId: '424112178216',
  appId: '1:424112178216:web:8237f2b1c9efe2b2faa11d',
  measurementId: 'G-PXP7R08K48'
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
