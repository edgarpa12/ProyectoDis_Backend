import { StructureManager } from "./structureManager";
import { MemberManager } from "./memberManager";
import { DatabaseManager } from "./databaseManager";
import { Proxy } from "./proxy";
import { CCG } from "../models/CCG";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";
import { Roles } from "../models/roles";

export class Organization {
    private static instance: Organization;
    id: String;
    name: String;
    legalCertificate: String;
    web: String;
    direction: String;
    phone: String;
    logoName: String;
    country: String;
    email: String;
    structureM: StructureManager;
    memberM: MemberManager;
    proxy: Proxy;
    branches: String[];

    private constructor(
        pId: String = "",
        pName: String = "",
        pLegalCertificate: String = "",
        pWeb: String = "",
        pDirection: String = "",
        pPhone: String = "",
        pLogoName: String = "",
        pCountry: String = "",
        pEmail: String = "",
        pBranches: String[] = []
    ) {
        this.id = pId;
        this.name = pName;
        this.legalCertificate = pLegalCertificate;
        this.web = pWeb;
        this.direction = pDirection;
        this.phone = pPhone;
        this.logoName = pLogoName;
        this.country = pCountry;
        this.email = pEmail;
        this.structureM = new StructureManager();
        this.memberM = new MemberManager();
        this.proxy = Proxy.getInstance();
        this.branches = pBranches;
    }

    public static getInstance() {
        if (!Organization.instance) {
            Organization.instance = new Organization();
        }
        return Organization.instance;
    }

    // Organization Methods

    public async updateOrganization(pIdOrganization: String, pNewData: Object) {
        return await this.proxy.updateOrganization(pIdOrganization, pNewData);
    }

    public async deleteOrganization(pIdOrganization: String) {
        return await this.proxy.deleteOrganization(pIdOrganization);
    }

    public async getDefaultBranches() {
        this.branches = await this.proxy.getDefaultBranches(this.id);
        return this.branches;
    }

    //CATALOGO

    public async addDefaultBranch(pIdOrganization: String, pName: String) {
        const responseDB = await this.proxy.addDefaultBranch(
            pIdOrganization,
            pName
        );

        return responseDB;
    }

    public async updateDefaultBranch(pOldName: String, pName: String) {
        const responseDB = await this.proxy.updateDefaultBranch(
            this.id,
            pOldName,
            pName
        );
        return responseDB;
    }

    public async deleteDefaultBranch(pName: String) {
        const responseDB = await this.proxy.deleteDefaultBranch(
            this.id,
            pName
        );
        return responseDB;
    }

    //Member Methods

    // CRUD Members
    public async createMember(
        pName: String,
        pPhone: String,
        pEmail: String,
        pPassword: String,
        pDirection: String,
        pRole: String
    ) {
        const response = await this.memberM.create(
            pName,
            this.id,
            pPhone,
            pEmail,
            pPassword,
            pDirection,
            pRole
        );
        return response;
    }

    public async readMember(pIdUser: String) {
        await this.memberM.loadMembers(this.id);
        return await this.memberM.read(pIdUser);
    }

    public async updateMember(pId: String, pData: Object) {
        const response = await this.memberM.update(pId, pData);
        // await this.memberM.loadMembers(this.id);
        return response;
    }

    public async deleteMember(pId: String) {
        const response = await this.memberM.delete(pId);
        // await this.memberM.loadMembers(this.id);
        return response;
    }

    public async getMembers() {
        await this.memberM.loadMembers(this.id);
        return this.memberM.getMembers();
    }

    // Old
    // public async getMonitors() {
    //     await this.memberM.loadMembers(this.id);
    //     return this.memberM.getMonitors();
    // }

    // New
    public async getMonitors() {
        return await this.memberM.getMonitors();
    }

    // Structures Methods

    // todo

    public async createStructure(pName: String, pIdParent: String, groupNumber: String) {
        const responseDB = await this.structureM.create(pName, pIdParent, groupNumber);
        // await this.structureM.loadStructures(this.id);
        return responseDB;
    }

    public async getStructures() {
        await this.structureM.loadStructures(this.id);
        const responseDB = await this.structureM.getStructures();
        return responseDB;
    }

    public async updateStructure(pId: String, pNewName: String) {
        const responseDB = await this.structureM.update(pId, pNewName);
        // await this.structureM.loadStructures(this.id);
        return responseDB;
    }

    public async deleteStructure(pId: String) {
        const responseDB = await this.structureM.delete(pId);
        // await this.structureM.loadStructures(this.id);
        return responseDB;
    }

    public async changeGroup(
        pIdMember: String,
        pIdOldGroup: String,
        pIds: String[]
    ) {
        const responseAdd = await this.structureM.addMemberToGroup(pIdMember, pIds);
        return responseAdd;
    }

    public findLevel(pIdParent: String) {
        return this.structureM.findLevel(pIdParent);
    }

