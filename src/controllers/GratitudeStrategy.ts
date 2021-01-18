import CCGStrategy from "./CCGStrategy";
import { CCG } from "../models/CCG";
import { DatabaseManager } from "./databaseManager";

export default class GratitudeStrategy implements CCGStrategy {
  private static databaseManager: DatabaseManager = new DatabaseManager();

  async sendCCG(ccg: CCG): Promise<void> {
    ccg.type = "Gratitude";
    await GratitudeStrategy.databaseManager.saveCCG(ccg);
  }
}
