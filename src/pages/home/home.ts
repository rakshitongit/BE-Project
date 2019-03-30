import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { ServerProvider } from "../../providers/server/server";
import { MedicalTestsPage, ProfilePage } from "../profile/profile";
import { Health } from '@ionic-native/health';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    profile: any;
    profileFlag: boolean = true;
    medicalFlag: boolean = true;
    progress: number = 10;
    timerP: any;
    timerM: any;

    constructor(public navCtrl: NavController,
        public server: ServerProvider,
        public modalCtrl: ModalController,
        public health: Health,
        public localNotifications: LocalNotifications,
        public alertCtrl: AlertController,
        public storage: Storage) {

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
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.localNotifications.schedule({
                title: 'Check your heart disease',
                text: 'Its time to get going. \nCheck your heart rate and be aware of the heart diseases'
            })
        }, 10000)
    }

    ionViewDidEnter() {
        this.healthSettings();
        this.storage.get('profile').then(val => {
            if (val !== null) {
                this.profileFlag = false;
                if (this.progress < 40) {
                    this.timerP = setInterval(() => {
                        this.progress++;
                        if (this.progress == 40) {
                            clearInterval(this.timerP)
                        }
                    }, 120)
                }
            }
        })
    }

    getMyCondition() {
        if (!this.profileFlag && !this.medicalFlag) {
            this.server.showLoaders('Please Wait....');
            setTimeout(() => {
                this.server.closeLoader();
                this.storage.get('result').then(val => {
                    console.log(val.reverse());
                    this.showAlert(parseInt(val[0]["result"]));
                })
            }, 2000);
        }
        else {
            this.server.showToast('Please fill the details');
        }
    }

    showAlert(data) {
        let val = "";
        switch (data) {
            case 0:
                val = "No tests required";
                break;
            case 1:
                val = "ECG";
                break;
            case 2:
                val = "ECG, Stress Test and Holter Monitoring Test";
                break;
            case 3:
                val = "ECG, Stress Test Holter Monitoring Test and CT scan";
                break;
            case 4:
                val = "ECG, Stress Test, Holter Monitoring Test, CT scan and MRI";
                break;
        }
        const alert = this.alertCtrl.create({
            title: 'Result!',
            subTitle: 'Tests Predicted are:',
            message: val,
            buttons: ['OK']
        });
        alert.present();
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
            if (data !== null && data["success"]) {
                this.medicalFlag = false;
                // if (this.progress < 100) {
                //     this.timerM = setInterval(() => {
                //         this.progress++;
                //         if (this.progress == 100) {
                //             clearInterval(this.timerM);
                //         }
                //     }, 120)
                // }
                this.progress = 100
            }
        })
    }

}
