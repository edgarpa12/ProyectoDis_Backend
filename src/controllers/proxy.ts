import { Member } from "../Models/member";
import { CompositeStructure } from "../Models/structureComposite";
import { DatabaseManager } from "./databaseManager";
import { DBInterface } from "./DBInterface";

export class Proxy implements DBInterface {
    // Singleton
    private static instance: Proxy = new Proxy();

    public static getInstance() {
        return this.instance;
    }

    private databaseManager: DatabaseManager = new DatabaseManager();

    //////////// Structure ////////////
    private structures: CompositeStructure[] = [];

    public getStructures() {
        return this.structures;
    }

    public async removeFromGroup(pSearch: Object, pIdStructure: String) {
        return await this.databaseManager.removeFromGroup(pSearch, pIdStructure);
    }

    public async addBossToGroup(pIdMember: String, pIdStructure: String) {
        return await this.databaseManager.addBossToGroup(pIdMember, pIdStructure);
    }

    public async loadStructures(pParent: String) {
        this.structures = await this.databaseManager.loadStructures(pParent, pParent);
    }

    public async createStructure(...args: any[]) {
        const data = args[0];
        return await this.databaseManager.createStructure(data[0], data[1], data[2]);
    }

    public async updateStructure(...args: any[]) {
        return await this.databaseManager.updateStructure(args[0], args[1]);
    }

    public async deleteStructure(...args: any[]) {
        return this.databaseManager.deleteStructure(args[0]);
    }

    public async findLevel(...args: any[]) {
        return this.databaseManager.findLevel(args[0]);
    }

    public async addMemberToGroup(pIdMember: String, pIdStructure: String) {
        return await this.databaseManager.addMemberToGroup(pIdMember, pIdStructure);
    }

    //////////// Members ////////////

    members: Member[] = [];

    public async createMember(...args: any[]) {
        const data = args[0];
        return await this.databaseManager.createMember(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5]
        );
    }

    public async updateMember(...args: any[]) {
        return this.databaseManager.updateMember(args[0], args[1]);
    }

    public async deleteMember(...args: any[]) {
        return this.databaseManager.deleteMember(args[0]);
    }

    public getMembers() {
        return this.members;
    }

    public async loadMembers(pIdOrganization: String) {
        this.members = await this.databaseManager.loadMembers(pIdOrganization);
        return this.members;
    }
  // public async loadMembers(pIdOrganization: String) {
  //  this.members = await this.databaseManager.loadMembers(pIdOrganization);
  // }

  async seenNews(pIdMember: String, pSeenNews: [String]) {
    await this.databaseManager.seenNews(pIdMember, pSeenNews);
  }
}
