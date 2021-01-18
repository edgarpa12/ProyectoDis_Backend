import Subscriber from "./subscriber";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";

export default class Publisher {
  private subscribers: Map<String, Subscriber> = new Map<String, Subscriber>();

  public subscribe(component: String, subscriber: Subscriber): void {
    this.subscribers.set(component, subscriber);
  }

  public unsubscribe(component: String): void {
    this.subscribers.delete(component);
  }

  public clear() {
    this.subscribers.clear();
  }

  public post(news: News) {
    console.log("Notifying: ", news);
    console.log(this.subscribers);
    this.subscribers.get(news.to)?.notify(news);
  }
}
