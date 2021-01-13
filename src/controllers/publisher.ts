import Subscriber from "./subscriber";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";

export default class Publisher {
  private subscribers: Map<String, Subscriber> = new Map<String, Subscriber>();

  public subscribe(subscriber: Subscriber, component: String): void {
    this.subscribers.set(component, subscriber);
  }

  public unsubscribe(component: String): void {
    this.subscribers.delete(component);
  }

  public post(news: News) {
    this.subscribers.get(news.to)?.notify(news);
  }
}
