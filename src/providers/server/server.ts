import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingController, Platform} from "ionic-angular";
import {Toast} from "@ionic-native/toast";

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
                private platform: Platform) {
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

}
