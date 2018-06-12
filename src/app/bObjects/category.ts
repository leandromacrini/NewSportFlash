import { News } from "./news";

export class Category {
    Name: string;
    NewsList: Array<News>;

    /**
     *
     */
    constructor(name: string, news? : Array<News>) {
        this.Name = name;
        this.NewsList = news || Array<News>();
    }
  }
