import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ServerProvider} from "../../providers/server/server";
import {MedicalTestsPage, ProfilePage} from "../profile/profile";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    profile: any;
    profileFlag: boolean = true;
    medicalFlag: boolean = true;

    constructor(public navCtrl: NavController,
                public server: ServerProvider,
                public modalCtrl: ModalController) {

    }

    getMyCondition() {
        if (!this.profileFlag && !this.medicalFlag) {
            this.server.showLoaders('Please Wait');
            setTimeout(() => {
                this.server.closeLoader();
            }, 3000);
        }
        else {
            this.server.showToast('Please fill the details');
        }
    }

    addProfile() {
        let modal = this.modalCtrl.create(ProfilePage, {profile: this.profile});
        modal.present();
        modal.onDidDismiss((data) => {
            if (data !== undefined && data["success"]) {
                this.profileFlag = false;
            }
        })
    }

    addMedicalTests() {
        let modal = this.modalCtrl.create(MedicalTestsPage, {profile: this.profile});
        modal.present();
        modal.onDidDismiss((data) => {
            if (data !== undefined && data["success"]) {
                this.medicalFlag = false;
            }
        })
    }

}
