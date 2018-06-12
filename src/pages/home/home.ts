import { Component } from '@angular/core';
import { NavController, NavParams ,Platform, IonicPage } from 'ionic-angular';
import { AdmobFreeProvider } from '../../providers/admob-free/admob-free';
import { LoadingController } from 'ionic-angular';
import { NewsListPage } from '../news-list/news-list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public bannerSize: "LARGE_BANNER";
  public bannerSizeOpts = {};
  public bannerAtTop: boolean = false;
  public bannerOverlap: boolean = true;
  public adAutoShow: boolean = true;
  public keys;
  public loading;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private admobFree: AdmobFreeProvider,
    public loadingController : LoadingController,
    public navController : NavController
  ) {
    this.platform.ready().then(() => {
      if(this.platform.is('android')) {
        this.bannerSizeOpts = this.admobFree.bannerSizes[0]['android'];
      } else {
        this.bannerSizeOpts = this.admobFree.bannerSizes[1]['ios'];
      }
      this.keys = Object.keys(this.bannerSizeOpts);
      
    });
  }

  showLoading(text: string) {
    if(this.loading) throw "Error: Loading already shown";
    this.loading = this.loadingController.create( { content : text});
    this.loading.present();
  }

  removeLoading() {
    if(!this.loading) throw "Error: Loading doesn't exists";

    this.loading.dismiss();
    this.loading = null;
  }

  prepareBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    console.log('prepareBanner() called.');
    return this.admobFree.prepareBanner();
    
  }

  showBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    this.admobFree.showBanner();
    console.log('showBanner() called.');
  }

  hideBanner() {
    this.admobFree.hideBanner();
    console.log('hideBanner() called.');
  }

  removeBanner() {
    this.admobFree.removeBanner();
    console.log('removeBanner() called.');
  }

  prepareInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.prepareInterstitial();
    console.log('prepareInterstitial() called.');
  }

  showInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.showInterstitial();
    console.log('showInterstitial() called.');
  }

  loadAllNews(){
    this.navController.push(NewsListPage);
  }
}
