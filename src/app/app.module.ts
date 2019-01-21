import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {GooglePlus} from "@ionic-native/google-plus";
import {TestsPage} from "../pages/tests/tests";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {ServerProvider} from '../providers/server/server';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        MyApp,
        ProgressBarComponent,
        HomePage,
        TestsPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ProgressBarComponent,
        HomePage,
        TestsPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GooglePlus,
        ServerProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
