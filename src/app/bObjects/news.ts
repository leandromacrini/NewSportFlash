import { DateTime } from "ionic-angular";
import { NewsDetail } from "./news-detail";

export class News {
    Id : number;
    ThumbImage: string;
    Title: string;
    Source: string;
    Category: string;
    Date : string;
    ScrapeId : string;
    Detail : NewsDetail;
  }
