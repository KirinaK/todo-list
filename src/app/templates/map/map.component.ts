import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public place = {
    country: '',
    city: '',
    street: '',
    buildNumber: null,
    formatted_address: ''
  };
  public lat: number;
  public lng: number;
  private geocoder;

  constructor(private mapsApiLoader: MapsAPILoader) {
    this.getCurrentPosition();
  }

  ngOnInit() {
  }

  getCurrentPosition() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = +position.coords.latitude;
        this.lng = +position.coords.longitude;
        setTimeout(() => {this.getAddress()}, 1000);
      });
    }
  }

  getAddress() {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      let LatLang = new google.maps.LatLng(this.lat, this.lng)
      this.geocoder.geocode({'location': LatLang}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let result_address = result.address_components;
          let formatted_address = result.formatted_address;
          (formatted_address !== null) ? this.place.formatted_address = formatted_address : this.getPartsofAddress(result, result_address);
        }
      })
    });
  }

  getPartsofAddress(result, result_address) {
    if (result !== null) {
      this.place.country = result_address.find(x => x.types[0] == 'country').long_name;
      this.place.city = result_address.find(x => x.types[0] == 'locality').long_name;
      this.place.street = result_address.find(x => x.types == 'route').long_name;
      this.place.buildNumber = result_address.find(x => x.types == 'street_number').long_name;
    } else {
      alert("No address available!");
    }
  }
}
