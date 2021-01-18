import { News } from "../models/news";

export default interface Subscriber {
  notify(news: News): void;
}
