import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { News } from '../../app/bObjects/news'
import { Category } from '../../app/bObjects/category';
import { mockNews, mockDetail } from './mocks';
import { of } from 'rxjs/observable/of';
import { NewsDetail } from '../../app/bObjects/news-detail';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin' : '*'})
};

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  private tag = "roma";
  private apiUrl = `http://sportflash.leonarts.it`;

  constructor(private http: HttpClient) {
    console.log('Hello NewsProvider Provider');

    
  }

  loadAllNews (): Observable<Category[]> {
    //return this.http.get<News[]>(`${this.apiUrl}/news/${this.tag}`)
    return of(mockNews)
      .pipe(
        map (news => 
        {
          let categories = Array<Category>();

          categories.push( new Category('IN PRIMA PAGINA', news));

          let category;
          news.forEach(article => {
            category = null;
            let isNewCategory = false;
            for (let index = 0; index < categories.length; index++) {
              if(categories[index].Name == article.Category){
                category = categories[index];
                break;
              }
            }
            if(!category)
            {
              category = new Category(article.Category);
              isNewCategory = true;
            }
            category.NewsList.push(article);
            if(isNewCategory) 
            {
              categories.push(category);
            }
          });
          return categories;
        })
      );

  }

  loadNewsDetail(article: News): Observable<News> {
    //return this.http.get<NewsDetail>(`${this.apiUrl}/article/${article.Id}`)
    return of(mockDetail)
      .pipe(
        map ( updatedArticle => 
        {
          article.Detail = new NewsDetail();
          article.Detail.Url = updatedArticle.Url;
          article.Detail.Author = updatedArticle.Author;
          article.Detail.MainImage = updatedArticle.MainImage;
          article.Detail.Video = updatedArticle.Video;
          article.Detail.Stream = updatedArticle.Stream;

          try {
            article.Detail.Content = updatedArticle.Content;
            
            /*
            article.Detail.Content = Encoder.htmlDecode(updatedArticle.Content);
            

            article.detail.content = news.detail.content.replace(/<style[^>]*>[^]+?<\/style>/g, "");
            article.detail.content = news.detail.content.replace(/<script[^>]*>[^]+?<\/script>/g, "");
            article.detail.content = news.detail.content.replace(/<iframe[^>]*>[^]+?<\/iframe>/g, "");
            */
            
          }
          catch (e) {
            
          }

          return article;
        })
      );
  }

}
