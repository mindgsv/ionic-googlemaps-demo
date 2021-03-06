import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Geocoder,
  BaseArrayClass,
  GeocoderResult
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-reverse-geocoding',
  templateUrl: 'reverse-geocoding.html',
    providers: [
    Geocoder
  ]
})
export class ReverseGeocodingPage {
  map1: GoogleMap;
  map2: GoogleMap;
  isRunning: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geocoder: Geocoder) {
  }

  ionViewDidLoad() {
    this.loadMap1();
    setTimeout(this.loadMap2.bind(this), 2000);
  }

  loadMap1() {
    var self = this;
    var mapDiv = document.getElementById("map_canvas1");

    self.map1 = this.googleMaps.create(mapDiv, {
      camera: {
        target: { "lat": 37.422858, "lng": -122.085065 },
        zoom: 10
      }
    });

    // Wait the MAP_READY before using any methods.
    self.map1.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map ready for map_canvas1");
      self.map1.on(GoogleMapsEvent.MAP_CLICK).subscribe((latLng) => {
        self.map1.addMarker({
          "position": latLng
        }).then((marker) => {
          // Latitude, longitude -> address
          self.geocoder.geocode({
            "position": latLng
          }).then((results: GeocoderResult[]) => {
            if (results.length == 0) {
              // Not found
              return;
            }
            var address = [
              results[0].subThoroughfare || "",
              results[0].thoroughfare || "",
              results[0].locality || "",
              results[0].adminArea || "",
              results[0].postalCode || "",
              results[0].country || ""].join(", ");
            marker.setTitle(address)
              .showInfoWindow();
          });
        });
      });
    });

  }

  loadMap2() {
    var self = this;
    var mapDiv = document.getElementById("map_canvas2");
    self.map2 = this.googleMaps.create(mapDiv, {
      camera: {
        target: [{ "lat": 42.452030, "lng": -71.537014 }, { "lat": 43.385365, "lng": -70.542110 }]
      }
    });
    self.map2.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map ready for map_canvas2");
    });
  }

  onButton2_click(event) {
    var self = this;
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    var start = Date.now();

    // Geocode multiple location
    self.geocoder.geocode({
      "position": [
        { "lat": 43.031873, "lng": -71.073203 },
        { "lat": 42.989763, "lng": -70.932044 },
        { "lat": 43.04871, "lng": -70.816345 },
        { "lat": 42.882128, "lng": -70.86808 },
        { "lat": 43.092318, "lng": -70.792327 },
        { "lat": 43.077086, "lng": -70.758064 },
        { "lat": 42.807206, "lng": -71.102071 },
        { "lat": 42.811138, "lng": -70.869501 },
        { "lat": 43.111116, "lng": -70.734091 },
        { "lat": 42.786955, "lng": -71.115836 },
        { "lat": 43.221256, "lng": -70.888115 },
        { "lat": 43.232909, "lng": -70.8818 },
        { "lat": 42.744153230002, "lng": -71.157345224281 },
        { "lat": 42.764387, "lng": -71.216689 },
        { "lat": 42.741881, "lng": -71.160069 },
        { "lat": 42.960288, "lng": -71.438445 },
        { "lat": 42.94327, "lng": -71.4741 },
        { "lat": 42.665865, "lng": -71.115143 },
        { "lat": 42.656393, "lng": -71.140289 },
        { "lat": 43.222904, "lng": -71.491969 },
        { "lat": 42.76513, "lng": -71.49744 },
        { "lat": 42.585366, "lng": -70.88444 },
        { "lat": 42.700708, "lng": -71.436142 },
        { "lat": 42.80103, "lng": -71.537014 },
        { "lat": 42.62462, "lng": -71.31845 },
        { "lat": 42.556249, "lng": -70.890407 },
        { "lat": 42.623739, "lng": -71.36431 },
        { "lat": 42.545939, "lng": -70.946655 },
        { "lat": 42.54524, "lng": -70.94468 },
        { "lat": 42.555543, "lng": -71.181095 },
        { "lat": 42.581632, "lng": -71.289347 },
        { "lat": 42.519991, "lng": -71.093858 },
        { "lat": 42.518951, "lng": -70.894874 },
        { "lat": 42.515659, "lng": -71.104029 },
        { "lat": 42.518122, "lng": -71.135588 },
        { "lat": 42.517323483467, "lng": -71.135712417913 },
        { "lat": 43.385365, "lng": -70.54211 },
        { "lat": 43.385365, "lng": -70.54211 },
        { "lat": 42.49818, "lng": -71.125908 },
        { "lat": 42.502632, "lng": -70.856048 },
        { "lat": 42.488115938014, "lng": -71.0194 },
        { "lat": 42.484973, "lng": -70.901011 },
        { "lat": 42.478313, "lng": -71.023173 },
        { "lat": 42.566563, "lng": -71.421995 },
        { "lat": 42.48755, "lng": -71.20229 },
        { "lat": 42.489622, "lng": -71.27235 },
        { "lat": 42.455468, "lng": -71.064841 },
        { "lat": 42.45203, "lng": -71.136821 },
        { "lat": 42.453613, "lng": -71.233316 }
      ]
    }).then((mvcArray: BaseArrayClass<GeocoderResult>) => {

      mvcArray.on('error').subscribe((error) => {
        console.log(error);
      });

      mvcArray.on('insert_at').subscribe((index) => {

        // Get a result
        var results = mvcArray.getAt(index);
        if (results.length > 0) {

          var address = [
            results[0].subThoroughfare || "",
            results[0].thoroughfare || "",
            results[0].locality || "",
            results[0].adminArea || "",
            results[0].postalCode || "",
            results[0].country || ""].join(", ");

          self.map2.addMarker({
            'position': results[0].position,
            'icon': '../images/starbucks.gif',
            'title': address
          }).then((marker) => { 
            self.onMarkerAdded(marker); 
          });
        }
      });

      mvcArray.on('finish').subscribe(() => {
        var end = Date.now();
        alert("results : " + mvcArray.getLength() + "\n" +
          "duration: " + ((end - start) / 1000).toFixed(1) + " seconds");
        this.isRunning = false;
      });

    });
  }


  onMarkerAdded(marker) {
    marker.on(GoogleMapsEvent.MARKER_CLICK, function () {
      marker.showInfoWindow();
    });
  }
}
