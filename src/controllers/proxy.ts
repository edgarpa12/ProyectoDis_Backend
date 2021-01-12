import { CompositeStructure } from "../Models/structureComposite";
import { DatabaseManager } from "./databaseManager";
import { DBInterface } from "./DBInterface";

export class Proxy implements DBInterface {
  private static instance: Proxy;
  public static getInstance() {
    if (this.instance === null)
      this.instance = new Proxy();

    return this.instance;
  }

  private structures: CompositeStructure[] = [];
  private databaseManager: DatabaseManager = new DatabaseManager();

  public getStructures() {
    return this.structures;
  }

  public async removeFromGroup(pSearch: Object, pIdStructure: String) {
    return await this.databaseManager.removeFromGroup(pSearch, pIdStructure);
  }

  public async addBossToGroup(pIdMember: String, pIdStructure: String) {
    return await this.databaseManager.addBossToGroup(pIdMember, pIdStructure);
  }
  
}