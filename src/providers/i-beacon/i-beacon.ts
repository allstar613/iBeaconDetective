import { Injectable } from '@angular/core';

import { Platform, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { IBeacon } from '@ionic-native/ibeacon';

/*
  Generated class for the IBeaconProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IBeaconProvider {

    delegate: any;
    beaconRegion: any;

    constructor(public platform: Platform, public events: Events, private ibeacon: IBeacon) {
        /*
                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(
                    data => this.events.publish('didRangeBeaconsInRegion', data),
                    error => console.error()
                    );
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");*/

        console.log('Hello BeaconProvider Provider');
    }

    startScan(): any {
        let promise = new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(
                    data => this.events.publish('didRangeBeaconsInRegion', data),
                    error => console.error()
                    );
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");

                this.ibeacon.startRangingBeaconsInRegion(this.beaconRegion)
                    .then(
                    () => { resolve(true); },
                    error => { resolve(false); }
                    );
            }
            else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;
    }

    stopScan(): any {

        let promise = new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {

                // Request permission to use location on iOS
                this.ibeacon.requestAlwaysAuthorization();
                // create a new delegate and register it with the native layer
                this.delegate = this.ibeacon.Delegate();
                // Subscribe to some of the delegate's event handlers
                this.delegate.didRangeBeaconsInRegion()
                    .subscribe(
                    data => this.events.publish('didRangeBeaconsInRegion', data),
                    error => console.error()
                    );
                this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");

                this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                    .then(
                    () => { resolve(true); },
                    error => { resolve(false); }
                    );
            }
            else {
                console.error("This application needs to be running on a device");
                resolve(false);
            }
        });
        return promise;

        //       this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion);
    }

    /*  stopScan(): any {
          let promise = new Promise((resolve, reject) => {
              if (this.platform.is('cordova')) {
                  // Request permission to use location on iOS
                  this.ibeacon.requestAlwaysAuthorization();
                  // create a new delegate and register it with the native layer
                  this.delegate = this.ibeacon.Delegate();
                  // Subscribe to some of the delegate's event handlers
                  this.delegate.didRangeBeaconsInRegion()
                      .subscribe(
                      data => this.events.publish('didRangeBeaconsInRegion', data),
                      error => console.error()
                      );
                  this.beaconRegion = this.ibeacon.BeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d");
  
                  this.ibeacon.stopRangingBeaconsInRegion(this.beaconRegion)
                      .then(
                      () => { resolve(true); },
                      error => { resolve(false); }
                      );
              }
              else {
                  console.error("This application needs to be running on a device");
                  resolve(false);
              }
          });
          return promise;
      }
  */


    checkBLE() {
        if (!this.ibeacon.isBluetoothEnabled()) {
            this.ibeacon.enableBluetooth();
        }

    }
}



