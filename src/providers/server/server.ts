import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

    loader: any;

    constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
        console.log('Hello ServerProvider Provider');
    }

    showLoaders(msg: any) {
        this.loader = this.loadingCtrl.create({
            content: msg + "...",
            enableBackdropDismiss: true,
            spinner: 'bubbles'
        });
        this.loader.present();
    }

    closeLoader() {
        this.loader.dismiss();
    }

}
