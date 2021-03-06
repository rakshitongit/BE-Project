import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { GooglePlus } from "@ionic-native/google-plus";
import { TestsPage } from "../pages/tests-history/tests-history";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";
import { ServerProvider } from '../providers/server/server';
import { HttpClientModule } from "@angular/common/http";
import { MedicalTestsPage, ProfilePage } from "../pages/profile/profile";
import { Toast } from "@ionic-native/toast";
import { Health } from "@ionic-native/health";
import { SocialSharing } from "@ionic-native/social-sharing"; 
import { MainTabPage } from "../pages/main-tab/main-tab";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        MyApp,
        ProgressBarComponent,
        HomePage,
        TestsPage,
        LoginPage,
        ProfilePage,
        MainTabPage,
        MedicalTestsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ProgressBarComponent,
        HomePage,
        TestsPage,
        LoginPage,
        ProfilePage,
        MedicalTestsPage,
        MainTabPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GooglePlus,
        ServerProvider,
        Toast,
        Health,
        LocalNotifications,
        SocialSharing,
        LocationAccuracy,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {
}
