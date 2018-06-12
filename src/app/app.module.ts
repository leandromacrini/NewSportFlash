import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsListPage } from '../pages/news-list/news-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import { AdmobFreeProvider } from '../providers/admob-free/admob-free';
import { NewsProvider } from '../providers/news/news';
import { HttpClientModule } from '@angular/common/http';
import { LimitTextPipe} from './pipes/textLimit.pipe'

//LOCALE
import { registerLocaleData, DatePipe } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { NewsDetailPage } from '../pages/news-detail/news-detail';

// the second parameter 'fr' is optional
registerLocaleData(localeIt, 'it');


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsListPage,
    NewsDetailPage,
    LimitTextPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewsListPage,
    NewsDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdMobFree,
    AdmobFreeProvider,
    NewsProvider
  ]
})
export class AppModule {}
