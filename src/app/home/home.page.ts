import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// tslint:disable-next-line: max-line-length
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  country: string;
  countryName: string;
  raftersListIndia = [];
  raftersListSA = [];
  isIndiaPressed = false;
  isSAPressed = false;
  constructor(private geolocation: Geolocation, private geoCoder: NativeGeocoder, private loginPage: LoginPage) {
    this.country = 'india';
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.getLocation();
  }

  public getLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
      
        if (resp) {
          this.geoCoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
            .then((result: NativeGeocoderResult[]) => {
              this.countryName = JSON.stringify(result[0].countryName);
              if (JSON.stringify(result[0].countryName) === 'India') {
                this.raftersListIndia.push(this.loginPage.userProfile.displayName);
              } else {
                this.raftersListSA.push(this.loginPage.userProfile.displayName);
              }
            })
            .catch((error: any) => console.log(error));
        }
      })
      .catch(error => {
        console.log('Error getting location', error);
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe(data => {

      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
      this.geoCoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
        .then((result: NativeGeocoderResult[]) => {
          console.log(result[0].countryName);
          if (result[0].countryName === 'India') {
            this.raftersListIndia.push(this.loginPage.userProfile.displayName);
          } else {
            this.raftersListSA.push(this.loginPage.userProfile.displayName);
          }
          for (let i = 0; i < this.raftersListIndia.length; i++) {
            if (this.raftersListIndia[i] === this.raftersListIndia[i + 1]) {
              this.raftersListIndia.splice(i + 1);
            }
          }
          for (let i = 0; i < this.raftersListSA.length; i++) {
            if (this.raftersListSA[i] === this.raftersListSA[i + 1]) {
              this.raftersListSA.splice(i + 1);
            }
          }
          console.log('RLI', this.raftersListIndia.length);
          console.log('RLS', this.raftersListSA.length);
        })
        .catch((error: any) => console.log(error));
    });
  }

  segmentChange(event) {
    let indiaList = document.getElementById('indiaList');
    let saList = document.getElementById('saList');
    console.log('event', event.detail.value);
    console.log('RLI', this.raftersListIndia.length);
    console.log('RLS', this.raftersListSA.length);
    if (event.detail.value === 'india') {
      this.isIndiaPressed = true;
      this.isSAPressed = false;
      // saList.setV
    } else {
      this.isSAPressed = true;
      this.isIndiaPressed = false;
    }
  }
}
