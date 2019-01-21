import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ServerProvider} from "../../providers/server/server";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                public server: ServerProvider) {

    }

    getMyCondition() {
        this.server.showLoaders('Please Wait');
        setTimeout(()=> {
            this.server.closeLoader();
        },3000);
    }

}
