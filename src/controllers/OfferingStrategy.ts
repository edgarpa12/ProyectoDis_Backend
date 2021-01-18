import CCGStrategy from "./CCGStrategy";
import { CCG } from "../models/CCG";
import { DatabaseManager } from "./databaseManager";

export default class OfferingStrategy implements CCGStrategy {
  private static databaseManager: DatabaseManager = new DatabaseManager();

  async sendCCG(ccg: CCG): Promise<void> {
    ccg.type = "Offering";
    await OfferingStrategy.databaseManager.saveCCG(ccg);
  }
}
