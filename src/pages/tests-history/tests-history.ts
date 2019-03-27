import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-tests',
    templateUrl: 'tests-history.html',
})
export class TestsPage {

    results: any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public server: ServerProvider,
        public storage: Storage) {
    }

    ionViewDidEnter() {
        this.storage.get('result').then(data => {
            console.log("result", data);
            this.results = data;
        })
    }

    getList(list) {
        let val = "";
        for (let ev of list) {
            val += ev + "  "
        }
        if (list.length == 0)
            val = "No tests required"
        return val;
    }
}
