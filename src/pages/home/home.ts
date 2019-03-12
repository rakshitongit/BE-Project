import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ServerProvider } from "../../providers/server/server";
import { MedicalTestsPage, ProfilePage } from "../profile/profile";
import { Health } from '@ionic-native/health';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
        public modalCtrl: ModalController,
        public health: Health,
        public localNotifications: LocalNotifications) {

    }

    healthSettings() {
        this.health.isAvailable()
            .then((available: boolean) => {
                console.log(available);
                this.health.requestAuthorization([
                    'distance', 'nutrition',  //read and write permissions
                    {
                        read: ['steps', 'blood_pressure', 'distance', 'calories', 'activity', 'heart_rate', 'fat_percentage', 'blood_glucose', 'nutrition', 'gender', 'date_of_birth', 'nutrition', 'nutrition.X'],       //read only permission
                        write: ['height', 'weight']  //write only permission
                    }
                ])
                    .then(res => {
                        console.log(res)
                        this.server.getHealthQuery('blood_pressure');
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    ionViewDidEnter() {
        this.healthSettings();
        this.localNotifications.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            foreground: true
        })

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
        let modal = this.modalCtrl.create(ProfilePage, { profile: this.profile });
        modal.present();
        modal.onDidDismiss((data) => {
            if (data !== undefined && data["success"]) {
                this.profileFlag = false;
            }
        })
    }

    addMedicalTests() {
        let modal = this.modalCtrl.create(MedicalTestsPage, { profile: this.profile });
        modal.present();
        modal.onDidDismiss((data) => {
            if (data !== undefined && data["success"]) {
                this.medicalFlag = false;
            }
        })
    }

}
