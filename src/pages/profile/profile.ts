import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

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
                public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        setInterval(() => {
            this.smokesFlag = parseInt(this.profile.smoke) === 0;
            this.btnflag = (this.profile.name == '' || this.profile.sex == '' || this.profile.age == '' || this.profile.smoke == '' || this.profile.diabetesFasting == '' || this.profile.diabetes == '' || this.profile.bpBottom == '' || this.profile.bpTop == '');
        })
    }

    saveProfile() {
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
        thal: ''
    };
    data: any = {
        success: false
    };
    btnflag: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        setInterval(() => {
            this.btnflag = (this.medicaltests.cp == '' || this.medicaltests.trestbps == '' || this.medicaltests.chol == '' || this.medicaltests.fbs == '' || this.medicaltests.restecg == '' || this.medicaltests.thalach == '' || this.medicaltests.exang == '' || this.medicaltests.oldpeak == '' || this.medicaltests.slope == '' || this.medicaltests.thal == '' || this.medicaltests.num == '');
        })
    }

    saveMedicaltests() {
        this.data.success = true;
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.data);
    }

}
