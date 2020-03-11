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
  raftersListIndia = [];
  raftersListSA = [];
  constructor(private geolocation: Geolocation, private geoCoder: NativeGeocoder, private loginPage: LoginPage) {
    this.country = 'india';
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.getLocation();
  }

  public getLocation() {
    // console.log("geolocation called");
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log('geolocation called');
        console.log(resp);
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);

        this.geoCoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
          .then((result: NativeGeocoderResult[]) => {
            if (JSON.stringify(result[0].countryName) === 'India') {
              this.raftersListIndia.push(this.loginPage.userProfile.displayName);
            } else {
              this.raftersListSA.push(this.loginPage.userProfile.displayName);
            }
            console.log('RLI', this.raftersListIndia.length);
          })
          .catch((error: any) => console.log(error));

      })
      .catch(error => {
        console.log('Error getting location', error);
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe(data => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
      this.geoCoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
        .then((result: NativeGeocoderResult[]) => {
          this.raftersListIndia.push(this.loginPage.userProfile.displayName);
          console.log('RLI 1', this.raftersListIndia.length);
          if (JSON.stringify(result[0].countryName) === 'India') {
            this.raftersListIndia.push(this.loginPage.userProfile.displayName);
            console.log('RLI 1', this.raftersListIndia.length);
          } else {
            this.raftersListSA.push(this.loginPage.userProfile.displayName);
          }
        })
        .catch((error: any) => console.log(error));
    });
  }

  segmentChanged(event) {
    console.log(event);
  }
}
