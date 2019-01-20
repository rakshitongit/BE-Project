import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {GooglePlus} from "@ionic-native/google-plus";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    login: any = {};
    btndisable: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private googlePlus: GooglePlus) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    logIn() {
        this.navCtrl.setRoot(HomePage);
    }

    resetPassword() {

    }

    register() {

    }

    googleLogIn() {
        this.googlePlus.login({
            'webClientId': '438399367238-d1ltecambfi5j58cj2hb1donmtkoec36.apps.googleusercontent.com'
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
    }

}
