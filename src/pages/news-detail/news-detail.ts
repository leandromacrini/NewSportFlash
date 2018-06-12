import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { News } from '../../app/bObjects/news';
import { NewsProvider } from '../../providers/news/news';

/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  public loading;

  public article : News;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public newsProvider : NewsProvider
  ) {
    this.article = this.navParams.get('article') as News;

    if(!this.article.Detail){
      this.loadNewsDetail();
    }
  }

  loadNewsDetail(){
    this.showLoading("Recupero l'articolo ...");

    return this.newsProvider.loadNewsDetail(this.article)
      .subscribe(article => {
        this.removeLoading();

        this.article = article;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
  }

}
