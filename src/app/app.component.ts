import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { MainTabPage } from "../pages/main-tab/main-tab";
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any, icon: any, color: string, flag: boolean }>;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public storage: Storage) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Dashboard', component: MainTabPage, icon: 'ios-home', color: 'red', flag: true },
            { title: 'Logout', component: LoginPage, icon: 'ios-power', color: 'red', flag: true }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component === LoginPage) {
            this.storage.clear();
        }
        this.nav.setRoot(page.component);
    }
}
