import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    profile: any = {
        name: '',
        age: '',
        smoke: '',
        cigs: '',
        diabetesFasting: '',
        diabetes: '',
        bpBottom: '', //diastolic
        bpTop: '',  //systolic
        sex: ''
    };
    data: any = {
        success: false
    };
    smokesFlag: boolean = false;
    btnflag: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public storage: Storage) {
    }

    ionViewDidLoad() {
        setInterval(() => {
            this.smokesFlag = parseInt(this.profile.smoke) === 0;
            this.btnflag = (this.profile.name == '' || this.profile.sex == '' || this.profile.age == '' || this.profile.smoke == '' || this.profile.diabetesFasting == '' || this.profile.diabetes == '' || this.profile.bpBottom == '' || this.profile.bpTop == '');
        })
    }

    saveProfile() {
        this.storage.set('profile', this.profile);
        this.data.success = true;
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.data);
    }

}


@Component({
    selector: 'page-profile',
    templateUrl: 'medical-tests.html',
})
export class MedicalTestsPage {

    medicaltests: any = {
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        thal: '',
        ca: ''
    };
    data: any = {
        success: false
    };
    btnflag: boolean = true;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private server: ServerProvider,
        public storage: Storage) {
    }

    ionViewDidEnter() {
        this.getDataFromHealth();

        // setInterval(() => {
        //     this.btnflag = (this.medicaltests.cp == '' || this.medicaltests.trestbps == '' || this.medicaltests.chol == '' || this.medicaltests.fbs == '' || this.medicaltests.restecg == '' || this.medicaltests.thalach == '' || this.medicaltests.exang == '' || this.medicaltests.oldpeak == '' || this.medicaltests.slope == '' || this.medicaltests.thal == '' || this.medicaltests.num == '');
        // })
    }

    getDataFromHealth() {
        this.server.getHealthQuery('blood_pressure').then(data => {
            console.log(data)
            if (data.length > 0) {
                data.reverse();
                this.medicaltests.trestbps = data[0]["value"]["systolic"];
                this.server.showToast("Latest Blood Pressure detected from google Fit app: " + data[0]["value"]["systolic"] + ' / ' + data[0]["value"]["diastolic"] + ' ' + data[0]["unit"])
            }
        }).catch(err => console.log(err));
        this.server.getHealthQuery('heart_rate').then(data => {
            console.log(data)
            if (data.length > 0) {
                data.reverse();
                this.server.showToast("Latest heart_rate detected from google Fit app: " + data[0]["value"]["systolic"] + ' / ' + data[0]["value"]["diastolic"] + ' ' + data[0]["unit"])
            }
        }).catch(err => console.log(err));
    }

    getTests(val) {
        let k = [];
        switch (val) {
            case 3:
                k.push("MRI")
                k.push("CT scan")
            case 2:
                k.push("Holter Monitoring Test")
                k.push("Stress Test")
            case 1:
                k.push("ECG");
        }
        return k.reverse();
    }

    saveMedicaltests() {
        let age, sex
        this.storage.get('profile').then(val => {
            age = val["age"]
            sex = val["sex"]
            this.server.showLoaders('Synchronizing....')
            let data = "run?cp=" + this.medicaltests["cp"] + "&trestbps=" + this.medicaltests["trestbps"] + "&chol=" + this.medicaltests["chol"] + "&fbs=" + this.medicaltests["fbs"] + "&restecg=" + this.medicaltests["restecg"] + "&thalach=" + this.medicaltests["thalach"] + "&exang=" + this.medicaltests["exang"] + "&oldpeak=" + this.medicaltests["oldpeak"] + "&slope=" + this.medicaltests["slope"] + "&ca=" + this.medicaltests["ca"] + "&thal=" + this.medicaltests["thal"] + "&age=" + age + "&sex=" + sex;
            this.server.getPredictions(data).subscribe(val => {
                console.log(val);
                this.storage.get('result').then(value => {
                    console.log("Result ", value);
                    let data = {
                        result: val["result"],
                        tests: this.getTests(parseInt(val["result"])),
                        date: new Date()
                    }
                    if (value !== null) {
                        value.push(data)
                    } else {
                        value = [];
                        value.push(data)
                    }
                    this.storage.set('result', value)
                })
                this.data.success = true;
                this.dismiss();
                this.server.closeLoader();
            })
        })
    }

    dismiss() {
        this.viewCtrl.dismiss(this.data);
    }

}
