import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { News } from '../../app/bObjects/news';
import { Category } from '../../app/bObjects/category';
import { DatePipe } from '@angular/common';
import { NewsProvider } from '../../providers/news/news';
import { NewsDetailPage } from '../news-detail/news-detail';

/**
 * Generated class for the NewsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html'
})
export class NewsListPage {

  public loading;

  public currentCategory : Category = new Category("");
  public currentNews : Array<Category>;
  public currentCategoryIndex = 0;
  
  public currentNewsCount = 10;
  public newsIncrement = 10;

  constructor(
    public navController : NavController,
    public navParams: NavParams,
    public loadingController : LoadingController,
    private newsProvider : NewsProvider
  ) {
    this.loadAllNews();
  }

  resetCounters(){
    this.currentNewsCount = 10;
  }

  loadAllNews(){
    //reset counters
    this.resetCounters();

    this.showLoading("Recupero le notizie ...");
    
    return this.newsProvider.loadAllNews()
      .subscribe(news => {
        this.removeLoading();
        this.currentNews = news;
        this.currentCategory.Name = this.currentNews[this.currentCategoryIndex].Name;
        this.currentCategory.NewsList = this.currentNews[this.currentCategoryIndex].NewsList.slice(0, this.currentNewsCount );
      });
  }

  loadMoreNews(infiniteScroll){
    this.currentNewsCount +=  this.newsIncrement;
    

    setTimeout(() => {
      this.currentCategory.NewsList = this.currentNews[this.currentCategoryIndex].NewsList.slice( 0, this.currentNewsCount );

      infiniteScroll.complete();
    }, 500);
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

  private lastHeader;

  dateHeaderFn(article){
    let datePipe =  new DatePipe('it');
    let newHeader = article && article.Date ? datePipe.transform(article.Date, 'MMMM d', '')  : null;

    if(newHeader != this.lastHeader){
      this.lastHeader = newHeader;
      return newHeader;
    }
    else return null;
  }

  doRefresh(refresher) {
    this.loadAllNews()
      .add(news => {
        refresher.complete();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsListPage');
  }

  onNewsClick(article){
    this.navController.push(NewsDetailPage, { 'article' : article });
  }

}
