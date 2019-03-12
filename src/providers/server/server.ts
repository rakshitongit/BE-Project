import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController, Platform} from "ionic-angular";
import {Toast} from "@ionic-native/toast";
import { Health } from '@ionic-native/health';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

    loader: any;

    constructor(public http: HttpClient,
                public loadingCtrl: LoadingController,
                private toast: Toast,
                private platform: Platform,
                public health: Health) {
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

    showToast(msg) {
        if (this.platform.is('cordova')) {
            this.toast.show(msg, '3000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        }
    }

    getHealthQuery(param: string) {
        return this.health.query({
            startDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // three days ago
            endDate: new Date(), // now
            dataType: param,
            limit: 1000
        })
    }

}
