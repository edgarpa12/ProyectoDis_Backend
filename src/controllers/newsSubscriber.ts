import Subscriber from "./subscriber";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";
import { DatabaseManager } from "./databaseManager";

export default class NewsSubscriber implements Subscriber {
  component: AbstractComponent;
  private static databaseManager: DatabaseManager = new DatabaseManager();

  constructor(component: AbstractComponent) {
    this.component = component;
  }

  async notify(news: News): Promise<void> {
    await NewsSubscriber.databaseManager.saveNews(news, this.component);
  }
}
