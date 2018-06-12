import { Component } from '@angular/core';

/**
 * Generated class for the NewsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news-list',
  templateUrl: 'news-list.html'
})
export class NewsListComponent {

  text: string;

  constructor() {
    console.log('Hello NewsListComponent Component');
    this.text = 'Hello World';
  }

}
