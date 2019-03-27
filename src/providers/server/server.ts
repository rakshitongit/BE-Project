import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Platform } from "ionic-angular";
import { Toast } from "@ionic-native/toast";
import { Health } from '@ionic-native/health';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

    loader: any;

    serverUrl = "";

    constructor(public http: HttpClient,
        public loadingCtrl: LoadingController,
        private toast: Toast,
        private platform: Platform,
        public health: Health,
        public socialSharing: SocialSharing,
        public storage: Storage) {
        setInterval(() => {
            this.storage.get('baseUrl').then(data => {
                this.serverUrl = data;
            })
        }, 1000)
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

    share(message, subject, file, url) {
        this.socialSharing.share(message, subject, file, url).then(() => {
            // Sharing via email is possible
        }).catch(() => {
            // Sharing via email is not possible
        });
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

    getPredictions(url) {
        return this.http.get(this.serverUrl + url);
    }

}
