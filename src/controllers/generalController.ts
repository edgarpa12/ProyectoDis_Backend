import { Request, Response } from "express";
import { Organization } from "./organization";
import { CCG } from "../models/CCG";
import GratitudeStrategy from "./GratitudeStrategy";
import OfferingStrategy from "./OfferingStrategy";
import PetitionStrategy from "./PetitionStrategy";
import { News } from "../models/news";
import { AbstractComponent } from "../models/abstractComponent";

export class GeneralController {
    private static instance: GeneralController;

    public static getInstance() {
        if (!GeneralController.instance) {
            GeneralController.instance = new GeneralController();
        }
        return GeneralController.instance;
    }

    //Members Functions
    public async getMembers() {
        try {
            return await Organization.getInstance().getMembers();
        } catch (err) {
            console.error(err);
        }
    }

    // Recibe id del miembro a buscar
    public async getMember(idUser: String) {
        try {
            return await Organization.getInstance().readMember(idUser);
        } catch (err) {
            console.error(err);
        }
    }

    public async createMember(name: String, phone: String, email: String, direction: String, monitor: boolean) {
        return await Organization.getInstance().createMember(
            name,
            phone,
            email,
            direction,
            monitor
        );
    }

    public async updateMember(id: String, newData: Object) {
        return await Organization.getInstance().updateMember(id, newData);
    }

    public async deleteMember(id: String) {
        try {
            return await Organization.getInstance().deleteMember(id);
        } catch (err) {
            console.error(err);
        }
    }

    public async changeGroup(idUser: String, idOldGroup: String,
        ids: String[]) {
        return await Organization.getInstance().changeGroup(
            idUser,
            idOldGroup,
            ids
        );
    }

    public async getMonitors() {
        return await Organization.getInstance().getMonitors();
    }

    // Structure
    public async createStructure(name: String, idParent: String, groupNumber: String) {
        return Organization.getInstance().createStructure(
            name,
            idParent,
            groupNumber
        );
    }


    public async updateStructure(_id: String, newName: String) {
        return await Organization.getInstance().updateStructure(
            _id,
            newName
        );
    }

    public async deleteStructure(id: String) {
        return await Organization.getInstance().deleteStructure(id);
    }

    public async getStructures() {
        return await Organization.getInstance().getStructures();
    }

    public async getDefaultBranches() {
        return await Organization.getInstance().getDefaultBranches();
    }

    public async getLevelByParent(idParent: String) {
        return await Organization.getInstance().findLevel(idParent);
    }

    public async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const message = await Organization.getInstance().signIn(email, password);
            return res.json(message);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async signUp(req: Request, res: Response) {
        const {
            name,
            legalCertificate,
            web,
            direction,
            phone,
            logoName,
            country,
            email,
            password,
        } = req.body;
        try {
            const message = await Organization.getInstance().signUp(
                name,
                legalCertificate,
                web,
                direction,
                phone,
                logoName,
                country,
                email,
                password
            );
            return res.json(message);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public signOut(req: Request, res: Response) {
        try {
            const message = Organization.getInstance().signOut();
            return res.json(message);
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: err.toString(),
                data: null,
            });
        }
    }

    public async getStructureMembers(ids: String[]) {
        return await Organization.getInstance().getStructureMembers(ids);
    }

    public async getStructureBosses(ids: String[]) {
        return await Organization.getInstance().getStructureBosses(ids);
    }

    public async getStructureGroups(ids: String[]) {
        return await Organization.getInstance().getStructureGroups(ids);
    }

    public async getStructuresXMember(idUser: String) {
        return await Organization.getInstance().getStructuresXMember(idUser);
    }

    public async addMemberToGroup(idMember: String, ids: String[]) {
        return await Organization.getInstance().addMemberToGroup(
            idMember,
            ids
        );
    }

    public async addBossToGroup(idBoss: String, ids: String[]) {
        return await Organization.getInstance().addBossToGroup(
            idBoss,
            ids
        );
    }

    public async addMonitorToGroup(idMonitor: String, ids: String[]) {
        return await Organization.getInstance().addMonitorToGroup(
            idMonitor,
            ids
        );
    }

    public async removeMemberFromStructure(idMember: String, idGroup: String) {
        return await Organization.getInstance().removeMemberFromStructure(
            idMember,
            idGroup
        );
    }

    public async removeBossFromStructure(idMember: String, idBranch: String, idGroup: String) {
        return await Organization.getInstance().removeBossFromStructure(
            idMember,
            idBranch,
            idGroup
        );
    }

    public async removeMonitorFromGroup(idMember: String, idBranch: String, idGroup: String) {
        return await Organization.getInstance().removeMonitorFromGroup(
            idMember,
            idBranch,
            idGroup
        );
    }

    //CATALOGO
    public async addDefaultBranch(idOrganization: String, name: String) {
        return await Organization.getInstance().addDefaultBranch(
            idOrganization,
            name
        );
    }

    public async updateDefaultBranch(oldName: String, name: String) {
        return await Organization.getInstance().updateDefaultBranch(oldName, name);
    }

    public async removeDefaultBranch(name: String) {
        return await Organization.getInstance().deleteDefaultBranch(name);
    }

    // Organización
    public async updateOrganization(idOrganization: String, newData: String) {
        return await Organization.getInstance().updateOrganization(
            idOrganization,
            newData
        );
    }

    public async deleteOrganization(idOrganization: String) {
        return await Organization.getInstance().deleteOrganization(idOrganization);
    }

    // from: idMember
    public async sendCCG(from: String, body: String, type: String,) {
        const ccg = new CCG(from, body, type);
        console.log(ccg);
        return await Organization.getInstance().sendCCG(ccg, type);
    }

  // from: idMember, to: idStructure
  public async sendNews(from: String, to: String, body: String, images: String[]) {
    const news = new News(from, to, body, images);
    await Organization.getInstance().sendNews(news);
  }
  
  public async seenNews(pIdMember:String, pSeenNews:[String]) {
    await Organization.getInstance().seenNews(pIdMember,pSeenNews);
  }
}
