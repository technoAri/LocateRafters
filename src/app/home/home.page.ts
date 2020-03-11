import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// tslint:disable-next-line: max-line-length
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  country: string;
  constructor(private geolocation: Geolocation, private geoCoder: NativeGeocoder) {
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

        // tslint:disable-next-line: max-line-length
        this.geoCoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude).then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0].countryName)))
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
    });
  }

  segmentChanged(event) {
    console.log(event);
  }
}
