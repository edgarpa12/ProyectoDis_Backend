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

    public async getStructure(pIdStructure: String) {
        return await this.databaseManager.getStructure(pIdStructure);
    }

    public async getStructureChildren(pIdParent: String) {
        return await this.databaseManager.getStructureChildren(pIdParent);
    }

    public async removeFromGroup(pSearch: Object, pIdStructure: String) {
        return await this.databaseManager.removeFromGroup(pSearch, pIdStructure);
    }

    public async addBossToGroup(pIdMember: String, pIdStructure: String) {
        return await this.databaseManager.addBossToGroup(pIdMember, pIdStructure);
    }

    public async loadStructures(pParent: String) {
        this.structures = await this.databaseManager.loadStructures(pParent, pParent);
        return this.structures;
    }

    public async createStructure(...args: any[]) {
        const data = args[0];
        return await this.databaseManager.createStructure(data[0], data[1], data[2]);
    }

    public async updateStructure(...args: any[]) {
        const data = args[0];
        return await this.databaseManager.updateStructure(data[0], data[1]);
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

    public async signIn(pEmail: String, pPassword: String) {
        return await this.databaseManager.signIn(pEmail, pPassword);
    }

    public async createMember(...args: any[]) {
        const data = args[0];
        return await this.databaseManager.createMember(
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6]
        );
    }

    public async updateMember(...args: any[]) {
        const data = args[0];
        return this.databaseManager.updateMember(data[0], data[1]);
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

    async seenNews(pIdMember: String, pSeenNews: [String]) {
        await this.databaseManager.seenNews(pIdMember, pSeenNews);
    }


    //////////// Organization ////////////

    public createOrganization(
        pName: String,
        pLegalCertificate: String,
        pWeb: String,
        pDirection: String,
        pPhone: String,
        pLogoName: String,
        pCountry: String,
        pEmail: String
    ) {
        return this.databaseManager.createOrganization(
            pName,
            pLegalCertificate,
            pWeb,
            pDirection,
            pPhone,
            pLogoName,
            pCountry,
            pEmail
        );
    }


    public async updateOrganization(pIdOrganization: String, pNewData: Object) {
        return await this.databaseManager.updateOrganization(pIdOrganization, pNewData);
    }

    public async deleteOrganization(pIdOrganization: String) {
        return await this.databaseManager.removeOrganization(pIdOrganization);
    }

    public async getDefaultBranches(pIdOrganization: String) {
        return await this.databaseManager.loadDefaultBranches(pIdOrganization);
    }

    //CATALOGO

    public async addDefaultBranch(pIdOrganization: String, pName: String) {
        const responseDB = await this.databaseManager.addDefaultBranch(
            pIdOrganization,
            pName
        );

        return responseDB;
    }

    public async updateDefaultBranch(pOldName: String, pName: String, pIdOrganization: String) {
        const responseDB = await this.databaseManager.updateDefaultBranch(
            pIdOrganization,
            pOldName,
            pName
        );
        return responseDB;
    }

    public async deleteDefaultBranch(pName: String, pIdOrganization: String) {
        const responseDB = await this.databaseManager.deleteDefaultBranch(
            pIdOrganization,
            pName
        );
        return responseDB;
    }
}