    // public signUp(
    //     pName: String,
    //     pLegalCertificate: String,
    //     pWeb: String,
    //     pDirection: String,
    //     pPhone: String,
    //     pLogoName: String,
    //     pCountry: String,
    //     pEmail: String,
    //     pPassword: String
    // ) {
    //     return this.databaseM.createOrganization(
    //         pName,
    //         pLegalCertificate,
    //         pWeb,
    //         pDirection,
    //         pPhone,
    //         pLogoName,
    //         pCountry,
    //         pEmail,
    //         pPassword
    //     );
    // }

    public async signUp(pCeo: any, pOrganization: any) {
        const organization = await this.proxy.createOrganization(
            pOrganization.name,
            pOrganization.legalCertificate,
            pOrganization.web,
            pOrganization.direction,
            pOrganization.phone,
            pOrganization.logoName,
            pOrganization.country,
            pOrganization.email
        );

        pCeo.role = Roles[Roles.CEO];
        const member = await this.memberM.create(pCeo.name, organization.id, pCeo.phone, pCeo.email, pCeo.password, pCeo.direction, pCeo.role);
        return member;
    }

    public async signIn(email: String, password: String) {
        // const organization = await this.databaseM.validateOrganization(
        //     email,
        //     password
        // );
        // if (organization != []) {
        //     // this.structureM.setIdOrganization(organization[0]); //Referencia al id
        //     this.loadData(organization);
        //     return organization;
        // }

        const response = await this.memberM.signIn(email, password);
        const organization = response[0];

        if (organization !== "0") {
            await this.loadData(organization);
            return response;
        } else {
            return 0;
        }

    }

    public async signOut() {
        this.id = "";
        this.legalCertificate = "";
        this.web = "";
        this.direction = "";
        this.phone = "";
        this.logoName = "";
        this.country = "";
        this.email = "";
        return "Tudo Bem";
    }

    public async loadData(data: (String | String[][])) {
        this.id = data[0] as String;
        this.name = data[1] as String;
        this.legalCertificate = data[2] as String;
        this.web = data[3] as String;
        this.direction = data[4] as String;
        this.phone = data[5] as String;
        this.logoName = data[6] as String;
        this.country = data[7] as String;
        this.email = data[8] as String;
        this.branches = data[9] as String[];
        await this.structureM.loadStructures(this.id);
        console.log("Organizacion: ", this.name);
    }

    public async getStructureMembers(pIds: String[]) {
        await this.structureM.loadStructures(this.id);
        const responseDB = await this.structureM.getStructureMembers(pIds);
        return responseDB;
    }

    public async getStructureBosses(pIds: String[]) {
        await this.structureM.loadStructures(this.id);
        return this.structureM.getStructureBosses(pIds);
    }

    public async getStructureGroups(pIds: String[]) {
        await this.structureM.loadStructures(this.id);
        return this.structureM.getStructureGroups(pIds);
    }

    public async getStructuresXMember(idUser: String) {
        await this.structureM.loadStructures(this.id);
        const structuresXMember = await this.structureM.getStructuresXMember(
            idUser,
            this.structureM.getStructures()
        );
        return structuresXMember;
    }

    public async addMemberToGroup(pIdMember: String, pIds: String[]) {
        const responseDB = await this.structureM.addMemberToGroup(pIdMember, pIds);

        return responseDB;
    }

    public async removeMemberFromStructure(pIdMember: String, pIds: String) {
        const responseDB = this.structureM.removeMemberFromStructure(
            pIdMember,
            pIds
        );
        return responseDB;
    }

    public async removeBossFromStructure(
        pIdMember: String,
        pIdBranch: String,
        pIdGroup: String
    ) {
        return this.structureM.removeBossFromStructure(
            pIdMember,
            pIdBranch,
            pIdGroup
        );
    }

    public async removeMonitorFromGroup(
        pIdMember: String,
        pIdBranch: String,
        pIdGroup: String
    ) {
        this.memberM.update(pIdMember, { monitor: false })
        return this.structureM.removeBossFromStructure(
            pIdMember,
            pIdBranch,
            pIdGroup
        );
    }

    public addBossToGroup(pIdMember: String, pIds: String[]) {
        return this.structureM.addBossToGroup(pIdMember, pIds);
    }

    public async addMonitorToGroup(pIdMember: String, pIds: String[]) {
        const added = await this.addBossToGroup(pIdMember, pIds);
        return added;
    }

    public async getDefaultBranch() {
        return this.branches;
    }

    public async sendCCG(ccg: CCG, type: String) {
        await this.structureM.sendCCG(ccg, type);
    }

    public async sendNews(news: News) {
        await this.structureM.sendNews(news);
    }

    public async seenNews(pIdMember: String, pSeenNews: [String]) {
        await this.structureM.seenNews(pIdMember, pSeenNews);
    }


}
