import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {TestsPage} from "../tests/tests";

/**
 * Generated class for the MainTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-main-tab',
    templateUrl: 'main-tab.html',
})
export class MainTabPage {

    tab1Root = HomePage;
    tab2Root = TestsPage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MainTabPage');
    }

}
