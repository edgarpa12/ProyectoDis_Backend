import CCGStrategy from "./CCGStrategy";
import { CCG } from "../models/CCG";
import { DatabaseManager } from "./databaseManager";

export default class PetitionStrategy implements CCGStrategy {
  private static databaseManager: DatabaseManager = new DatabaseManager();

  async sendCCG(ccg: CCG): Promise<void> {
    ccg.type = "Petition";
    await PetitionStrategy.databaseManager.saveCCG(ccg);
  }
}
