import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  data: any;

  constructor(public http: Http) {

  }

  load_I() {

    this.data = false;

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions_I.json').map(res => res.json()).subscribe(data => {
        this.data = data.questions;
        resolve(this.data);
      });

    });

  }
  load_T() {

    this.data = false;

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions_T.json').map(res => res.json()).subscribe(data => {
        this.data = data.questions;
        resolve(this.data);
      });

    });

  }
  load_M() {

    this.data = false;

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions_M.json').map(res => res.json()).subscribe(data => {
        this.data = data.questions;
        resolve(this.data);
      });

    });

  }

}
